import ProfileCard from "../common/ProfileCard";
import NoProfileData from "../common/NoProfileData";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import moment from "moment";

function ProfileLicences() {
  const certifications = useSelector(
    (state: State) => state.entities.user.userData?.certifications
  );

  const renderCertifications = () => {
    if (certifications?.length === 0)
      return (
        <NoProfileData msg="This User did not put some Certifications at the moment" />
      );
    return certifications?.map((item) => {
      return (
        <div className="mb-5">
          <h3 className="text-zinc-700 font-bold">{item.name}</h3>
          <p className="text-zinc-500 text-sm">{item.organization}</p>
          <p className="text-zinc-400 text-sm">
            {moment(item.issueDate).format("MMM Do")}
          </p>
        </div>
      );
    });
  };

  return (
    <ProfileCard className="px-8 py-5 mb-4">
      <div className="mb-3 flex justify-between">
        <h1 className="text-gray-700 text-xl font-bold">Certifications</h1>

        <div className="flex gap-6">
          <div className="cursor-pointer">
            <IoMdAdd />
          </div>
          <div className="cursor-pointer">
            <FaEdit />
          </div>
        </div>
      </div>
      {renderCertifications()}
    </ProfileCard>
  );
}

export default ProfileLicences;
