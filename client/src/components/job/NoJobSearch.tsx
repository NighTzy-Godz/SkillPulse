import React from "react";

interface NoJobSearchProps {
  jobSearch: string;
}

function NoJobSearch({ jobSearch }: NoJobSearchProps) {
  return (
    <div>
      {" "}
      <h3 className="text-lg mb-3">
        The Search <span className="font-semibold">{jobSearch}</span> {""}did
        not match any jobs at the moment.
      </h3>
      <h3 className="font-semibold text-lg mb-1">Search Suggestions:</h3>
      <ul className="list-disc">
        <li className="b-dot">Try more general keywords</li>
        <li className="b-dot">Check your spelling</li>
        <li className="b-dot">Replace abbreviations with the entire word</li>
      </ul>
    </div>
  );
}

export default NoJobSearch;
