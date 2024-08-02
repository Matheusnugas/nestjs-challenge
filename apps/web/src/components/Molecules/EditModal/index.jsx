import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoadingLottie from "../../Atoms/LoadingLottie";

function EditModal({ isOpen, onClose, children }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-challenge-dark-4 p-4 py-12 h-96 w-11/12 md:w-ful max-w-md mx-auto shadow-lg rounded-lg z-10 animate-bounceIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-challenge-light-purple font-league-spartan font-bold mb-4"
        >
          <XMarkIcon className="h-6 w-6 text-white font-bold hover:text-challenge-purple-1 duration-100" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default EditModal;
