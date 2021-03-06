this.Pickups = new Mongo.Collection("pickups");
this.Stays = new Mongo.Collection("stays");
this.Eats = new Mongo.Collection("eats");
this.EatSubscriptions = new Mongo.Collection("eat_subscriptions");

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
  },
  authorId: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Meteor.userId()
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

Stays.attachSchema(Schema.Stay);

Schema.MenuItem = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  price: {
    type: Number,
    optional: true,
    decimal: true
  },
  image: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Schema.Eat = new SimpleSchema({
  content: {
    type: [Schema.MenuItem],
    optional: true
  },
  title: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true,
  },
  image: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  startDate: {
    type: Date,
    optional: true,
    //autoform: {
    //  type: 'pickadate'
    //}
  },
  endDate: {
    type: Date,
    optional: true,
    //autoform: {
    //  type: 'pickadate'
    //}
  },
  address: {
    type: Schema.Address,
    optional: true,
    autoform: {
      type: 'google-places-input',
      //onEmptyStateFntName: 'onEmptyStateFnt'
      //geopointName: "myOwnGeopointName" //optional, you can use a custom geopoint name
    }
  },
  subscriptions: {
    type: [String],
    optional: true,
    //autoValue: function () {
    //  return [];
    //}
  },
  authorId: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Meteor.userId()
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
})

Eats.attachSchema(Schema.Eat);

Schema.EatItemQuantity = new SimpleSchema({
  title: {
    type: String
  },
  quantity: {
    type: Number
  }
});
Schema.EatSubscription = new SimpleSchema({
  eatId: {
    type: String
  },
  subscriberId: {
    type: String
  },
  quantities: {
    type: [Schema.EatItemQuantity]
  }
});
EatSubscriptions.attachSchema(Schema.EatSubscription);
