import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { IEducation } from "../user/EducationCard";
import { useForm } from "react-hook-form";
import { UserUpdateEducationData } from "../../interfaces/User";
import InputError from "../common/InputError";
import customBtnTheme from "../../utils/customBtnTheme";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import {
  setUserStatusCode,
  updateUserEducation,
} from "../../store/slices/user";

export interface IEditEducationModalProps {
  isModalOpen: boolean;
  onModalClose(): void;
  data: IEducation;
}

export default function EditEducationModal(props: IEditEducationModalProps) {
  const { data, isModalOpen, onModalClose } = props;
  const { statusCode } = useSelector((state: State) => state.entities.user);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const values: UserUpdateEducationData = {
    _id: data._id,
    schoolName: data.schoolName,
    graduateYear: data.graduateYear,
    degree: data.degree,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserUpdateEducationData>({ values });

  useEffect(() => {
    if (statusCode === 200) {
      setUserStatusCode(null);
      onModalClose();
    }
  }, [statusCode]);

  const handleUpdateEducationSubmit = (data: UserUpdateEducationData) => {
    const reqBody: UserUpdateEducationData = {
      ...data,
      graduateYear: selectedDate as Date,
    };

    dispatch(updateUserEducation(reqBody));
  };

  return (
    <Modal show={isModalOpen} onClose={onModalClose}>
      <Modal.Header>Update Education</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleUpdateEducationSubmit)}>
          <div className="mb-5">
            <Label className="label">Graduate Year</Label>
            <Datepicker
              sizing="lg"
              onSelectedDateChanged={(date) => setSelectedDate(date)}
            />

            {errors.graduateYear && (
              <InputError msg={errors.graduateYear.message} />
            )}
          </div>
          <div className="mb-5">
            <Label className="label">School Name</Label>
            <TextInput
              sizing="lg"
              placeholder="Ex.. Boston University"
              {...register("schoolName", {
                required: "School Name is a required field",
              })}
            />

            {errors.schoolName && (
              <InputError msg={errors.schoolName.message} />
            )}
          </div>

          <div className="mb-5">
            <Label className="label">Degree</Label>
            <TextInput
              sizing="lg"
              placeholder="Ex.. Bachelor or Senior High School"
              {...register("degree", {
                required: "School Degree is a required field",
              })}
            />

            {errors.degree && <InputError msg={errors.degree.message} />}
          </div>

          <Button color="blue" theme={customBtnTheme} type="submit">
            Update Education
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
