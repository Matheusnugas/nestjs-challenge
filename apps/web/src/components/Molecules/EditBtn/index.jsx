function EditBtn({ btnText, btnFn }) {
  return (
    <button
      onClick={() => btnFn()}
      className="flex items-center justify-center w-20 h-[48px] rounded-full bg-challenge-light-purple text-challenge-medium-purple hover:bg-white font-league-spartan font-bold focus:outline-none transition shadow-custom"
    >
      {btnText}
    </button>
  );
}

export default EditBtn;
