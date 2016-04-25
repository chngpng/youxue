this.Pickups = new Mongo.Collection("pickups");
this.Stays = new Mongo.Collection("stays");

Schema = {};

Schema.Pickup = new SimpleSchema({
  airport: {
    type: String,
    allowedValues: ['JFK', 'LGA', 'EWR'],
    optional: true
  },
  startDate: {
    type: Date,
    optional: true
  },
  endDate: {
    type: Date,
    optional: true
  }
});
Stays.attachSchema(Schema.Pickup);

//This is the default address schema
Schema.Address = new SimpleSchema({
  formattedAddress: {
    type: String,
    optional: true
  },
  geopoint: {
    type: [Number], //[longitude, latitude]
    decimal: true,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  postalCode: {
    type: String,
    optional: true
  },
  country: {
    type: String,
    optional: true
  },
  countryName: {
    type: String,
    optional: true
  }
});

Schema.Stay = new SimpleSchema({
  address: {
    type: Schema.Address,
    optional: true,
    autoform: {
      type: 'google-places-input',
      //onEmptyStateFntName: 'onEmptyStateFnt'
      //geopointName: "myOwnGeopointName" //optional, you can use a custom geopoint name
    }
  },
  startDate: {
    type: Date,
    optional: true
  },
  endDate: {
    type: Date,
    optional: true
  }
});

Stays.attachSchema(Schema.Stay);