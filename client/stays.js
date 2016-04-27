Template.stays.helpers({
  stays() {
      return Stays.find()
    },

    dateFormat(date) {
      return new Date(date).toDateString()
    }
})