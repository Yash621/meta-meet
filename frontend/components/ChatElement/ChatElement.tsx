import React, { useEffect } from "react";
import chatElementCSS from "./ChatElement.module.css";

function ChatElement({ position, text, date, type, user, inputType }) {
  useEffect(() => {
    console.log(text);
  }, []);
  const getTime = (time) => {
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
  };
  return (
    <div
      className={`${chatElementCSS.container} ${
        position == "right" && `${chatElementCSS.right}`
      } ${position == "left" && `${chatElementCSS.left}`}`}
    >
      {inputType === "text" ? (
        <div className={chatElementCSS.messageContainer}>
          <div className={chatElementCSS.message}>{text}</div>
          <div className={chatElementCSS.dateContainer}>
            {" "}
            {type === "space" && (
              <div className={chatElementCSS.username}>{user}</div>
            )}
            {getTime(date)}
          </div>
        </div>
      ) : (
        <div>hello</div>
      )}
    </div>
  );
}

export default ChatElement;
