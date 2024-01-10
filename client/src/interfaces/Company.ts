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
  isCompany: boolean;
  name: string;
  moderators: IUser[];
  description: string;
  industry: INDUSTRY;
  website: string;
  email: string;
  logo: string;
  size: string;
  location: string;
  owner: IUser;
  coverPhoto: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
