const mongoose = require('mongoose');
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
    position: {
      type: String,
      required: true,
    },
    faculty_core: {
      type: String,
      required: true,
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

module.exports =
  models.projectParticipants ||
  model('projectParticipants', projectparticipantsSchema);