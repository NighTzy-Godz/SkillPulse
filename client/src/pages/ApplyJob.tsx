import { Button, FileInput, Label } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/store";
import { useForm } from "react-hook-form";
import InputError from "../components/common/InputError";
import { useNavigate, useParams } from "react-router-dom";

import { AiOutlineLoading } from "react-icons/ai";
import { UserApplyJobData } from "../interfaces/User";
import { setUserStatusCode, userApplyJob } from "../store/slices/user";
import customBtnTheme from "../utils/customBtnTheme";

function ApplyJob() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { statusCode, loading } = useSelector(
    (state: State) => state.entities.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserApplyJobData>();

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setUserStatusCode(null));

      navigate("/user/jobs");
    }
  }, [statusCode]);

  const handleApplicationSubmit = (data: UserApplyJobData) => {
    const { resume } = data;
    const form = new FormData();
    form.append("resume", resume[0]);
    form.append("jobId", jobId as string);

    dispatch(userApplyJob(form as any, jobId as string));
  };

  return (
    <div className="py-20 h-[91dvh] grid place-items-center">
      <div className="container mx-auto">
        <div className="md:w-1/2 mx-auto ">
          <div className="boxShadow2 px-5 py-7">
            <h1 className="text-3xl font-semibold capitalize text-center text-zinc-700 mb-10">
              just upload your resume to get that dream job!
            </h1>
            <form onSubmit={handleSubmit(handleApplicationSubmit)}>
              <div className="mb-5">
                <Label className="label">Resume File</Label>
                <FileInput
                  helperText="Upload you resume here (Strictly PDF only)"
                  accept=".pdf"
                  {...register("resume", {
                    required: "Resume is a required field",
                    validate: (value: FileList) => {
                      if (value && value[0].type !== "application/pdf") {
                        return "Only PDF files are allowed";
                      }
                      return true;
                    },
                  })}
                />

                {errors.resume && (
                  <InputError msg={errors.resume.message as string} />
                )}
              </div>

              <Button
                color="blue"
                theme={customBtnTheme}
                className="w-full text-center"
                type="submit"
                isProcessing={loading}
                processingSpinner={
                  <AiOutlineLoading className="h-6 w-6 animate-spin" />
                }
              >
                {!loading ? "Upload Resume" : "Loading ... "}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
