const mongoose = require('mongoose');
const { Types, Schema, models, model } = mongoose;

const registerProjectsSchema = new Schema(
  {
    // * step one
    personal_type: {
      type: String,
      required: true,
    },
    id_user: {
      type: Schema.Types.ObjectId,
      required: true,
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
    faculty_core: {
      type: String,
      required: true,
    },
    status_project: {
      type: Boolean,
      required: true,
      default: false,
    },

    // * teach

    category: {
      type: String,
      required: false,
    },
    last_date_promotion: {
      type: Date,
      required: false,
    },

    // * teach

    research_unit: {
      type: String,
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
    dedication: {
      type: String,
      required: true,
    },

    // * step two
    title: {
      type: String,
      required: false,
    },
    type_project: {
      type: String,
      required: false,
    },
    project_area: {
      type: String,
      required: false,
    },
    line_research: {
      type: String,
      required: false,
    },
    type_research: {
      type: String,
      required: false,
    },

    // * financed

    personal_payment_request: {
      type: {
        personal_payment_request_bsd: Number,
        personal_payment_request_dollars: Number,
      },
      required: false,
    },

    equipment_purchase_request: {
      type: {
        equipment_purchase_request_bsd: Number,
        equipment_purchase_request_dollars: Number,
      },
      required: false,
    },

    request_payment_materialsAndSupplies: {
      type: {
        request_payment_materialsAndSupplies_bsd: Number,
        request_payment_materialsAndSupplies_dollars: Number,
      },
      required: false,
    },

    request_tickets_travels: {
      type: {
        request_tickets_travels_bsd: Number,
        request_tickets_travels_dollars: Number,
      },
      required: false,
    },

    request_documents_amount: {
      type: {
        request_documents_amount_bsd: Number,
        request_documents_amount_dollars: Number,
      },
      required: false,
    },

    request_visibility_accessibility: {
      type: {
        request_visibility_accessibility_bsd: Number,
        request_visibility_accessibility_dollars: Number,
      },
      required: false,
    },

    request_in_other: {
      type: {
        request_in_other_bsd: Number,
        request_in_other_dollars: Number,
      },
      required: false,
    },

    // * financed

    program_code: {
      type: String,
      required: false,
    },

    // * step three
    project_summary: {
      type: String,
      required: false,
    },
    general_objective: {
      type: String,
      required: false,
    },
    specific_objectives: {
      type: String,
      required: false,
    },
    hypothesis: {
      type: String,
      required: false,
    },
    methodology_used: {
      type: String,
      required: false,
    },
    feasibility_research: {
      type: String,
      required: false,
    },
    chronogram_activities: {
      type: String,
      required: false,
    },

    // * step four
    number_participants: {
      type: Number,
      required: false,
    },
    participants: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'projectParticipants',
        },
      ],
    },

    // * step five
    documents: {
      type: [
        {
          file: {
            id: String,
            url: String,
          },
          name: String,
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = models.Projects || model('Projects', registerProjectsSchema);
