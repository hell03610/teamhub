var AmpersandView = require('ampersand-view');

module.exports = AmpersandView.extend({
    template: require('./template.hbs'),
    autoRender: true
});