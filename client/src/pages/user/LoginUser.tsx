import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LoginUserData } from "../../interfaces/User";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { setStatusCode, userLogin } from "../../store/slices/auth";
import { Button, Label, TextInput } from "flowbite-react";
import { HiLockClosed, HiMail } from "react-icons/hi";
import InputError from "../../components/common/InputError";
import customBtnTheme from "../../utils/customBtnTheme";

function LoginUser() {
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );
  const dispatch = useDispatch();
  const statusCode = useSelector(
    (state: State) => state.entities.auth.statusCode
  );

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUserData>();

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

      navigate("/cold-login");
    }
  }, [statusCode, currUserId]);

  const handleLoginSubmit = (data: LoginUserData) => {
    dispatch(userLogin(data));
  };

  return (
    <div className="home md:h-dvh grid items-center ">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-2/4  ">
            <div className="flex justify-end">
              <form
                className="boxShadow px-5 pt-5 pb-5 form w-full "
                onSubmit={handleSubmit(handleLoginSubmit)}
              >
                <div className="mb-5">
                  <h1 className="text-3xl text-center font-bold text-gray-600">
                    Sign In Here
                  </h1>
                </div>
                <div className="mb-5">
                  <Label className="block mb-1 text-lg text-gray-600 font-bold">
                    Email
                  </Label>
                  <TextInput
                    type="email"
                    icon={HiMail}
                    placeholder="Ex. test@gmail.com"
                    sizing="lg"
                    {...register("email", {
                      required: "Email is a required field.",
                    })}
                  />
                  {errors.email && (
                    <InputError msg={errors.email.message as string} />
                  )}
                </div>

                <div className="mb-5">
                  <Label className="block mb-1 text-lg text-gray-600 font-bold">
                    Password
                  </Label>
                  <TextInput
                    type="password"
                    icon={HiLockClosed}
                    placeholder="Account's Pasword"
                    sizing="lg"
                    {...register("password", {
                      required: "Password is a required field.",
                    })}
                  />

                  {errors.password && (
                    <InputError msg={errors.password.message as string} />
                  )}
                </div>

                <Button
                  theme={customBtnTheme}
                  size="md"
                  color="blue"
                  type="submit"
                  className="w-full text-md"
                >
                  Login
                </Button>

                <div className="mt-3 flex gap-1">
                  <p className="text-zinc-700 text-sm">Dont have an account?</p>
                  <Link
                    to="/register-user"
                    className="text-blue-500 text-sm underline "
                  >
                    Register Here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
