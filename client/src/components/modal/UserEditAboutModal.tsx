import { Button, Label, Modal, Textarea } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { UserAboutEditData } from "../../interfaces/User";
import InputError from "../common/InputError";
import customBtnTheme from "../../utils/customBtnTheme";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
interface UserEditAboutModalProps {
  onModalClose(): void;
  showModal: boolean;
}

function UserEditAboutModal({
  showModal,
  onModalClose,
}: UserEditAboutModalProps) {
  const userAbout = useSelector(
    (state: State) => state.entities.user.userData?.about
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserAboutEditData>({
    values: {
      about: userAbout as string,
    },
  });

  const handleAboutSubmit = (data: UserAboutEditData) => {
    console.log(data);
  };

  return (
    <Modal dismissible show={showModal} onClose={onModalClose}>
      <Modal.Header>Edit About</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleAboutSubmit)}>
          <div className="mb-5">
            <Label className="label  block">
              You can write about your years of experience, industry, or skills.
              People also talk about their achievements or previous job
              experiences.
            </Label>
            <Textarea
              rows={15}
              {...register("about", {
                maxLength: {
                  value: 250,
                  message: "About Field can only contain 250 characters",
                },
              })}
              placeholder="Tell us something about yourself"
            />

            {errors.about && (
              <InputError msg={errors.about.message as string} />
            )}
          </div>

          <Button type="submit" theme={customBtnTheme} color="blue">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UserEditAboutModal;