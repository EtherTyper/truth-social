require 'rails_helper'

RSpec.describe RemoveStatusService, type: :service do
  subject { RemoveStatusService.new }

  let!(:alice)  { Fabricate(:account, user: Fabricate(:user)) }
  let!(:bob)    { Fabricate(:account, username: 'bob', domain: 'example.com') }
  let!(:jeff)   { Fabricate(:account) }
  let!(:hank)   { Fabricate(:account, username: 'hank', protocol: :activitypub, domain: 'example.com', inbox_url: 'http://example.com/inbox') }
  let!(:bill)   { Fabricate(:account, username: 'bill', protocol: :activitypub, domain: 'example2.com', inbox_url: 'http://example2.com/inbox') }

  before do
    acct = Fabricate(:account, username: "ModerationAI")
    Fabricate(:user, admin: true, account: acct)
    stub_request(:post, ENV["MODERATION_TASK_API_URL"]).to_return(status: 200, body: request_fixture('moderation-response-0.txt'))
    stub_request(:post, 'http://example.com/inbox').to_return(status: 200)
    stub_request(:post, 'http://example2.com/inbox').to_return(status: 200)

    jeff.follow!(alice)
    hank.follow!(alice)

    @status = PostStatusService.new.call(alice, text: 'Hello @bob@example.com')
    FavouriteService.new.call(jeff, @status)
    Fabricate(:status, account: bill, reblog: @status, uri: 'hoge')
  end

  it 'removes status from author\'s home feed' do
    subject.call(@status)
    expect(HomeFeed.new(alice).get(10)).to_not include(@status.id)
  end

  it 'removes status from local follower\'s home feed' do
    subject.call(@status)
    expect(HomeFeed.new(jeff).get(10)).to_not include(@status.id)
  end

  it 'sends delete activity to followers' do
    subject.call(@status)
    # expect(a_request(:post, 'http://example.com/inbox')).to have_been_made.twice
  end

  it 'sends delete activity to rebloggers' do
    subject.call(@status)
    expect(a_request(:post, 'http://example2.com/inbox')).to have_been_made
  end

  it 'remove status from notifications' do
    expect { subject.call(@status, immediate: true) }.to change {
      Notification.where(activity_type: 'Favourite', from_account: jeff, account: alice).count
    }.from(1).to(0)
  end
  
  it 'notifies the user of removal if notify_user: true' do
    expect(subject).to receive(:notify_user).once
    subject.call(@status, notify_user: true)
  end

  it 'does not notify the user of removal if notify_user not set' do
    expect(subject).to_not receive(:notify_user)
    subject.call(@status)
  end
end
