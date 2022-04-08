const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const newsSchema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    content: {
      type: String,
    },
    pathImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('News', newsSchema);
