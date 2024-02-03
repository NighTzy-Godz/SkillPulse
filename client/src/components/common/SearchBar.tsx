import { TextInput } from "flowbite-react";
import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

function SearchBar({ value, placeholder, onChange }: SearchBarProps) {
  return (
    <React.Fragment>
      <TextInput
        value={value}
        icon={FaSearch}
        className="border border-zinc-500 rounded-lg"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </React.Fragment>
  );
}

export default SearchBar;
