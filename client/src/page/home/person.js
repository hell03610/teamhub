var AmpersandView = require('ampersand-view');

module.exports = AmpersandView.extend({
    template: require('./person.hbs'),
    bindings: {
        'model.name': '[role=name]',
        'model.avatar': {
            type: 'attribute',
            role: 'avatar',
            name: 'src'
        }
    }
    ,
    // events: {
    //     'click [role=action-delete]': 'handleRemoveClick'
    // },
    // handleRemoveClick: function () {
    //     this.model.destroy();
    //     return false;
    // }
});