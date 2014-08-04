var Router = require('./router');
var domReady = require('domready');
var MainView = require('./main');
var People = require('./model/people');

module.exports = {
    blastoff: function () {
        var self = window.app = this;
        // init our URL handlers and the history tracker
        this.router = new Router();
        this.people = new People();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // // init our main view
            var mainView = self.view = new MainView({
                 el: document.body
            });

            self.router.history.start({pushState: true, root: '/'});
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    },

    signIn: function (authResult) {
        var self = this;
        gapi.client.load('plus','v1', function(){
            if (authResult['access_token']) {
                self.fetchProfile(function(){}, function(profile){
                    app.currentUser = profile;
                    app.navigate('home');
                });
            } else if (authResult['error']) {
              // There was an error, which means the user is not signed in.
              // As an example, you can handle by writing to the console:
              console.log('There was an error: ' + authResult['error']);
            }
        });
    },

    fetchProfile: function(onError, onSuccess){
      var self = this;
      var request = gapi.client.plus.people.get( {'userId' : 'me'} );
      request.execute( function(profile) {
        if (profile.error) {
          onError(profile);
          return;
        }
        onSuccess(profile);
      });
    }

};

// run it
module.exports.blastoff();
