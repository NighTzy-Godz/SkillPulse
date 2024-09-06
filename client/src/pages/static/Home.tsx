import { Button, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMail, HiLockClosed } from "react-icons/hi";

import { useForm } from "react-hook-form";
import { LoginUserData } from "../../interfaces/User";
import InputError from "../../components/common/InputError";
import customBtnTheme from "../../utils/customBtnTheme";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { setStatusCode, userLogin } from "../../store/slices/auth";
import { toast } from "react-toastify";

const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL;
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD;

function Home() {
  const currUserId = useSelector(
    (state: State) => state.entities.auth.decodedModel?._id
  );
  const dispatch = useDispatch();
  const statusCode = useSelector(
    (state: State) => state.entities.auth.statusCode
  );

  const loading = useSelector((state: State) => state.entities.auth.loading);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUserData>();

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStatusCode(null));

      navigate("/cold-login");
    }

    if (currUserId) {
      return navigate(`/user/profile/${currUserId}`);
    }
  }, [statusCode, currUserId]);

  const handleLoginSubmit = (data: LoginUserData) => {
    dispatch(userLogin(data));
  };

  const handleDemoLogin = () => {
    console.log(DEMO_EMAIL, DEMO_PASSWORD);

    const reqBody: LoginUserData = {
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    };

    dispatch(userLogin(reqBody));
  };

  return (
    <div className="home md:h-dvh py-10 grid items-center ">
      <div className="container mx-auto">
        <div className="md:flex  md:gap-5 items-center w-full">
          <div className="mb-16 md:w-1/2">
            <h1 className=" mb-6 font-bold capitalize text-blue-500 lg:text-7xl sm:text-5xl text-4xl">
              Discover Your Perfect Job
            </h1>
            <p className="text-base text-gray-700 lg:mb-16 mb-5 lg:text-xl ">
              Empowering Careers, Connecting Futures — SkillPulse. Your Journey
              to Success Starts Here
            </p>

            <NavLink
              to="/searchJobs"
              className="blueBtn rounded-full  md:text-base"
            >
              Discover Jobs
            </NavLink>
          </div>

          <div className="md:w-1/2  ">
            <div className="flex md:justify-end justify-center">
              <form
                className="boxShadow px-5 pt-5 pb-5 form lg:w-3/4 w-full"
                onSubmit={handleSubmit(handleLoginSubmit)}
              >
                <div className="mb-5">
                  <h1 className="md:text-3xl text-2xl text-center font-bold text-gray-600">
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
                  isProcessing={loading}
                  theme={customBtnTheme}
                  size="md"
                  color="blue"
                  type="submit"
                  className="w-full text-md"
                >
                  {loading ? "Logging In ..." : "Login"}
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

                <div className="mt-5 text-center">
                  <p
                    className="cursor-pointer underline text-blue-500 text-sm"
                    onClick={handleDemoLogin}
                  >
                    Login Here as a Demo User
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
