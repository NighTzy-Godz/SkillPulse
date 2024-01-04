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
