import { Button, Label, Select, TextInput } from "flowbite-react";

import { FaAddressCard } from "react-icons/fa";
import { MdEmail, MdContactPhone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import gender from "../../data/gender";
import customBtnTheme from "../../utils/customBtnTheme";
import { useForm } from "react-hook-form";
import { RegisterUserData } from "../../interfaces/User";
import InputError from "../../components/common/InputError";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { setStatusCode, userRegister } from "../../store/slices/auth";
import FormHeader from "../../components/common/FormHeader";
import { PiGenderIntersexFill } from "react-icons/pi";
import handleNumbersOnly from "../../utils/handleNumbersOnly";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { statusCode, decodedModel, loading } = useSelector(
    (state: State) => state.entities.auth
  );

  const currUserId = decodedModel?._id;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterUserData>();

  useEffect(() => {
    if (currUserId) {
      toast.error("You are already authenticated, you cannot do that action", {
        autoClose: 2500,
        toastId: "Auth Err",
      });
      return navigate(`/user/profile/${currUserId}`);
    }

    if (statusCode === 200) {
      dispatch(setStatusCode(null));

      navigate("/login-user");
    }
  }, [statusCode, currUserId]);

  const renderOptions = gender.map((item) => {
    return (
      <option key={item.id} value={item.value}>
        {item.name}
      </option>
    );
  });

  const handleRegisterSubmit = (data: RegisterUserData) => {
    dispatch(userRegister(data));
  };

  return (
    <div className="py-10 h-dvh grid items-center">
      <div className="container mx-auto">
        <div className="lg:w-1/2 md:w-3/4 mx-auto">
          <FormHeader header="start you career here. get registered" />

          <form onSubmit={handleSubmit(handleRegisterSubmit)} className="form">
            <div className="flex justify-center gap-5 mt-10 mb-5 ">
              <div className="w-full">
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

              <div className="w-full">
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
            </div>

            <div className="flex justify-center gap-5 mt-10 mb-8 ">
              <div className="w-full">
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

              <div className="w-full">
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
            </div>

            <div className="w-full">
              <Label className="label">Gender</Label>
              <Select
                sizing="lg"
                {...register("gender", {
                  required: "Gender is a required field",
                })}
                icon={PiGenderIntersexFill}
              >
                <option value="">Your Gender</option>
                {renderOptions}
              </Select>

              {errors.gender && (
                <InputError msg={errors.gender.message as string} />
              )}
            </div>

            <div className="flex justify-center gap-5 mt-8 mb-15 ">
              <div className="w-full">
                <Label className="label">Password</Label>
                <TextInput
                  {...register("password", {
                    required: "Password is a required field",
                    minLength: {
                      value: 8,
                      message: "Password should have atleast 8 characters",
                    },
                    maxLength: {
                      value: 25,
                      message: "Password should only contain 25 characters",
                    },
                  })}
                  placeholder="Your Desired Password"
                  sizing="lg"
                  type="password"
                  icon={RiLockPasswordFill}
                />

                {errors.password && (
                  <InputError msg={errors.password.message as string} />
                )}
              </div>

              <div className="w-full">
                <Label className="label">Confirm Password</Label>
                <TextInput
                  {...register("confirmPassword", {
                    required: "Confirm Password is a required field",
                    minLength: {
                      value: 8,
                      message:
                        "Confirm Password should have atleast 8 characters",
                    },
                    maxLength: {
                      value: 25,
                      message:
                        "Confirm Password should only contain 25 characters",
                    },
                  })}
                  placeholder="Match it with Password"
                  sizing="lg"
                  type="password"
                  icon={RiLockPasswordFill}
                />

                {errors.confirmPassword && (
                  <InputError msg={errors.confirmPassword.message as string} />
                )}
              </div>
            </div>

            <div className="mt-7">
              <Button
                isProcessing={loading}
                type="submit"
                theme={customBtnTheme}
                color="blue"
                className="w-full"
              >
                {loading ? "Registering ..." : "Register User"}
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-zinc-600">
                Already have an account?{" "}
                <Link to="/login-user" className="underline">
                  Login Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
