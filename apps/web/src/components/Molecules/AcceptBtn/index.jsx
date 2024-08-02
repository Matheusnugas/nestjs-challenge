function AcceptBtn({ btnText, btnFn }) {
  return (
    <button
      onClick={() => btnFn()}
      className="flex items-center justify-center w-[150px] h-[48px] rounded-full bg-challenge-purple-1 text-white font-league-spartan font-bold focus:outline-none hover:bg-challenge-purple-2 transition shadow-custom"
    >
      {btnText}
    </button>
  );
}

export default AcceptBtn;
