var AmpersandView = require('ampersand-view');
var PersonView = require('./person');

module.exports = AmpersandView.extend({
  template: require('./template.hbs'),

  render: function () {
    this.renderWithTemplate(app.currentUser);
    console.log(this.collection, this.getByRole('people-list'));
    this.renderCollection(this.collection, PersonView, this.getByRole('people-list'));
    if (!this.collection.length) {
        this.fetchCollection();
    }
    return this;
  },
  fetchCollection: function () {
  		console.log('fetching collection...')
        this.collection.fetch();
        return false;
  },

});