import React from "react";

interface FormHeaderProps {
  header: string;
}

function FormHeader({ header }: FormHeaderProps) {
  return (
    <React.Fragment>
      <h1 className="text-center text-3xl text-zinc-700 font-medium capitalize">
        {header}
      </h1>
    </React.Fragment>
  );
}

export default FormHeader;
