Template.pickups.helpers({
  pickups() {
      return Pickups.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    }
})