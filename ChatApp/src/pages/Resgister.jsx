import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { chattyLogo } from "../assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Resgister = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation", registerRoute);
      const { password, confirmPassword, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/login");
      }
    }
  };

  //this code redirect to chat page when have User in local storage.
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/setAvatar");
    }
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password doesn't match! Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters!",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters!",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required!", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="font-Poppins text-white text-lg bg-purple-950 w-[100vw] h-[100vh]">
      <div className="flex justify-center items-center w-full h-full">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="grid place-content-center place-items-center w-fit h-fit mx-2 my-2 p-2"
        >
          <div className="flex justify-center items-center gap-3 m-2">
            <img
              src={chattyLogo}
              width={70}
              height={70}
              alt="chattylogo"
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">Chatty</h1>
          </div>
          <div className="grid gap-4 mx-2 my-2 text-black font-light">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-transparent hover:bg-purple-800 text-white font-semibold w-full mx-auto hover:text-white py-2 px-3 border border-white hover:border-transparent rounded-xl"
            >
              Create
            </button>
            <span className="text-white text-xl mx-2 text-center font-thin uppercase">
              Already have an account?{" "}
              <Link
                to="/login"
                className="hover:text-blue-500 font-normal underline"
              >
                Login
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Resgister;
