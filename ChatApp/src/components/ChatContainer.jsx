import React, { useState, useEffect, useRef } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Message from "./Message";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function fetchData() {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    }
    fetchData();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <>
          <div className="flex flex-1 flex-col justify-start items-start w-fit h-full ">
            <div className="flex justify-start items-center align-top gap-x-2 p-2 w-full h-auto bg-black bg-opacity-40">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt="avatar"
                width={30}
              />
              <h3 className="flex-1 font-light tracking-widest text-base">
                {currentChat.username}
              </h3>
              <div className="flex justify-center items-center">
                <Logout />
              </div>
            </div>
            <div className="flex-1 flex flex-col w-full h-fit overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 p-2 ">
              {messages.map((message, index) => {
                return (
                  <div
                    ref={scrollRef}
                    key={uuidv4()}
                    className="relative flex justify-center items-center py-7"
                  >
                    <div
                      className={`${
                        message.fromSelf
                          ? "bg-white bg-opacity-10 flex justify-end items-center place-content-end w-fit h-fit py-2 px-3 mx-2 my-2 rounded-2xl absolute right-0"
                          : "bg-white bg-opacity-50 flex justify-start items-center w-fit py-2 px-3 mx-2 my-2 rounded-2xl absolute left-0"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col w-full h-fit bg-black bg-opacity-40">
              <ChatInput handleSendMsg={handleSendMsg} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
