Template.eats.helpers({
  eats() {
      return Eats.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    },

    getTitle(eat) {
      var title = eat.content[0].title;
      eat.content.slice(1, 3).forEach(
        function (c) {
          title += ", ";
          title += c.title;
        }
      )
      return title;
    }
})

Template.eats.events({
  'click .js-add-eat': function () {
    console.log('add offer is clicked');
    if (!Meteor.user()) {
      alert("Log in to post offers.");
      return
    }
    $('#eatModal').modal('show');
  },
})

var eatFormHook = {
  onSuccess: function (update, result) {
    if (result) {
      $('#eatModal').modal('hide');
    }
  }
}
AutoForm.addHooks('eatForm', eatFormHook);