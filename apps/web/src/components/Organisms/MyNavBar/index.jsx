import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { auth } from "../../../lib/configs/firebase.config";
import { Link, useNavigate } from "react-router-dom";

function MyNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <nav className="block w-full mt-4 max-w-screen-xl px-6 py-3 mx-auto text-white bg-challenge-dark-1 shadow-md rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex items-center justify-between text-blue-gray-900">
        <a
          href="#"
          className="mr-4 hover:text-yellow-700 duration-100 block font-league-spartan cursor-pointer py-1.5 text-yellow-800 text-xl md:text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
        >
          Galactic Trading Network
        </a>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white">
              <Link
                to={"/portfolios"}
                className="flex items-center font-semibold font-league-spartan transition-colors hover:text-challenge-purple-2 text-lg"
              >
                Portfolios
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white">
              <Link
                to={"/companies"}
                className="flex items-center font-league-spartan font-semibold transition-colors hover:text-challenge-purple-2 text-lg"
              >
                Companies
              </Link>
            </li>
            <li className="block p-1 font-league-spartan text-sm antialiased font-medium leading-normal text-white">
              <a
                onClick={() => handleLogout()}
                className="flex items-center bg-challenge-red text-white cursor-pointer py-1 px-2 rounded-md transition-colors font-semibold hover:bg-opacity-100 text-lg bg-opacity-50"
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </span>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 px-4">
          <ul className="flex flex-col gap-2">
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white">
              <Link
                to={"/portfolios"}
                className="flex items-center font-semibold font-league-spartan transition-colors hover:text-challenge-purple-2 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolios
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white">
              <Link
                to={"/companies"}
                className="flex items-center font-league-spartan font-semibold transition-colors hover:text-challenge-purple-2 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Companies
              </Link>
            </li>
            <li className="block p-1 font-league-spartan text-sm antialiased font-medium leading-normal text-white">
              <a
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center bg-challenge-red text-white cursor-pointer py-1 px-2 rounded-md transition-colors font-semibold hover:bg-opacity-100 text-lg bg-opacity-50"
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default MyNavbar;
