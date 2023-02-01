import mongoose from 'mongoose';
const { Types, Schema, models, model } = mongoose;

const projectparticipantsSchema = new Schema(
  {
    id_project: {
      type: Schema.Types.ObjectId,
      ref: 'Projects',
    },
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    type_identification: {
      type: String,
      required: true,
    },
    identification: {
      type: Number,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    institution_name: {
      type: String,
      required: false,
      default: 'LUZ',
    },
    position: {
      type: String,
      required: true,
    },
    faculty_core: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    research_entity: {
      type: String,
      required: true,
    },
    last_date_promotion: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cod_number: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.projectParticipants ||
  model('projectParticipants', projectparticipantsSchema);
