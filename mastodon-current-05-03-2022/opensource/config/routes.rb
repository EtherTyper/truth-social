# frozen_string_literal: true

require 'sidekiq_unique_jobs/web'
require 'sidekiq-scheduler/web'

Rails.application.routes.draw do
  root 'home#index'

  mount LetterOpenerWeb::Engine, at: 'letter_opener' if Rails.env.development?

  get 'health', to: 'health#show'

  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web, at: 'sidekiq', as: :sidekiq
    mount PgHero::Engine, at: 'pghero', as: :pghero
  end

  namespace :oauth do
    scope :mfa do
      post :challenge, controller: 'mfa'
    end
  end

  use_doorkeeper do
    controllers authorizations: 'oauth/authorizations',
                authorized_applications: 'oauth/authorized_applications',
                tokens: 'oauth/tokens'
  end

  get 'manifest', to: 'manifests#show', defaults: { format: 'json' }
  get 'intent', to: 'intents#show'
  get 'custom.css', to: 'custom_css#show', as: :custom_css

  resource :instance_actor, path: 'actor', only: [:show] do
    resource :inbox, only: [:create], module: :activitypub
    resource :outbox, only: [:show], module: :activitypub
  end

  get '/unsubscribe', to: 'unsubscribe#unsubscribe'

  devise_scope :user do
    get '/invite/:invite_code', to: 'auth/registrations#new', as: :public_invite

    namespace :auth do
      resource :setup, only: [:show, :update], controller: :setup
      resource :challenge, only: [:create], controller: :challenges
      get 'sessions/security_key_options', to: 'sessions#webauthn_options'
    end
  end

  devise_for :users, path: 'auth', controllers: {
    omniauth_callbacks: 'auth/omniauth_callbacks',
    sessions:           'auth/sessions',
    registrations:      'auth/registrations',
    passwords:          'auth/passwords',
    confirmations:      'auth/confirmations',
  }

  get '/users/:username', to: redirect('/@%{username}'), constraints: lambda { |req| req.format.nil? || req.format.html? }

  resources :accounts, path: 'users', only: [:show], param: :username do
    get :remote_follow,  to: 'remote_follow#new'
    post :remote_follow, to: 'remote_follow#create'

    resources :statuses, only: [:show] do
      member do
        get :activity
        get :embed
      end

      resources :replies, only: [:index], module: :activitypub
    end

    resources :followers, only: [:index], controller: :follower_accounts
    resources :following, only: [:index], controller: :following_accounts
    resource :follow, only: [:create], controller: :account_follow
    resource :unfollow, only: [:create], controller: :account_unfollow

    resource :outbox, only: [:show], module: :activitypub
    resource :inbox, only: [:create], module: :activitypub
    resource :claim, only: [:create], module: :activitypub
    resources :collections, only: [:show], module: :activitypub
    resource :followers_synchronization, only: [:show], module: :activitypub
  end

  resource :inbox, only: [:create], module: :activitypub

  get '/@:username', to: 'accounts#show', as: :short_account
  get '/@:username/with_replies', to: 'accounts#show', as: :short_account_with_replies
  get '/@:username/media', to: 'accounts#show', as: :short_account_media
  get '/@:username/tagged/:tag', to: 'accounts#show', as: :short_account_tag
  get '/@:account_username/:id', to: 'statuses#show', as: :short_account_status
  get '/@:account_username/:id/embed', to: 'statuses#embed', as: :embed_short_account_status

  get  '/interact/:id', to: 'remote_interaction#new', as: :remote_interaction
  post '/interact/:id', to: 'remote_interaction#create'

  get '/explore', to: 'directories#index', as: :explore
  get '/settings', to: redirect('/settings/profile')

  namespace :settings do
    resource :profile, only: [:show, :update] do
      resources :pictures, only: :destroy
    end

    get :preferences, to: redirect('/settings/preferences/appearance')

    namespace :preferences do
      resource :appearance, only: [:show, :update], controller: :appearance
      resource :notifications, only: [:show, :update]
      resource :other, only: [:show, :update], controller: :other
    end

    resource :import, only: [:show, :create]
    resource :export, only: [:show, :create]

    namespace :exports, constraints: { format: :csv } do
      resources :follows, only: :index, controller: :following_accounts
      resources :blocks, only: :index, controller: :blocked_accounts
      resources :mutes, only: :index, controller: :muted_accounts
      resources :lists, only: :index, controller: :lists
      resources :domain_blocks, only: :index, controller: :blocked_domains
      resources :user_invites, only: :index
      resources :bookmarks, only: :index, controller: :bookmarks
    end

    resources :two_factor_authentication_methods, only: [:index] do
      collection do
        post :disable
      end
    end

    resource :otp_authentication, only: [:show, :create], controller: 'two_factor_authentication/otp_authentication'

    resources :webauthn_credentials, only: [:index, :new, :create, :destroy],
              path: 'security_keys',
              controller: 'two_factor_authentication/webauthn_credentials' do

      collection do
        get :options
      end
    end

    namespace :two_factor_authentication do
      resources :recovery_codes, only: [:create]
      resource :confirmation, only: [:new, :create]
    end

    resources :identity_proofs, only: [:index, :new, :create, :destroy]

    resources :applications, except: [:edit, :index] do
      member do
        post :regenerate
      end
    end

    resource :delete, only: [:show, :destroy]
    resource :migration, only: [:show, :create]

    namespace :migration do
      resource :redirect, only: [:new, :create, :destroy]
    end

    resources :aliases, only: [:index, :create, :destroy]
    resources :sessions, only: [:destroy]
    resources :featured_tags, only: [:index, :create, :destroy]
  end

  resources :media, only: [:show] do
    get :player
  end

  resources :tags,   only: [:show]
  resources :emojis, only: [:show]
  resources :invites, only: [:index, :create, :destroy]
  resources :filters, except: [:show, :index]
  resource :relationships, only: [:update]

  # get '/public', to: 'public_timelines#show', as: :public_timeline
  get '/media_proxy/:id/(*any)', to: 'media_proxy#show', as: :media_proxy

  resource :share, only: [:show, :create]

  namespace :admin do
    get '/dashboard', to: 'dashboard#index'

    resources :domain_allows, only: [:new, :create, :show, :destroy]
    resources :domain_blocks, only: [:new, :create, :show, :destroy, :update, :edit]

    resources :email_domain_blocks, only: [:index, :new, :create, :destroy]
    resources :action_logs, only: [:index]
    resources :warning_presets, except: [:new]

    resources :announcements, except: [:show] do
      member do
        post :publish
        post :unpublish
      end
    end

    resource :settings, only: [:edit, :update]
    resources :site_uploads, only: [:destroy]

    resources :invites, only: [:index, :create, :destroy] do
      collection do
        post :deactivate_all
      end
    end

    resources :relays, only: [:index, :new, :create, :destroy] do
      member do
        post :enable
        post :disable
      end
    end

    resources :instances, only: [:index, :show], constraints: { id: /[^\/]+/ } do
      member do
        post :clear_delivery_errors
        post :restart_delivery
        post :stop_delivery
      end
    end

    resources :rules

    resources :reports, only: [:index, :show] do
      member do
        post :assign_to_self
        post :unassign
        post :reopen
        post :resolve
      end

      resources :reported_statuses, only: [:create]
    end

    resources :trending_truths, only: [:index, :update, :destroy]

    resources :report_notes, only: [:create, :destroy]

    resources :accounts, only: [:index, :show, :destroy] do
      member do
        post :enable
        post :unsensitive
        post :unsilence
        post :unsuspend
        post :redownload
        post :remove_avatar
        post :remove_header
        post :memorialize
        post :approve
        post :reject
        post :unverify
        post :bot
        post :unbot
      end

      resource :change_email, only: [:show, :update]
      resource :reset, only: [:create]
      resource :action, only: [:new, :create], controller: 'account_actions'
      resources :statuses, only: [:index, :show, :create, :update, :destroy]
      resources :relationships, only: [:index]

      resource :confirmation, only: [:create] do
        collection do
          post :resend
        end
      end

      resource :role, only: [] do
        member do
          post :promote
          post :demote
        end
      end
    end

    resources :pending_accounts, only: [:index] do
      collection do
        post :approve_all
        post :reject_all
        post :batch
      end
    end

    resources :users, only: [] do
      resource :two_factor_authentication, only: [:destroy]
    end

    resources :custom_emojis, only: [:index, :new, :create] do
      collection do
        post :batch
      end
    end

    resources :ip_blocks, only: [:index, :new, :create] do
      collection do
        post :batch
      end
    end

    resources :account_moderation_notes, only: [:create, :destroy]
    resource :follow_recommendations, only: [:show, :update]

    resources :tags, only: [:index, :show, :update] do
      collection do
        post :approve_all
        post :reject_all
        post :batch
      end
    end
  end

  get '/admin', to: redirect('/admin/dashboard', status: 302)

  scope :_ma1sd do
    scope :backend do
      scope :api do
        scope :v1 do
          post '/auth/login', to: 'api/v1/ma1sd/authentication#auth'
          post '/directory/user/search', to: 'api/v1/ma1sd/directory#search'
          post '/identity/single', to: 'api/v1/ma1sd/identity#single'
          post '/identity/bulk', to: 'api/v1/ma1sd/identity#bulk'
          post '/profile/displayName', to: 'api/v1/ma1sd/profile#display_name'
          post '/profile/threepids', to: 'api/v1/ma1sd/profile#threepids'
          post '/profile/roles', to: 'api/v1/ma1sd/profile#roles'
        end
      end
    end
  end

  namespace :api do
    # OEmbed
    get '/oembed', to: 'oembed#show', as: :oembed

    # Pleroma endpoints that we are implementing in Mastodon
    namespace :pleroma do
      post :change_password, controller: 'user_settings'
      post :change_email, controller: 'user_settings'
      post :delete_account, controller: 'user_settings'

      scope :accounts,  defaults: { format: 'json' } do
        get :mfa, to: 'accounts#mfa'
        scope :mfa do
          scope :setup do
            get :totp, to: 'accounts#setup_totp'
          end
          scope :confirm do
            post :totp, to: 'accounts#confirm_totp'
          end
          get :backup_codes, to: 'accounts#backup_codes'
          delete :totp, to: 'accounts#delete_totp'
        end
      end
    end

    # JSON / REST API
    namespace :v1 do
      resources :statuses, only: [:create, :show, :destroy] do
        scope module: :statuses do
          resources :reblogged_by, controller: :reblogged_by_accounts, only: :index
          resources :favourited_by, controller: :favourited_by_accounts, only: :index
          resource :reblog, only: :create
          post :unreblog, to: 'reblogs#destroy'

          resource :favourite, only: :create
          post :unfavourite, to: 'favourites#destroy'

          resource :bookmark, only: :create
          post :unbookmark, to: 'bookmarks#destroy'

          resource :mute, only: :create
          post :unmute, to: 'mutes#destroy'

          resource :pin, only: :create
          post :unpin, to: 'pins#destroy'
        end

        member do
          get :context
          get 'context/ancestors', to: 'statuses#ancestors'
          get 'context/descendants', to: 'statuses#descendants', as: 'descendants'
        end
      end

      namespace :timelines do
        resource :home, only: :show, controller: :home
        # resource :public, only: :show, controller: :public
        resources :tag, only: :show
        resources :list, only: :show
      end

      namespace :truth do
        namespace :trending do
          resources :truths, only: :index
        end

        namespace :admin do
          resources :accounts, only: [:index, :update]
          scope :accounts do
            get :count, to: 'accounts#count'
          end
        end

        scope :password_reset do
          post :confirm, to: 'passwords#reset_confirm'
          post :request, to: 'passwords#reset_request'
        end

        scope :email do
          get :confirm, to: 'emails#email_confirm'
        end
      end

      resources :streaming, only: [:index]
      resources :custom_emojis, only: [:index]
      resources :suggestions, only: [:index, :destroy]
      resources :scheduled_statuses, only: [:index, :show, :update, :destroy]
      resources :preferences, only: [:index]

      resources :announcements, only: [:index] do
        scope module: :announcements do
          resources :reactions, only: [:update, :destroy]
        end

        member do
          post :dismiss
        end
      end

      # namespace :crypto do
      #   resources :deliveries, only: :create

      #   namespace :keys do
      #     resource :upload, only: [:create]
      #     resource :query,  only: [:create]
      #     resource :claim,  only: [:create]
      #     resource :count,  only: [:show]
      #   end

      #   resources :encrypted_messages, only: [:index] do
      #     collection do
      #       post :clear
      #     end
      #   end
      # end

      resources :conversations, only: [:index, :destroy] do
        member do
          post :read
        end
      end

      resources :media,        only: [:create, :update, :show]
      resources :blocks,       only: [:index]
      resources :mutes,        only: [:index]
      resources :favourites,   only: [:index]
      resources :bookmarks,    only: [:index]
      resources :reports,      only: [:create]
      resources :trends,       only: [:index]
      resources :filters,      only: [:index, :create, :show, :update, :destroy]
      resources :endorsements, only: [:index]
      resources :markers,      only: [:index, :create]

      namespace :apps do
        get :verify_credentials, to: 'credentials#show'
      end

      resources :apps, only: [:create]

      namespace :emails do
        resources :confirmations, only: [:create]
      end

      resource :instance, only: [:show] do
        resources :peers, only: [:index], controller: 'instances/peers'
        resource :activity, only: [:show], controller: 'instances/activity'
        resources :rules, only: [:index], controller: 'instances/rules'
      end

      resource :domain_blocks, only: [:show, :create, :destroy]
      resource :directory, only: [:show]

      resources :follow_requests, only: [:index] do
        member do
          post :authorize
          post :reject
        end
      end

      resources :notifications, only: [:index, :show] do
        collection do
          post :clear
        end

        member do
          post :dismiss
        end
      end

      namespace :accounts do
        get :verify_credentials, to: 'credentials#show'
        patch :update_credentials, to: 'credentials#update'
        get :chat_token, to: 'credentials#chat_token'
        resource :search, only: :show, controller: :search
        resource :lookup, only: :show, controller: :lookup
        resources :relationships, only: :index
      end

      resources :accounts, only: [:show] do
        resources :statuses, only: :index, controller: 'accounts/statuses'
        resources :followers, only: :index, controller: 'accounts/follower_accounts'
        resources :following, only: :index, controller: 'accounts/following_accounts'
        resources :lists, only: :index, controller: 'accounts/lists'
        resources :identity_proofs, only: :index, controller: 'accounts/identity_proofs'
        resources :featured_tags, only: :index, controller: 'accounts/featured_tags'

        member do
          post :follow
          post :unfollow
          post :block
          post :unblock
          post :mute
          post :unmute
        end

        resource :pin, only: :create, controller: 'accounts/pins'
        post :unpin, to: 'accounts/pins#destroy'
        resource :note, only: :create, controller: 'accounts/notes'
      end

      resources :lists, only: [:index, :create, :show, :update, :destroy] do
        resource :accounts, only: [:show, :create, :destroy], controller: 'lists/accounts'
      end

      namespace :featured_tags do
        get :suggestions, to: 'suggestions#index'
      end

      resources :featured_tags, only: [:index, :create, :destroy]

      resources :polls, only: [:create, :show] do
        resources :votes, only: :create, controller: 'polls/votes'
      end

      namespace :push do
        resource :subscription, only: [:create, :show, :update, :destroy]
      end

      get '/stats', to: 'admin#stats'
      namespace :admin do
        resources :statuses, only: [:index, :show] do
          post :sensitize
          post :desensitize
          post :undiscard
          post :discard
        end

        resources :accounts, only: [:index, :show, :create, :update, :destroy] do
          resources :follows, only: [:show], param: :target_account_id, controller: 'accounts/follows'
          collection do
            post :bulk_approve
          end
          member do
            post :enable
            post :unsensitive
            post :unsilence
            post :unsuspend
            post :approve
            post :reject
            post :verify
            post :unverify
            post :role
          end

          resource :action, only: [:create], controller: 'account_actions'
        end

        resources :reports, only: [:index, :show] do
          member do
            resources :moderation_records, only: [:index]
            post :assign_to_self
            post :unassign
            post :reopen
            post :resolve
          end
        end
      end
    end

    namespace :v2 do
      resources :media, only: [:create]
      get '/search', to: 'search#index', as: :search
      resources :suggestions, only: [:index, :destroy]
    end

    namespace :web do
      resource :settings, only: [:update]
      resource :embed, only: [:create]
      resources :push_subscriptions, only: [:create] do
        member do
          put :update
        end
      end
    end
  end

  get '/web/(*any)', to: 'home#index', as: :web

  get '/about',        to: 'about#show'
  get '/about/more',   to: 'about#more'
  get '/terms',        to: 'about#terms'

  match '/', via: [:post, :put, :patch, :delete], to: 'application#raise_not_found', format: false
  match '*unmatched_route', via: :all, to: 'application#raise_not_found', format: false
end
