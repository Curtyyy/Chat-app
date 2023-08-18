import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chattyLogo, myLoader } from "../assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar!", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/chat");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.random(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="font-Poppins text-white text-lg bg-purple-950 w-[100vw] h-[100vh]">
      <div className="flex justify-center items-center w-full h-full">
        {isLoading ? (
          <div>
            <img src={myLoader} alt="loader" className="" />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-4">
            <h1 className="text-2xl text-center">
              Pick an Avatar as your profile picture
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-4 w-full h-full">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar flex flex-wrap justify-center items-center ${
                      selectedAvatar === index
                        ? "text-[#f9ae5c] outline rounded-full transition-all duration-2000 ease-out opacity-100"
                        : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                      width={80}
                      className={`${
                        selectedAvatar !== index
                          ? "opacity-40 transition-opacity duration-3000 ease-out"
                          : ""
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setProfilePicture()}
              className="bg-transparent hover:bg-purple-800 text-white font-semibold w-fit mx-auto hover:text-white py-2 px-3 border border-white hover:border-transparent rounded-xl"
            >
              Set as Profile Picture
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default SetAvatar;
