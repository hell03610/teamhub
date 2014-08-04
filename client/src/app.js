var Router = require('./router');
var domReady = require('domready');
var MainView = require('./main');

module.exports = {
    blastoff: function () {
        var self = window.app = this;
        // init our URL handlers and the history tracker
        this.router = new Router();

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
        gapi.client.load('plus','v1', function(){
            if (authResult['access_token']) {
                app.navigate('home');
            } else if (authResult['error']) {
              // There was an error, which means the user is not signed in.
              // As an example, you can handle by writing to the console:
              console.log('There was an error: ' + authResult['error']);
            }
        });
    }
};

// run it
module.exports.blastoff();
