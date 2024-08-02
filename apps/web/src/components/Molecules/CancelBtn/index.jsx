function CancelBtn({ btnText, btnFn }) {
  return (
    <button
      onClick={() => btnFn()}
      className="flex items-center justify-center w-[150px] h-[48px] rounded-full bg-challenge-dark-2 text-challenge-gray-purple hover:bg-challenge-light-purple font-league-spartan font-bold focus:outline-none  transition shadow-custom"
    >
      {btnText}
    </button>
  );
}

export default CancelBtn;
