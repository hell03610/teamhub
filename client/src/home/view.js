var AmpersandView = require('ampersand-view');

module.exports = AmpersandView.extend({
    template: require('./template.hbs'),

	initialize: function(){
		this.listenTo(app.router, 'page:home', this.fetchProfile);
	},

    fetchProfile: function(){
      var self = this;
      var request = gapi.client.plus.people.get( {'userId' : 'me'} );
      request.execute( function(profile) {
        if (profile.error) {
          return;
        }
        console.log(profile);
        self.profile = profile;
        self.render();
      });
    },

    render: function () {
    	this.renderWithTemplate(this.profile);
    	return this;
	}

});