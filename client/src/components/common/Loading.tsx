import React from "react";
import { RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <div className="w-full h-[92dvh] grid place-content-center">
      <RotatingLines
        visible={true}
        animationDuration=".75"
        strokeColor="#3f83f8"
        strokeWidth="2"
      />
    </div>
  );
}

export default Loading;
