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

      images: {
        public_id: {
          type: String,
          default: "image",
          required: true,
        },
        url: {
          type: String,
          default: "url",
          required: true,
        },
      },

      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      price: {
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
      type: Number,
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

    phone: {
      type: Number,
      required: true,
    },

    address: {
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
