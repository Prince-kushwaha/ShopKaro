const { Schema, mongoose, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "EUser",
  },

  orderItems: [
    {
      name: {
        type: String,
        required: false,
      },

      quantity: {
        type: Number,
        required: true,
        default: 1,
      },

      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    },
  ],

  orderPlaceDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  shippingInfo: {
    name: {
      type: String,
      required: true,
    },

    pinCode: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    houseNumber: {
      type: String,
    },

    area: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },
  },

  paymentInfo: {
    paymentMethod: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      required: true,
    },

    transactionNumber: {
      type: String,
    },

    paymentDate: {
      type: Date,
      required: true,
    },
  },

  orderStatus: {
    type: String,
    required: true,
    default: "processing",
  },

  deliveryAt: {
    type: Date,
    required: true,
  },

  itemsPrice: {
    type: Number,
    required: true,
  },

  shippingPrice: {
    type: Number,
    required: true,
  },

  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
});

const orders = model("order", orderSchema);

module.exports = orders;
