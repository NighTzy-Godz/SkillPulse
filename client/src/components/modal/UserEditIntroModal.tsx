import {
  Button,
  Datepicker,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GENDER, IUser, UserIntroEditData } from "../../interfaces/User";

import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { MdEmail, MdContactPhone } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import InputError from "../common/InputError";
import handleNumbersOnly from "../../utils/handleNumbersOnly";
import genderData from "../../data/gender";
import { PiGenderIntersexFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import customBtnTheme from "../../utils/customBtnTheme";
import { setUserStatusCode, updateUserIntro } from "../../store/slices/user";
interface UserEditIntroModalProps {
  onModalClose(): void;
  showModal: boolean;
}

function UserEditIntroModal({
  showModal,
  onModalClose,
}: UserEditIntroModalProps) {
  const user = useSelector((state: State) => state.entities.user.userData);
  const loading = useSelector((state: State) => state.entities.user.loading);
  const statusCode = useSelector(
    (state: State) => state.entities.user.statusCode
  );

  const [selectedDate, setSelectedDate] = useState<Date>();

  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    gender,
    bio,
    email,
    location,
    contact,
    dateOfBirth,
  } = user || {};

  const values: UserIntroEditData = {
    firstName: firstName as string,
    lastName: lastName as string,
    gender: gender as GENDER,
    bio: bio as string,
    email: email as string,
    location: location as string,
    contact: contact as string,
    dateOfBirth,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserIntroEditData>({
    values,
  });

  const renderGenderOptions = genderData.map((item) => {
    return (
      <option key={item.id} value={item.value}>
        {item.name}
      </option>
    );
  });

  useEffect(() => {
    if (statusCode === 200) {
      onModalClose();
      dispatch(setUserStatusCode(null));
    }
  }, [statusCode]);

  const handleIntroSubmit = (data: UserIntroEditData) => {
    const reqBody: UserIntroEditData = {
      ...data,
      dateOfBirth: selectedDate as Date,
    };

    dispatch(updateUserIntro(reqBody));
  };

  if (loading) return <h1>LOADING.....</h1>;

  return (
    <Modal dismissible show={showModal} onClose={onModalClose} size="3xl">
      <Modal.Header>Edit Profile Intro</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleIntroSubmit)}>
          <div className="w-full mb-5">
            <Label className="label">First Name</Label>
            <TextInput
              {...register("firstName", {
                required: "First Name is a required field",
                minLength: {
                  value: 3,
                  message: "First Name should have atleast 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "First Name should only contain 20 characters",
                },
              })}
              placeholder="Ex. John Cord"
              sizing="lg"
              icon={FaAddressCard}
            />

            {errors.firstName && (
              <InputError msg={errors.firstName.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Last Name</Label>
            <TextInput
              {...register("lastName", {
                required: "Last Name is a required field",
                minLength: {
                  value: 3,
                  message: "Last Name should have atleast 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Last Name should only contain 20 characters",
                },
              })}
              placeholder="Ex. Lemisol"
              sizing="lg"
              icon={FaAddressCard}
            />
            {errors.lastName && (
              <InputError msg={errors.lastName.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Gender</Label>
            <Select
              sizing="lg"
              {...register("gender", {
                required: "Gender is a required field",
              })}
              icon={PiGenderIntersexFill}
            >
              <option value="">Your Gender</option>
              {renderGenderOptions}
            </Select>

            {errors.gender && (
              <InputError msg={errors.gender.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Date of Birth</Label>

            <Datepicker
              sizing="lg"
              onSelectedDateChanged={(date) => setSelectedDate(date)}
            />
            {errors.dateOfBirth && (
              <InputError msg={errors.dateOfBirth.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Email</Label>
            <TextInput
              {...register("email", {
                required: "Email is a required field",
                minLength: {
                  value: 3,
                  message: "Email should have atleast 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Email should only contain 30 characters",
                },
              })}
              placeholder="Ex. johnchord@gmail.com"
              sizing="lg"
              type="email"
              icon={MdEmail}
            />
            {errors.email && (
              <InputError msg={errors.email.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Contact Number</Label>
            <TextInput
              {...register("contact", {
                required: "Email is a required field",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Contact Number should have 11 digits",
                },
              })}
              placeholder="Ex. 0911-809-9902"
              sizing="lg"
              icon={MdContactPhone}
              onKeyDown={handleNumbersOnly}
            />

            {errors.contact && (
              <InputError msg={errors.contact.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Location</Label>
            <TextInput
              {...register("location", {
                minLength: {
                  value: 10,
                  message: "Location should have atleast 10 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Location should only contain 50 characters",
                },
              })}
              placeholder="Ex. Metro Manila"
              sizing="lg"
              icon={FaLocationDot}
            />

            {errors.location && (
              <InputError msg={errors.location.message as string} />
            )}
          </div>

          <div className="w-full mb-5">
            <Label className="label">Bio</Label>
            <Textarea
              {...register("bio", {
                minLength: {
                  value: 5,
                  message: "Bio should have atleast 5 characters",
                },
                maxLength: {
                  value: 250,
                  message: "Bio should only contain 250 characters",
                },
              })}
              placeholder="Tell us something about yourself"
            />

            {errors.bio && <InputError msg={errors.bio.message as string} />}
          </div>

          <Button theme={customBtnTheme} color="blue" type="submit">
            Update Intro
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UserEditIntroModal;
