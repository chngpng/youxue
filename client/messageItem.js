Template.messageItem.helpers({
  getMsgDivClass(msg) {
    if (isSelfMessage(msg)) {
      return "col-md-3 pull-right";
    } else {
      return "col-md-3 pull-left";
    }
  }
})

Template.messageItem.events = {
  'keypress input.message-input': function (evt, template) {
    // Only handling enter events.
    if (evt.which === 13) {
      var msg = evt.target.value;
      if (msg) {
        template.data.conversation.sendMessage(msg);
      }
      // Resetting the text box to empty.
      evt.target.value = "";
    }
  }
};

function isSelfMessage(msg) {
  return msg.userId == Meteor.user()._id;
}