import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/configs/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import LocalStorage from "../../utils/storage";
import Swal from "sweetalert2";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      if (response) {
        console.log(response);
        console.log(auth.currentUser.getIdToken);
        LocalStorage.setStorageData("userUid", response.user.uid);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `An error occurred: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#6b46c1",
        cancelButtonColor: "#9f7aea",
        background: "#2d3748",
        color: "#ffffff",
      });
    }
  };

  return (
    <div className="min-h-screen bg-challenge-dark-3 flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <p
            href="#"
            className="mr-4 block font-league-spartan cursor-pointer py-1.5 text-yellow-800 text-xl md:text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
          >
            Galactic Trading Network
          </p>
          <div>
            <h2 className="mt-6 text-4xl font-semibold font-league-spartan text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-white">
              or{" "}
              <Link
                to={"/createaccount"}
                className="font-medium text-challenge-purple-2 hover:text-challenge-purple-1 duration-100"
              >
                create a new one.
              </Link>
            </p>
          </div>
          <div className="mt-8">
            <div>
              <div className="mt-6 relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
            <div className="mt-6">
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-white font-league-spartan"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={credentials.email}
                      required
                      className="text-white bg-challenge-dark-2 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-md font-medium text-white font-league-spartan"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={credentials.password}
                      autoComplete="current-password"
                      required
                      className="text-white bg-challenge-dark-1 block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 duration-100 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-challenge-purple-2 hover:bg-challenge-purple-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-challenge-purple-1"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover animate-fadeIn"
          src="https://images.unsplash.com/photo-1519810755548-39cd217da494?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
