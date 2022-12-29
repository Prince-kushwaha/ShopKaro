const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtPrivateKey = process.env.JWTPRIVATEKEY;
const jwtExpire = process.env.JWT_Expire;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter user name"],
  },

  resetpasswordtoken: String,
  resetpasswordexpires: Date,

  email: {
    type: String,
    required: [true, "Please enter email "],
    unique: true,
    validate: [isEmail, "please enter an valid email"],
  },

  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },

  mobile: {
    type: Number,
    required: [false, "Please enter mobile number"],
  },

  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  address: [
    {
      name: {
        type: String,
        required: true,
      },

      pinCode: {
        type: Number,
        required: true,
      },

      mobile: {
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
  ],

  wish: [
    {
      product: {
        type: String,
        required: true,
      },
    },
  ],

  cart: [
    {
      product: {
        type: String,
        required: true,
      },

      qty: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) {
    console.log("password modified");
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate  Jwt Token
userSchema.methods.genJwtToken = function () {
  return jwt.sign({ _id: this._id }, jwtPrivateKey, {
    expiresIn: jwtExpire,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const user = new model("EUser", userSchema);
module.exports = user;
