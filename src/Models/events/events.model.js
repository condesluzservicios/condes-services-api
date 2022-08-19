const mongoose = require('mongoose');
const { Types, Schema, model } = mongoose;

const eventsSchema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    site: {
      type: String,
    },
    link: {
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

module.exports = model('events', eventsSchema);
