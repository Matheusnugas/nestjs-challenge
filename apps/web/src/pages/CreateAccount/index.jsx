import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AstroLottie from "../../components/Atoms/AstroLottie";
import AuthApi from "../../services/auth";
import Keys from "../../constants/keys";
import validations from "../../utils/validations"; // Importando todas as validações
import Swal from "sweetalert2";

function CreateAccount(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let tempErrors = { ...errors };

    if (name === "email") {
      if (!validations.validateEmail(value)) {
        tempErrors.email = "Invalid email format";
      } else {
        delete tempErrors.email;
      }
    }

    if (name === "password") {
      if (!validations.validateStrongPassword(value)) {
        tempErrors.password =
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
      } else {
        delete tempErrors.password;
      }
    }

    setErrors(tempErrors);
  };

  const validateInputs = () => {
    let tempErrors = {};

    if (!validations.validateEmail(credentials.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!validations.validateStrongPassword(credentials.password)) {
      tempErrors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await AuthApi.registerNewUser(credentials);
        console.log(response);
        if (response && response.status === 201) {
          Swal.fire({
            title: "Account Created!",
            text: "Your account has been created successfully.",
            icon: "success",
            confirmButtonColor: "#6b46c1",
            cancelButtonColor: "#9f7aea",
            background: "#2d3748",
            color: "#ffffff",
          }).then(() => {
            navigate("/");
          });
        } else {
          console.error("Failed to create account:", response);
          Swal.fire({
            title: "Error!",
            text: "Failed to create account. Please try again.",
            icon: "error",
            confirmButtonColor: "#6b46c1",
            cancelButtonColor: "#9f7aea",
            background: "#2d3748",
            color: "#ffffff",
          });
        }
      } catch (error) {
        console.error("An error occurred:", error);
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
    }
  };

  return (
    <div className="min-h-screen bg-challenge-dark-3 flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 animate-fadeIn">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <p
            href="#"
            className="mr-4 block font-league-spartan cursor-pointer py-1.5 text-yellow-800 text-xl md:text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
          >
            Galactic Trading Network
          </p>
          <div>
            <h2 className="mt-6 text-4xl font-semibold font-league-spartan text-white">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-white">
              or{" "}
              <Link
                to="/"
                className="font-medium text-challenge-purple-2 hover:text-challenge-purple-1 duration-100"
              >
                sign in to an existing account.
              </Link>
            </p>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-md font-medium text-white font-league-spartan"
                  >
                    Display Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="displayName"
                      name="displayName"
                      type="text"
                      onChange={handleChange}
                      value={credentials.displayName}
                      required
                      className="text-white bg-challenge-dark-2 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
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
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
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
                      autoComplete="new-password"
                      required
                      className="text-white bg-challenge-dark-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 duration-100 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-challenge-purple-2 hover:bg-challenge-purple-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-challenge-purple-1"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 animate-fadeIn">
        <AstroLottie />
      </div>
    </div>
  );
}

export default CreateAccount;
