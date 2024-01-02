import mongoose, { Schema, Document } from "mongoose";
const DB_URL = "mongodb://localhost:27017/skillpulse";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Datebase - Company "))
  .catch((err) => console.log("Error on Company - ", err));

export enum INDUSTRY {
  Information_Technology = "Information Technology",
  Healthcare = "Healthcare",
  Finance = "Finance",
  Education = "Education",
  Manufacturing = "Manufacturing",
  Hospitality = "Hospitality",
  Engineering = "Engineering",
  Logistics = "Logistics",
}

interface ICompany extends Document {
  name: string;
  description: string;
  industry: INDUSTRY;
  website: string;
  logo: string;
  size: string;
  location: string;
  coverPhoto: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema: Schema<ICompany> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    industry: {
      type: String,
      enum: Object.values(INDUSTRY),
      required: true,
    },
    website: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default:
        "https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg",
    },

    size: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coverPhoto: {
      type: String,
      default:
        "https://iwritingsolutions.com/wp-content/uploads/2022/05/you-can-live-now.-thank-you.jpg",
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model<ICompany>("Company", companySchema);

export default Company;
