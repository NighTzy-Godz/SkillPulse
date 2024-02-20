import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { UserAddEducationData } from "../../interfaces/User";
import InputError from "../common/InputError";
import customBtnTheme from "../../utils/customBtnTheme";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserEducation } from "../../store/slices/user";

export interface IUserAddEducationModalProps {
  isModalOpen: boolean;
  onModalClose(): void;
}

export default function UserAddEducationModal(
  props: IUserAddEducationModalProps
) {
  const { isModalOpen, onModalClose } = props;

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAddEducationData>();

  const handleAddEducationSubmit = (data: UserAddEducationData) => {
    const reqBody: UserAddEducationData = {
      ...data,
      graduateYear: selectedDate as Date,
    };
    dispatch(addUserEducation(reqBody));
  };

  return (
    <Modal show={isModalOpen} onClose={onModalClose} className="min-h-dvh">
      <Modal.Header>Add Your Education</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleAddEducationSubmit)}>
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
            Add Education
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
