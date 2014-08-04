var AmpersandView = require('ampersand-view');

module.exports = AmpersandView.extend({
  template: require('./template.hbs'),

	initialize: function(){
	},

  render: function () {
    this.renderWithTemplate(app.currentUser);
    return this;
  }

});