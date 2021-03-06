var Router = require('ampersand-router');
var LoginView = require('./page/login/view');
var HomeView = require('./page/home/view');

module.exports = Router.extend({
    routes: {
        '': 'login',
        'home':'home',
        '(*path)': 'login'
    },

    login: function () {
      this.trigger('page', new LoginView({}));
      this.trigger('page:login');
    },

    home: function () {
      this.trigger('page', new HomeView({
        collection: app.people
      }));
      this.trigger('page:home');
    }
});