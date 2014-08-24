# Team Hub

## How to install

You will need
  - node.js:http://nodejs.org/,
  - grunt-cli: http://gruntjs.com/getting-started
  - ruby: https://www.ruby-lang.org
  - Create a project in Google Developers Console: http://console.developers.google.com and create API Credentials for Google Plus, for OAuth for a web application - https://developers.google.com/console/help/new/#generatingoauth2

```
cd server
bundle install
cp client_secrets.json.example client_secrets.json
cd ../client
npm install
```

Edit by hand the file `server/client_secrets.json` and add the `client_id` and `client_secret` from the OAuth Credentials project created in Google Developers Console

## How to run

To run the server

```
cd server
./script/server
```


To copy the dist to the server and start the watch

```
cd client
grunt
```
