import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const hadleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const hadleEmojiClick = (event, emoji) => {
    let message = msg;
    message += event.emoji;
    setMsg(message);
    console.log(emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="flex justify-between items-center gap-x-4 p-2">
      <div className="relative cursor-pointer text-yellow-500">
        <BsEmojiSmileFill onClick={hadleEmojiPickerHideShow} />
        <div className="absolute bottom-[45px]">
          {showEmojiPicker && (
            <Picker
              onEmojiClick={hadleEmojiClick}
              height={400}
              width={350}
              theme="dark"
            />
          )}
        </div>
      </div>

      <form className="flex flex-1 justify-between items-center p-1.5" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 opacity-60 focus:opacity-90 w-11/12 transition-all duration-500 ease-out"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
