import React from "react";

interface FormHeaderProps {
  header: string;
}

function FormHeader({ header }: FormHeaderProps) {
  return (
    <React.Fragment>
      <h1 className="text-center md:text-3xl text-2xl text-zinc-700 font-medium capitalize">
        {header}
      </h1>
    </React.Fragment>
  );
}

export default FormHeader;
