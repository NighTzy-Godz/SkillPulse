import {
  Button,
  Card,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateJobData } from "../interfaces/Job";
import customBtnTheme from "../utils/customBtnTheme";
import handleNumbersOnly from "../utils/handleNumbersOnly";
import employmentType from "../data/employmentType";
import InputError from "../components/common/InputError";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob, setJobStatusCode } from "../store/slices/job";
import { State } from "../store/store";

function CreateJob() {
  const statusCode = useSelector(
    (state: State) => state.entities.job.statusCode
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateJobData>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyId } = useParams();

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setJobStatusCode(null));
      return navigate(`/company/profile/${companyId}`);
    }
  }, [statusCode]);

  const renderEmploymentType = employmentType.map((item) => {
    return (
      <option value={item.value} key={item.id}>
        {item.name}
      </option>
    );
  });

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const handleCreateJobSubmit = (data: CreateJobData) => {
    dispatch(createJob(data, companyId as string));
  };

  return (
    <div className="py-8 ">
      <div className="container mx-auto">
        <div className="md:w-1/2 mx-auto">
          <Card className="boxShadow2">
            <form onSubmit={handleSubmit(handleCreateJobSubmit)}>
              <div className="w-full mb-5">
                <Label className="label">Job Title</Label>
                <TextInput
                  {...register("title", {
                    required: "Job Title is a required field",
                    minLength: {
                      value: 5,
                      message: "Job Title should contain atleast 5 characters",
                    },

                    maxLength: {
                      value: 100,
                      message: "Job Title should only contain 100 characters",
                    },
                  })}
                  placeholder="Ex. Full Stack Developer"
                />
                {errors && errors.title && (
                  <InputError msg={errors.title.message as string} />
                )}
              </div>
              <div className="w-full mb-5">
                <Label className="label"> Location</Label>
                <TextInput
                  {...register("location", {
                    required: "Job Location is a required field",
                    minLength: {
                      value: 10,
                      message:
                        "Job Location should contain atleast 10 characters",
                    },

                    maxLength: {
                      value: 60,
                      message: "Job Location should only contain 60 characters",
                    },
                  })}
                  placeholder="Ex. BGC Taguig City"
                />
                {errors && errors.location && (
                  <InputError msg={errors.location.message as string} />
                )}
              </div>
              <div className="w-full mb-5">
                <Label className="label">Salary</Label>
                <TextInput
                  {...register("salary", {
                    required: "Salary is a required field",
                    pattern: /^[0-9]+$/,
                  })}
                  placeholder="Ex. 25, 000"
                  onKeyDown={handleNumbersOnly}
                />

                {errors && errors.salary && (
                  <InputError msg={errors.salary.message as string} />
                )}
              </div>

              <div className="w-full mb-5">
                <Label className="label">Employment Type</Label>
                <Select
                  {...register("employmentType", {
                    required: "Employment Type is a required field",
                  })}
                >
                  <option value="">-- Choose a Job Type -- </option>
                  {renderEmploymentType}
                </Select>

                {errors && errors.employmentType && (
                  <InputError msg={errors.employmentType.message as string} />
                )}
              </div>

              <div className="w-full mb-5">
                <Label className="label">Job Description</Label>
                <Textarea
                  {...register("description", {
                    required: "Job Description is a required field",
                    minLength: {
                      value: 30,
                      message:
                        "Job Description should contain atleast 30 characters",
                    },
                    maxLength: {
                      value: 3000,
                      message:
                        "Job Description should only contain 3000 characters",
                    },
                  })}
                  placeholder="Please be descriptive about job description"
                  onChange={(e) => handleTextAreaChange(e)}
                />

                {errors && errors.description && (
                  <InputError msg={errors.description.message as string} />
                )}
              </div>

              <Button type="submit" color="blue" theme={customBtnTheme}>
                Post Job
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;
