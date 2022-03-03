import React from "react";
import chatElementCSS from "./ChatElement.module.css";

function ChatElement({ position, text, date }) {
  return (
    <div
      className={`${chatElementCSS.container} ${
        position == "right" && `${chatElementCSS.right}`
      } ${position == "left" && `${chatElementCSS.left}`}`}
    >
      <div className={chatElementCSS.messageContainer}>
        <div className={chatElementCSS.message}>{text}</div>
        <div className={chatElementCSS.dateContainer}>2:00</div>
      </div>
    </div>
  );
}

export default ChatElement;
