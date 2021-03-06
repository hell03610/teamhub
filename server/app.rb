require 'sinatra/base'
require 'google/api_client'
require 'google/api_client/client_secrets'
require 'json'


$credentials = Google::APIClient::ClientSecrets.load
$authorization = Signet::OAuth2::Client.new(
  :authorization_uri => $credentials.authorization_uri,
  :token_credential_uri => $credentials.token_credential_uri,
  :client_id => $credentials.client_id,
  :client_secret => $credentials.client_secret,
  :redirect_uri => $credentials.redirect_uris.first,
  :scope => 'https://www.googleapis.com/auth/plus.login')
$client = Google::APIClient.new

class Teamhub < Sinatra::Base
  post '/connect' do
    $authorization.code = request.body.read
    $authorization.fetch_access_token!
    $client.authorization = $authorization

    id_token = $client.authorization.id_token
    encoded_json_body = id_token.split('.')[1]
    # Base64 must be a multiple of 4 characters long, trailing with '='
    encoded_json_body += (['='] * (encoded_json_body.length % 4)).join('')
    json_body = Base64.decode64(encoded_json_body)
    body = JSON.parse(json_body)
    # You can read the Google user ID in the ID token.
    # "sub" represents the ID token subscriber which in our case
    # is the user ID. This sample does not use the user ID.
    gplus_id = body['sub']

    # Serialize and store the token in the user's session.
    token_pair = TokenPair.new
    token_pair.update_token!($client.authorization)
    session[:token] = token_pair
  end

  get '/team' do
    content_type :json
    team = [{name: 'John Smith', avatar: 'http://robohash.org/1'},
            {name: 'Pedro Martinez', avatar: 'http://robohash.org/2'}]
    team.to_json
  end

end

class TokenPair
  def update_token!(object)
    @refresh_token = object.refresh_token
    @access_token = object.access_token
    @expires_in = object.expires_in
    @issued_at = object.issued_at
  end

  def to_hash
    return {
      :refresh_token => @refresh_token,
      :access_token => @access_token,
      :expires_in => @expires_in,
      :issued_at => Time.at(@issued_at)}
  end
end
