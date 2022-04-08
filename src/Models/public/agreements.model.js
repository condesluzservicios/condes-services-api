const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const agreementsSchema = new Schema(
  {
    name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    cod_number: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('agreements', agreementsSchema);
