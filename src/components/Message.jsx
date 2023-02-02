import React from "react";
import { UserAuth } from "../store/AuthContext";
import { AiFillCloseCircle } from "react-icons/ai";

const Message = () => {
  const { message, setMessage } = UserAuth();
  return (
    <div
      className={`text-[17px] font-secondaryFont message-modal ${
        message.isSucces ? "succes" : "error"
      } ${message.message == undefined ? "closed" : "opened"}`}
    >
      <h1>{message.message}</h1>
      <button
        onClick={() => setMessage({ message: undefined, isSucces: false })}
      >
        <AiFillCloseCircle color="black" />
      </button>
    </div>
  );
};

export default Message;
