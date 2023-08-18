import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button className="bg-red-900 bg-opacity-50 hover:bg-red-900 hover:bg-opacity-100  py-1 px-2 border border-red-950 hover:border-transparent rounded" onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
}
