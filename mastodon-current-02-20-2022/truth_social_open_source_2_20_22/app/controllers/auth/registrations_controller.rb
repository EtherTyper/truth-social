# frozen_string_literal: true

class Auth::RegistrationsController < Devise::RegistrationsController
  include Devise::Controllers::Rememberable
  include RegistrationSpamConcern

  layout :determine_layout

  before_action :set_invite, only: [:new, :create]
  before_action :set_email, only: [:create]
  before_action :check_enabled_registrations, only: [:new, :create]
  before_action :configure_sign_up_params, only: [:create]
  before_action :set_sessions, only: [:edit, :update]
  before_action :set_instance_presenter, only: [:new, :create, :update]
  before_action :set_body_classes, only: [:new, :create, :edit, :update]
  before_action :require_not_suspended!, only: [:update]
  before_action :set_cache_headers, only: [:edit, :update]
  before_action :set_registration_form_time, only: :new

  skip_before_action :require_functional!, only: [:edit, :update]

  def new
    confirm_invite_code
    super(&:build_invite_request)
  rescue InvalidInvitationCodeError => e
    redirect_to web_path, alert: e
  end

  def destroy
    not_found
  end

  def create
    super
    if @user.persisted? && @invite.present?
      notify_about_new_registration
    end
  end

  def update
    super do |resource|
      if resource.saved_change_to_encrypted_password?
        resource.clear_other_sessions(current_session.session_id)
        resource.forget_me!
        remember_me(resource)
      end
    end
  end

  protected

  def update_resource(resource, params)
    params[:password] = nil if Devise.pam_authentication && resource.encrypted_password.blank?

    super
  end

  def build_resource(hash = nil)
    super(hash)

    resource.locale                 = I18n.locale
    resource.invite_code            = params[:invite_code] if resource.invite_code.blank?
    resource.registration_form_time = session[:registration_form_time]
    resource.sign_up_ip             = request.remote_ip

    resource.build_account if resource.account.nil?
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up) do |u|
      u.permit({ account_attributes: [:username], invite_request_attributes: [:text] }, :email, :password, :password_confirmation, :invite_code, :agreement, :website, :confirm_password)
    end
  end

  def after_sign_up_path_for(_resource)
    auth_setup_path
  end

  def after_sign_in_path_for(_resource)
    set_invite

    if @invite&.autofollow?
      short_account_path(@invite.user.account)
    else
      super
    end
  end

  def after_inactive_sign_up_path_for(_resource)
    new_user_session_path
  end

  def after_update_path_for(_resource)
    edit_user_registration_path
  end

  def check_enabled_registrations
    redirect_to root_path if single_user_mode? || !allowed_registrations?
  end

  def allowed_registrations?
    Setting.registrations_mode != 'none' || @invite&.valid_for_use?
  end

  def invite_code
    if params[:user]
      params[:user][:invite_code]
    else
      params[:invite_code]
    end
  end

  private

  def set_instance_presenter
    @instance_presenter = InstancePresenter.new
  end

  def set_body_classes
    @body_classes = %w(edit update).include?(action_name) ? 'admin' : 'lighter'
  end

  def set_invite
    invite = invite_code.present? ? Invite.find_by(code: invite_code) : nil
    @invite = invite&.valid_for_use? ? invite : nil
  end

  def set_email
    params[:user][:email] = @invite.email if @invite.present?
  end

  def determine_layout
    %w(edit update).include?(action_name) ? 'admin' : 'auth'
  end

  def set_sessions
    @sessions = current_user.session_activations
  end

  def require_not_suspended!
    forbidden if current_account.suspended?
  end

  def set_cache_headers
    response.headers['Cache-Control'] = 'no-cache, no-store, max-age=0, must-revalidate'
  end

  def notify_about_new_registration
    NotifyService.new.call(@invite.user.account, :invite, @invite)
  end

  def confirm_invite_code
    if invite_code.present? && !@invite
      raise InvalidInvitationCodeError
    end
  end
end
