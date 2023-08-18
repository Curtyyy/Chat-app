import React, { useState, useEffect } from "react";
import { chattyLogo } from "../assets";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="flex flex-col justify-top items-center w-2/6 h-full bg-black bg-opacity-20">
          <div className="flex justify-center items-center gap-2 w-full h-auto py-4">
            <img
              src={chattyLogo}
              alt="logo"
              width={60}
              className="rounded-full"
            />
            <h2 className="font-bold tracking-wider text-xl">Chatty</h2>
          </div>

          <div className="flex flex-col flex-1 flex-nowrap w-full h-auto overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 p-2">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`flex justify-start items-center gap-x-6 bg-white bg-opacity-10 p-2 mb-2 rounded hover:bg-opacity-20 transition-all duration-500 ease-out ${
                    currentSelected === index
                      ? "text-[#f9ae5c] outline rounded-full"
                      : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                    width={50}
                  />
                  <h3>{contact.username}</h3>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-x-6 w-full h-auto bg-black bg-opacity-10 p-2">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
              width={50}
            />
            <h3 className="font-bold tracking-widest text-xl">
              {currentUserName}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
