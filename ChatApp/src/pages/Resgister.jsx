import React from "react";
import { Link } from "react-router-dom";
import { chattyLogo } from "../../public"

const Resgister = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form");
  };
  return (
    <div className="text-white text-lg bg-purple-950 w-[100vw] h-[100vh]">
      <div className="flex justify-center items-center w-full h-full">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="grid place-content-center place-items-center w-fit h-fit mx-2 my-2 outline"
        >
          <div className="flex justify-center items-center gap-3 m-2">
            <img src={chattyLogo} width={70} height={70} alt="chattylogo" className="rounded-full" />
            <h1 className="text-2xl font-bold">Chatty</h1>
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create</button>
            <span>
              Already have an account? <Link to="/login">Login</Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resgister;
