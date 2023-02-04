import mongoose from 'mongoose';
const { Schema, models, model } = mongoose;

const settingsSchema = new Schema(
  {
    // * documents
    grant_application_for_project_approval: {
      type: {
        file: {
          id: String,
          url: String,
        },
        name: String,
      },
      required: false,
    },
    progress_report_six_months: {
      type: {
        file: {
          id: String,
          url: String,
        },
        name: String,
      },
      required: false,
    },
    progress_report_eighteen_months: {
      type: {
        file: {
          id: String,
          url: String,
        },
        name: String,
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Settings || model('Settings', settingsSchema);
