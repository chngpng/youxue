Template.messages.helpers({
  conversations() {
      return Meteor.conversations.find();
    },

    getParticipantUserName(conversation) {
      var pid = conversation.participants().fetch()[0].userId;
      return Meteor.users.findOne({
        _id: pid
      }).profile.userName;
    },

    lastMessageDateTime(conversation) {
      var date = conversation.lastMessage().date;
      return date.toDateString() + " " + date.toTimeString();
    }
})