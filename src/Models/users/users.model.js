const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    isCompany: {
      type: Boolean,
    },
    cod_number: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('users', userSchema);
