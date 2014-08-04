var AmpersandView = require('ampersand-view');

module.exports = AmpersandView.extend({
    template: require('./home.hbs'),
    autoRender: true
});