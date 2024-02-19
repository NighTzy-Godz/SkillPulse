import { UserType } from "../store/slices/ui";

const findUserType = (link: string) => {
  if (link.includes("user")) return UserType.USER;
  return UserType.COMPANY;
};

export default findUserType;
