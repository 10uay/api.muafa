import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    classification: {
      type: String,
      default: "user",
    },
    // name of the patient
    name_of_user: {
      type: String,
      required: true,
    },
    // name of the patient for sign in
    username: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type_of_id: {
      type: String,
      required: true,
    },
    no_of_id: {
      type: Number,
      required: true,
    },
    patient: {
      type: Boolean,
      default: false,
    },
    operation_is_done: {
      type: Boolean,
      default: false,
    },
    is_employee: {
      type: Boolean,
      default: false,
    },
    verification_code: {
      code: {
        type: Number,
        require: false,
      },
      expiry: {
        type: Date,
        require: false,
      },
    },
    data: {
      order_info: {
        type_of_service: {
          type: String,
          require: true,
        },
        section_of_service: {
          type: String,
          require: true,
        },
        description: {
          type: String,
          require: false,
        },
      },
      personal_info: {
        date_of_birth: {
          type: Date,
          require: true,
        },
        age: {
          type: Number,
          require: true,
        },
        gender: {
          type: String,
          require: true,
        },
        nationality: {
          type: String,
          require: true,
        },
        id_expiry_date: {
          type: Date,
          require: true,
        },
        province: {
          type: String,
          require: true,
        },
        city: {
          type: String,
          require: true,
        },
        current_work: {
          type: String,
          require: true,
        },
        insurance: {
          type: String,
          require: true,
        },
      },
      family_info: {
        marital_status: {
          type: String,
          require: true,
        },
        no_of_dependent_family_members: {
          type: Number,
          require: true,
        },
        school_students: {
          are_there: {
            type: Boolean,
            require: true,
          },
          thier_number: {
            type: Number,
            require: false,
          },
        },
        dependent_patients_in_family: {
          are_there: {
            type: Boolean,
            require: true,
          },
          thier_number: {
            type: Number,
            require: false,
          },
        },
        family_income: {
          type: String,
          require: true,
        },
        ability_to_work: {
          able: {
            type: Boolean,
            require: true,
          },
          reason: {
            type: String,
            require: false,
          },
        },
        residence: {
          where: {
            type: String,
            require: true,
          },
          rental_value: {
            type: Number,
            require: false,
          },
        },
      },
      employer_and_closest_person_info: {
        employer: {
          type: String,
          require: false,
        },
        type: {
          type: String,
          require: false,
        },
        work_phone: {
          type: Number,
          require: false,
        },
        name_of_relative: {
          type: String,
          require: true,
        },
        relationship: {
          type: String,
          require: true,
        },
        relative_mobile: {
          type: Number,
          require: false,
        },
      },
      application_attachments: {
        hospital_appointment_notfication: {
          type: String,
          require: false,
        },
        proof_of_insurance_refusal: {
          type: String,
          require: false,
        },
        recent_medical_report: {
          type: String,
          require: true,
        },
        cost_letter: {
          type: String,
          require: false,
        },
        medical_report_date: {
          type: Date,
          require: true,
        },
        discounts: {
          type: Boolean,
          require: false,
          default: false,
        },
        service_provider: {
          type: String,
          require: false,
        },
      },
      document_attachments: {
        id_photo: {
          type: String,
          require: true,
        },
        residence_permit_validity_date_for_non_Saudis: {
          type: String,
          require: true,
        },
        salary_definition: {
          type: String,
          require: true,
        },
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
