import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const credencialProyectSchema = new Schema(
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

export default model('credencialProyect', credencialProyectSchema);
