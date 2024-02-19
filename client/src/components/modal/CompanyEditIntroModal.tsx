import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CompanyUpdateIntroData, INDUSTRY } from "../../interfaces/Company";
import { FaAddressCard, FaIndustry } from "react-icons/fa";
import InputError from "../common/InputError";
import { MdEmail, MdGroups } from "react-icons/md";
import companySize from "../../data/companySize";
import industries from "../../data/industry";
import { FaLocationDot } from "react-icons/fa6";
import customBtnTheme from "../../utils/customBtnTheme";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { setStatusCode, updateCompanyIntro } from "../../store/slices/company";

interface CompanyEditIntroModalProps {
  isModalOpen: boolean;
  onModalClose(): void;
}

function CompanyEditIntroModal({
  isModalOpen,
  onModalClose,
}: CompanyEditIntroModalProps) {
  const dispatch = useDispatch();
  const { statusCode, loading } = useSelector(
    (state: State) => state.entities.company
  );

  const companyData = useSelector(
    (state: State) => state.entities.company.currCompany
  );

  const values: CompanyUpdateIntroData = {
    name: companyData?.name as string,
    industry: companyData?.industry as INDUSTRY,
    size: companyData?.size as string,
    location: companyData?.location as string,
    email: companyData?.email as string,
    description: companyData?.description as string,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CompanyUpdateIntroData>({
    values,
  });

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStatusCode(null));
      onModalClose();
    }
  }, [statusCode]);

  const renderCompanySizeOpts = companySize.map((item) => {
    return (
      <option key={item.id} value={item.value}>
        {item.name}
      </option>
    );
  });

  const renderIndustryOpts = industries.map((item) => {
    return (
      <option key={item.id} value={item.value}>
        {item.name}
      </option>
    );
  });

  const handleCompanyEditIntroSubmit = (data: CompanyUpdateIntroData) => {
    dispatch(updateCompanyIntro(data));
  };
  return (
    <Modal show={isModalOpen} onClose={onModalClose}>
      <Modal.Header>Update Company Intro</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleCompanyEditIntroSubmit)}>
          <div className="mb-5">
            <Label className="label"></Label>
            <TextInput
              sizing="lg"
              icon={FaAddressCard}
              {...register("name", {
                required: "Company Name is a required field",
                minLength: {
                  value: 3,
                  message: "Company Name should have atleast 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Company Name should only contain 30 characters",
                },
              })}
            />

            {errors.name && <InputError msg={errors.name.message} />}
          </div>

          <div className="w-full mt-10 mb-5">
            <Label className="label">Company Email</Label>
            <TextInput
              sizing="lg"
              placeholder="Ex. wellsfargo@gmail.com"
              icon={MdEmail}
              {...register("email", {
                required: "Company Email is a required field",
                minLength: {
                  value: 3,
                  message: "Company Email should have atleast 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Company Email should only contain 30 characters",
                },
              })}
            />

            {errors.email && (
              <InputError msg={errors.email.message as string} />
            )}
          </div>

          <div className="w-full mt-10 mb-8">
            <Label className="label">Industry</Label>
            <Select
              sizing="lg"
              icon={FaIndustry}
              {...register("industry", {
                required: "Industry is a required field",
              })}
            >
              <option value="">Company's Industry</option>
              {renderIndustryOpts}
            </Select>

            {errors.industry && (
              <InputError msg={errors.industry.message as string} />
            )}
          </div>

          <div className="w-full mt-10 mb-8">
            <Label className="label">Company Size</Label>
            <Select
              sizing="lg"
              icon={MdGroups}
              {...register("size", {
                required: "Company Size is a required field",
              })}
            >
              <option value="">Company's Employee Number</option>
              {renderCompanySizeOpts}
            </Select>

            {errors.size && <InputError msg={errors.size.message as string} />}
          </div>

          <div className="w-full mt-10 mb-5">
            <Label className="label">Location</Label>
            <TextInput
              {...register("location", {
                required: "Company Location is a required field",
                minLength: {
                  value: 10,
                  message: "Company Location should have atleast 10 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Company Location should only contain 60 characters",
                },
              })}
              sizing="lg"
              placeholder="Ex. BGC Taguig City"
              icon={FaLocationDot}
            />

            {errors.location && (
              <InputError msg={errors.location.message as string} />
            )}
          </div>

          <div className="w-full mt-10 mb-5">
            <Label className="label">Company Short Description</Label>
            <Textarea
              {...register("description", {
                required: "Company Descrpiption is a required field",
                minLength: {
                  value: 5,
                  message:
                    "Company Descrpiption should have atleast 5 characters",
                },
                maxLength: {
                  value: 250,
                  message:
                    "Company Descrpiption should only contain 250 characters",
                },
              })}
              placeholder="Tell a short description about your company"
            />

            {errors.description && (
              <InputError msg={errors.description.message as string} />
            )}
          </div>

          <div className="mt-7">
            <Button
              type="submit"
              theme={customBtnTheme}
              color="blue"
              className="w-full"
              isProcessing={loading}
            >
              Update Company Intro
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CompanyEditIntroModal;
