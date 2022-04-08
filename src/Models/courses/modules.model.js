const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;

const moduleSchema = new Schema({
  title_module: { type: String },
  description_module: { type: String },
  id_course: {
    type: Types.ObjectId,
    ref: 'courses',
  },
});

module.exports = model('modules', moduleSchema);
