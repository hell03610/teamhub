var Router = require('ampersand-router');
var HomeView = require('./home/home')

module.exports = Router.extend({
    routes: {
        '': 'home'
    },

    home: function () {
      this.trigger('page', new HomeView({}));
    }
});