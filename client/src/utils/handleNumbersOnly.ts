import { KeyboardEvent } from "react";

const handleNumbersOnly = (e: KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9]|Backspace/.test(e.key)) {
    e.preventDefault();
  }
};
export default handleNumbersOnly;
