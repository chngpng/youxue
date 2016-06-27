Template.messages.helpers({
  conversations() {
      console.log("hit messages");
      var res = Meteor.conversations.find();
      return res;
      //return Meteor.conversations.find();
    },

    getOpponentName(conversation) {
      return getOpponent(conversation).profile.userName;
    },

    sendMessage(conversation, msg) {
      conversation.sendMessage(msg);
    },

    lastMessageDateTime(conversation) {
      var date = conversation.lastMessage().date;
      return date.toDateString() + " " + date.toTimeString();
    },

    isLoggedIn() {
      return Meteor.user()
    }
})

function getOpponent(conversation) {
  var pid = conversation.participants().fetch()[0].userId;
  return Meteor.users.findOne({
    _id: pid
  });
}