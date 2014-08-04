var AmpersandView = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');

module.exports = AmpersandView.extend({

    initialize: function (options) {
        this.createSwitcher(options.el);
        this.listenTo(app.router, 'page', this.handleNewPage);
    },

    handleNewPage: function (view) {
        this.pageSwitcher.set(view);
    },

    createSwitcher: function(container) {
        this.pageSwitcher = new ViewSwitcher(container, {
            // here we provide a few things we'd like to do each time
            // we switch pages in the app.
            show: function (newView, oldView) {
                document.title = newView.pageTitle || 'Team Hub';
                document.body.scrollTop = 0;
                app.currentPage = newView;
            }
        });
    }
});