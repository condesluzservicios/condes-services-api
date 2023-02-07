import mongoose from 'mongoose';
import { commissionsRoles } from '../../constants/entities.js';
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
      default: false,
    },
    cod_number: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },

    // * evaluator / coordinator
    type_identification: {
      type: String,
      required: false,
    },
    identification_number: {
      type: Number,
      required: false,
      unique: true,
      default: 0,
    },
    expertise_area: {
      type: String,
      required: false,
    },
    line_research: {
      type: String,
      required: false,
    },
    commissionsRole: {
      type: String,
      required: true,
      default: Object.keys(commissionsRoles)[0],
    },
    profession: {
      type: String,
      required: false,
    },
    // * evaluator
    assigned_projects: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Projects',
        },
      ],
      required: false,
    },

    // * coordinator
    permissions: {
      type: {
        something: Boolean,
        default: false,
      },
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

export default model('users', userSchema);
