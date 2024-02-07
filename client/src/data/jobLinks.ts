export interface JobLink {
  id: number;
  name: string;
  link: string;
  value: string;
}

const jobLinks = [
  {
    id: 0,
    name: "Saved Jobs",
    link: "saved",
    value: "SAVED",
  },

  {
    id: 1,
    name: "Applied Jobs",
    link: "applied",
    value: "APPLIED",
  },
];

export default jobLinks;
