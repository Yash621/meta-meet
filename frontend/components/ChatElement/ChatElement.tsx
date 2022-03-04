import React, { useEffect } from "react";
import chatElementCSS from "./ChatElement.module.css";

function ChatElement({ position, text, date }) {
  const getTime = (time) => {
    // time.slice(0, time.length - 6)
    var n1 = 0;
    var index = 0;
    for (var i = 0; i < time.length; i++) {
      if (time[i] == "/") {
        n1++;
      }
      if (n1 == 2) {
        index = i;
        break;
      }
    }
    var n2 = 0;
    var t = "";
    for (var i = index + 7; i < time.length; i++) {
      if (time[i] == ":") {
        n2++;
      }
      if (n2 == 2) {
        break;
      }
      t += time[i];
    }
    return (
      time.slice(0, index + 1) +
      "22, " +
      t +
      (time[time.length - 2] == "p" ? "pm" : "am")
    );
    // return time.slice(0, time.length - 6) + "pm";
  };
  return (
    <div
      className={`${chatElementCSS.container} ${
        position == "right" && `${chatElementCSS.right}`
      } ${position == "left" && `${chatElementCSS.left}`}`}
    >
      <div className={chatElementCSS.messageContainer}>
        <div className={chatElementCSS.message}>{text}</div>
        <div className={chatElementCSS.dateContainer}>{getTime(date)}</div>
      </div>
    </div>
  );
}

export default ChatElement;
