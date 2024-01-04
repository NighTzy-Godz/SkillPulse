import React from "react";

interface InputErrorProps {
  msg: null | string;
}

function InputError({ msg }: InputErrorProps) {
  return (
    <div className="mt-2">
      <p className="text-sm text-red-500">{msg}</p>
    </div>
  );
}

export default InputError;
