import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    blue: "transition-all text-xl duration-200 text-center text-white bg-blue-500 border border-transparent enabled:hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 ",
  },
};

function Home() {
  return (
    <div className="home md:h-[92dvh] grid items-center ">
      <div className="container mx-auto">
        <div className="flex gap-5">
          <div className="mb-5 w-1/2">
            <h1 className=" mb-6 font-bold capitalize md:text-8xl text-blue-500">
              Discover Your Perfect Job
            </h1>
            <p className="mb-16 text-gray-700 md:text-xl">
              Empowering Careers, Connecting Futures — SkillPulse. Your Journey
              to Success Starts Here
            </p>

            <NavLink to="/" className="blueBtn rounded-full  md:text-lg">
              Discover Jobs
            </NavLink>
          </div>

          <div className="w-1/2  flex justify-center">
            <form className="boxShadow px-5 pt-5 pb-5 homeForm w-2/3 ">
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
                />
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
                />
              </div>

              <Button
                theme={customTheme}
                size="md"
                color="blue"
                className="w-full text-md"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
