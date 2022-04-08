const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;

const coursesSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    duracion: {
      type: String,
      required: false,
    },
    profesor: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    certificado: {
      type: String,
      required: true,
    },
    pathImage: {
      type: String,
      required: true,
    },
    modules: {
      type: [
        {
          type: Types.ObjectId,
          ref: 'modules',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('courses', coursesSchema);
