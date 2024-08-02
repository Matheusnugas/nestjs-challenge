import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const Tooltip = ({ message }) => {
  return (
    <div className="flex animate-fadeIn items-center gap-4 fixed bottom-4 right-4 bg-green-500 opacity-80 text-white py-2 px-4 rounded-md shadow-md">
      {message}
      <CheckCircleIcon className="text-white h-8 w-8" />
    </div>
  );
};

export default Tooltip;
