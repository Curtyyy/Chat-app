import React, { useState, useEffect } from "react";
import { robotGIF } from "../assets";

export default function Welcome({ currentUser }) {
  return (
    <>
      <div className="flex flex-1 justify-center items-center w-fit h-full">
        <div className="flex flex-col justify-center items-center text-center">
          <img src={robotGIF} alt="robotGIF" width={150} className="" />
          <h1 className="font-semibold tracking-widest text-3xl">
            Welcome, <span>{currentUser.username}!</span>
          </h1>
          <h3 className="font-thin tracking-wider text-lg">
            Please select a chat to Start Messaging.
          </h3>
        </div>
      </div>
    </>
  );
}
