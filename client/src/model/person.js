var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        name: ['string', true, ''],
        email: ['string', true, ''],
    },
    session: {
        selected: ['boolean', true, false]
    },
    derived: {
        // fullName: {
        //     deps: ['firstName', 'lastName'],
        //     fn: function () {
        //         return this.firstName + ' ' + this.lastName;
        //     }
        // },
        avatar: {
            deps: ['firstName', 'lastName'],
            fn: function () {
                return 'http://robohash.org/' + encodeURIComponent(this.name) + '?size=80x80';
            }
        }
    }
});
