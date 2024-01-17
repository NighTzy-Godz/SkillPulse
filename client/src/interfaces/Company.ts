import { IUser } from "./User";

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

export interface CompanyRegisterData {
  name: string;
  industry: INDUSTRY;
  size: string;
  location: string;
  email: string;
}

export interface ICompany {
  _id: string;
  isCompany: boolean;
  name: string;
  description: string;
  industry: INDUSTRY;
  website: string;
  email: string;
  logo: string;
  size: string;
  location: string;
  owner: IUser;
  coverPhoto: string;
  createdAt: Date;
  updatedAt: Date;
}
