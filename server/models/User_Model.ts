import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";
const DB_URL = "mongodb://localhost:27017/skillpulse";
const jwtSecretPass = "secretPass";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the database - User"))
  .catch((err) => console.log("Error on User ", err));

export enum GENDER {
  Male = "Male",
  Female = "Female",
}

export enum EmploymentType {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
}

// NOTE: Add a recentSearch field if needed

interface IUser extends Document {
  role: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  location: string;
  about: string;
  pfp: string;
  gender: GENDER;
  coverPhoto: string;
  company?: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  contact: string;
  currPosition?: string;
  bio?: string;
  skills?: string[];
  generateAuthToken(): string;

  education?: {
    schoolName: string;
    degree: string;
    graduateYear: string;
  }[];

  experience?: {
    company: string;
    position: string;
    startDate: Date;
    endDate: Date | string;
    desc?: string;
    employmentType: EmploymentType;
    location?: string;
  }[];

  projects?: {
    projectName: string;
    link: string;
    desc: string;
    startDate: Date;
    endDate: Date | string;
  }[];

  certifications?: {
    name: string;
    organization: string;
    issueDate: Date;
  }[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  about: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "User",
  },
  email: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: Date,
    default: Date.now(),
  },

  pfp: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png",
  },

  coverPhoto: {
    type: String,
    default:
      "https://iwritingsolutions.com/wp-content/uploads/2022/05/you-can-live-now.-thank-you.jpg",
  },
  gender: {
    type: String,
    enum: Object.values(GENDER),
    required: true,
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  contact: {
    type: String,
    required: true,
  },

  currPosition: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  skills: [
    {
      type: String,
      maxlength: 20,
    },
  ],

  education: [
    {
      schoolName: {
        type: String,
        requird: true,
      },
      degree: {
        type: String,
        required: true,
      },
      graduateYear: {
        type: String,
        required: true,
      },
    },
  ],

  experience: [
    {
      company: {
        type: String,
        required: true,
      },

      employmentType: {
        type: String,
        enum: Object.values(EmploymentType),
        required: true,
      },

      position: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },

      location: {
        type: String,
        default: "",
      },

      desc: {
        type: String,
        default: "",
      },

      endDate: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  ],

  projects: [
    {
      projectName: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        default: "",
      },
      desc: {
        type: String,
        default: "",
      },
      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date || String,
        required: true,
      },
    },
  ],

  certifications: [
    {
      name: {
        type: String,
        required: true,
      },

      organization: {
        type: String,
        required: true,
      },
      issueDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = function (this) {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    jwtSecretPass
  );
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
