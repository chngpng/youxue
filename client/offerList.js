Template.offerList.helpers({
  pickups() {
      return Pickups.find()
    },

    stays() {
      return Stays.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    }
});