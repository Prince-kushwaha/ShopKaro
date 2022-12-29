const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8],
  },

  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
  },

  description: {
    type: String,
    required: [true, "please enter product description"],
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "EUser",
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
      },

      createAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  rating: {
    type: Number,
    default: 0,
  },

  numOfRating: {
    type: Number,
    required: true,
    default: 0,
  },
});

const product = new model("product", productSchema);
module.exports = product;
