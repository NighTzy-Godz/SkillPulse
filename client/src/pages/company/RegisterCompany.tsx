import React, { useEffect } from "react";
import FormHeader from "../../components/common/FormHeader";
import { Button, Label, Select, TextInput } from "flowbite-react";
import industries from "../../data/industry";
import { FaAddressCard, FaIndustry } from "react-icons/fa";
import { MdGroups, MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import companySize from "../../data/companySize";
import customBtnTheme from "../../utils/customBtnTheme";
import { useForm } from "react-hook-form";
import { CompanyRegisterData } from "../../interfaces/Company";
import InputError from "../../components/common/InputError";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";

import { useNavigate } from "react-router-dom";
import {
  setUserStatusCode,
  userRegisterCompany,
} from "../../store/slices/user";
function RegisterCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { statusCode } = useSelector((state: State) => state.entities.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyRegisterData>();

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setUserStatusCode(null));
      return navigate("/company-navigator");
    }
  }, [statusCode]);

  const renderIndustryOpts = industries.map((item) => {
    return (
      <option key={item.id} value={item.value}>
        {item.name}
      </option>
    );
  });

  const renderCompanySizeOpts = companySize.map((item) => {
    return (
      <option key={item.id} value={item.value}>
        {item.name}
      </option>
    );
  });

  const handleCompanyRegisterSubmit = (data: CompanyRegisterData) => {
    dispatch(userRegisterCompany(data));
  };

  return (
    <div className="py-10 h-dvh grid items-center">
      <div className="container mx-auto">
        <div className="md:w-1/2 mx-auto">
          <FormHeader header="Expand Your Team with Us. Register you company" />

          <form
            className="form"
            onSubmit={handleSubmit(handleCompanyRegisterSubmit)}
          >
            <div className="w-full mt-10 mb-5">
              <Label className="label">Company Name</Label>
              <TextInput
                sizing="lg"
                placeholder="Ex. Wells Fargo"
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

              {errors.name && (
                <InputError msg={errors.name.message as string} />
              )}
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

              {errors.size && (
                <InputError msg={errors.size.message as string} />
              )}
            </div>

            <div className="w-full mt-10 mb-5">
              <Label className="label">Location</Label>
              <TextInput
                {...register("location", {
                  required: "Company Location is a required field",
                  minLength: {
                    value: 10,
                    message:
                      "Company Location should have atleast 10 characters",
                  },
                  maxLength: {
                    value: 30,
                    message:
                      "Company Location should only contain 60 characters",
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

            <div className="mt-7">
              <Button
                type="submit"
                theme={customBtnTheme}
                color="blue"
                className="w-full"
              >
                Register Company
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterCompany;
