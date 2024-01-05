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

// NOTE: Add a recentSearch field if needed

interface IUser extends Document {
  email: string;
  password: string;

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
    desc: string;
  }[];

  experience?: {
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
  }[];

  projects?: {
    projectName: string;
    link: string;
    desc: string;
    startDate: Date;
    endDate: Date;
  }[];

  certifications?: {
    name: string;
    organization: string;
    issueDate: Date;
  }[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
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

      desc: {
        type: String,
        default: "",
      },
    },
  ],

  experience: [
    {
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },

      position: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
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
        type: Date,
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

      fullName: this.firstName + " " + this.lastName,
    },
    jwtSecretPass
  );
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
