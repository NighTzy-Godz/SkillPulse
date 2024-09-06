import {
  Button,
  Checkbox,
  Datepicker,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserAddExpData } from "../../interfaces/User";
import InputError from "../common/InputError";
import employmentType from "../../data/employmentType";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import customBtnTheme from "../../utils/customBtnTheme";
import { addUserExp, setUserStatusCode } from "../../store/slices/user";
import { v4 as uuidv4 } from "uuid";

interface UserAddExpModalProps {
  onModalClose(): void;
  showModal: boolean;
}

function UserAddExpModal({ showModal, onModalClose }: UserAddExpModalProps) {
  const dispatch = useDispatch();
  const { statusCode } = useSelector((state: State) => state.entities.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAddExpData>();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setUserStatusCode(null));
      onModalClose();
    }
  }, [statusCode]);

  const renderEmploymentType = employmentType.map((item) => {
    return (
      <option value={item.value} key={item.id}>
        {item.name}
      </option>
    );
  });

  const handleAddExpSubmit = (formData: UserAddExpData) => {
    let endJobDate: string | Date;
    endJobDate = isCurrentlyWorking ? "Present" : endDate;

    const reqBody: UserAddExpData = {
      ...formData,
      _id: uuidv4(),
      endDate: endJobDate,
      startDate,
    };

    dispatch(addUserExp(reqBody));
  };

  return (
    <Modal show={showModal} onClose={onModalClose} size="2xl">
      <Modal.Header>Add Your Experience</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleAddExpSubmit)}>
          <div className="w-full mb-5">
            <Label className="label">Company Position</Label>
            <TextInput
              {...register("position", {
                required: "Position is a required field",
                minLength: {
                  value: 3,
                  message: "Position should have atleast 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Position should only contain 50 characters",
                },
              })}
              placeholder="Ex. Retail Sales Manager"
              sizing="lg"
            />

            {errors.position && (
              <InputError msg={errors.position.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Employment Type</Label>
            <Select
              sizing="lg"
              {...register("employmentType", {
                required: "Job Type is a required field",
              })}
            >
              <option value="">Employment Type</option>
              {renderEmploymentType}
            </Select>

            {errors.employmentType && (
              <InputError msg={errors.employmentType.message as string} />
            )}
          </div>

          <div className="w-full mb-5 relative">
            <Label className="label">Company</Label>
            <TextInput
              {...register("company", {
                required: "Company Name is a required field",
                minLength: {
                  value: 3,
                  message: "Company Name should contain 3 letters",
                },

                maxLength: {
                  value: 50,
                  message: "Company Name should only contain 50 letters",
                },
              })}
              placeholder="Ex. Accenture"
              sizing="lg"
            />

            {errors.company && (
              <InputError msg={errors.company.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Start Date</Label>

            <Datepicker
              sizing="lg"
              onSelectedDateChanged={(date) => setStartDate(date)}
            />
            {errors.startDate && (
              <InputError msg={errors.startDate.message as string} />
            )}
          </div>

          <div className="w-full mb-5 ">
            <div className="flex items-center gap-2">
              <Checkbox
                onClick={() => setIsCurrentlyWorking(!isCurrentlyWorking)}
              />
              <h3>I am currently working on this role </h3>
            </div>
          </div>

          <div className="w-full mb-5">
            <Label className="label">End Date</Label>

            <Datepicker
              disabled={isCurrentlyWorking}
              sizing="lg"
              onSelectedDateChanged={(date) => setEndDate(date)}
            />
            {errors.endDate && (
              <InputError msg={errors.endDate.message as string} />
            )}
          </div>

          <Button type="submit" color="blue" theme={customBtnTheme}>
            Add Experience
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UserAddExpModal;
