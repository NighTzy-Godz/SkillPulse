import { Button, Label, Modal, Textarea } from "flowbite-react";

import { CompanyUpdateOverviewData } from "../../interfaces/Company";
import { useForm } from "react-hook-form";
import customBtnTheme from "../../utils/customBtnTheme";
import InputError from "../common/InputError";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import {
  setStatusCode,
  updateCompanyOverview,
} from "../../store/slices/company";
import { useEffect } from "react";

export interface ICompanyEditOverviewModalProps {
  isModalOpen: boolean;
  onModalClose(): void;
}

export default function CompanyEditOverviewModal(
  props: ICompanyEditOverviewModalProps
) {
  const { isModalOpen, onModalClose } = props;
  const dispatch = useDispatch();

  const { statusCode, loading, currCompany } = useSelector(
    (state: State) => state.entities.company
  );

  const values: CompanyUpdateOverviewData = {
    about: currCompany?.about as string,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CompanyUpdateOverviewData>({
    values,
  });

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStatusCode(null));

      onModalClose();
    }
  }, [statusCode]);

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const handleUpdateOverviewSubmit = (data: CompanyUpdateOverviewData) => {
    dispatch(updateCompanyOverview(data));
  };

  return (
    <Modal show={isModalOpen} onClose={onModalClose}>
      <Modal.Header>Update Company Overview</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleUpdateOverviewSubmit)}>
          <div className="mb-5">
            <Label className="label">Company Overview</Label>
            <Textarea
              rows={7}
              placeholder="Company Overview ...."
              {...register("about", {
                required: "Company Overview is a required field",
                min: {
                  value: 10,
                  message: "Company overview should be atleast 10 characters",
                },

                max: {
                  value: 1000,
                  message:
                    "Company overview should only contain 1000 characters",
                },
              })}
              onChange={(e) => handleTextArea(e)}
            />

            {errors.about && <InputError msg={errors.about.message} />}
          </div>

          <Button
            isProcessing={loading}
            type="submit"
            color="blue"
            theme={customBtnTheme}
          >
            Update Company Overview
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
