function DeleteBtn({ btnText, btnFn }) {
  return (
    <button
      onClick={() => btnFn()}
      className="flex items-center justify-center w-20 h-[48px] rounded-full bg-challenge-red text-white hover:bg-challenge-pink font-league-spartan font-bold focus:outline-none  transition shadow-custom"
    >
      {btnText}
    </button>
  );
}

export default DeleteBtn;
