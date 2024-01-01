import mongoose, { Schema, Document } from "mongoose";

const DB_URL = "mongodb://localhost:27017/skillpulse";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the database - User"))
  .catch((err) => console.log("Error on User ", err));

enum PRONOUNS {
  HIS_HIM = "His / Him",
  SHE_HER = "She / Her",
}

enum ROLE {
  JobSeeker = "JobSeeker",
  Employer = "Employer",
}

interface ProfileData {
  firstName: string;
  lastName: string;
  contact: string;
  currPosition?: string;
  bio?: string;
  skills?: string[];

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

// NOTE: Add a recentSearch field if needed

interface IUser extends Document {
  email: string;
  password: string;
  role: ROLE;
  about: string;
  pfp: string;
  pronouns: string;
  coverPhoto: string;
  company: mongoose.Schema.Types.ObjectId;
  profile: ProfileData;
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

  role: {
    type: String,
    enum: Object.values(ROLE),
    required: true,
  },

  pfp: {
    type: String,
    default: "",
  },

  coverPhoto: {
    type: String,
    default: "",
  },
  pronouns: {
    type: String,
    enum: Object.values(PRONOUNS),
    required: true,
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },

  profile: {
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
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
