import mongoose from 'mongoose';
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

export default model('events', eventsSchema);
