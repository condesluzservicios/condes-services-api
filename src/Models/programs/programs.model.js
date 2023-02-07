import mongoose from 'mongoose';
import {
  commissionsRoles,
  statusProgramsAndProject,
} from '../../constants/entities.js';
const { Schema, models, model } = mongoose;

const ProgramSchema = new Schema(
  {
    // * responsible researcher
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
    email: {
      type: String,
      required: true,
    },
    cod_number: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },

    // * program data
    title: {
      type: String,
      required: true,
    },
    type_program: {
      type: String,
      required: true,
    },
    general_objective: {
      type: String,
      required: true,
    },
    status_program: {
      type: String,
      required: true,
      default: statusProgramsAndProject.toBeApproved,
    },
    line_research: {
      type: String,
      required: false,
    },
    commissionsRole: {
      type: String,
      required: false,
      default: Object.keys(commissionsRoles)[0],
    },

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

    program_code: {
      type: String,
      required: false,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },

    projects: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Projects',
        },
      ],
    },

    id_assignedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

export default models.Programs || model('Programs', ProgramSchema);
