function AddBtn({ addText, btnFn }) {
  return (
    <button
      onClick={() => btnFn()}
      className="flex items-center justify-start pl-2 w-[150px] h-[48px] rounded-full bg-challenge-purple-1 text-white font-league-spartan font-bold focus:outline-none hover:bg-challenge-purple-2 transition shadow-custom"
    >
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 border border-challenge-stroke shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-3 h-3 text-challenge-purple-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={5}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      {addText}
    </button>
  );
}

export default AddBtn;
