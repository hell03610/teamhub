var Router = require('ampersand-router');
var HomeView = require('./views/home')

module.exports = Router.extend({
    routes: {
        '': 'home'
    },

    home: function () {
      this.trigger('page', new HomeView({}));
    }
});