import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function AddPortfolioDrawer({ isOpen, onClose, children }) {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div
        className={`fixed right-0 top-0 h-full w-80 bg-challenge-dark-4 p-4 shadow-lg transform transition-transform ${
          isOpen ? "animate-slideInRight" : "translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="text-challenge-light-purple font-league-spartan font-bold mb-4"
        >
          <XMarkIcon className="h-6 w-6 text-white font-bold hover:text-challenge-purple-1 duration-100" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default AddPortfolioDrawer;
