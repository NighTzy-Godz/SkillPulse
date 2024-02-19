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

export interface CompanyUpdateIntroData extends CompanyRegisterData {
  description: string;
}

export interface CompanyUpdateOverviewData {
  about: string;
}

export interface ICompany {
  _id: string;
  isCompany: boolean;
  about: string;
  name: string;
  description: string;
  industry: INDUSTRY;
  website: string;
  email: string;
  logo: string;
  size: string;
  location: string;
  owner: IUser | string;
  coverPhoto: string;
  createdAt: Date;
  updatedAt: Date;
}
