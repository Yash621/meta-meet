import React, { useEffect, useState } from "react";
import chat from "../../pages/chat";
import chatCompCSS from "./chatComp.module.css";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import profilePicture from "../../public/static/images/profile-photo.jpeg";
import Image from "next/image";
import IconButton from "@material-ui/core/IconButton";
import chatGraphic from "../../public/static/images/chat-page-graphic.jpg";
import { useRouter } from "next/router";
import {
  setCallCompShowState,
  setCallCompShowStateType,
} from "../../pages/slices/callSlice";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../public/static/images/default-profile-photo.png";
import axios from "axios";
import { MessageList } from "react-chat-elements";
import ChatElement from "../ChatElement/ChatElement";
import io from "socket.io-client";
import {
  selectChatCompShowStateType,
  setChatCompShowStateType,
  selectChatCompSpaceName,
} from "../../pages/slices/chatSlice";
import groupAvatar from "../../public/static/images/group-avatar.png";

const socket = io.connect("http://localhost:5000", {
  transports: ["websocket"],
});

function ChatComp({ user, id, sentChats, receivedChats, conversationExists }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const setCallCompState = (callType: string) => {
    dispatch(setCallCompShowState(true));
    dispatch(setCallCompShowStateType(callType));
  };
  const [previousChats, setPreviousChats] = useState([]);
  const chatCompShowStateType = useSelector(selectChatCompShowStateType);
  const chatCompSpaceName = useSelector(selectChatCompSpaceName);
  const [socketId, setSocketId] = useState("");
  const [chatStarted, setChatStarted] = useState(false);

  useEffect(() => {
    // console.log(receivedChats);
    // console.log(conversationExists);
    socket.on("me", (data) => {
      setSocketId(data.id);
    });
    socket.emit("chatJoin", { room: user, id: id });
    sentChats.forEach((chat) => {
      chat.position = "right";
    });
    receivedChats.forEach((chat) => {
      chat.position = "left";
    });
    const previousChats = sentChats.concat(receivedChats);
    previousChats.sort(function (a, b) {
      var c = new Date(a.time);
      var d = new Date(b.time);
      return c - d;
    });
    setPreviousChats(previousChats);
    socket.on("chatMessage", (chat) => {
      console.log("hello");
      if (chat.id !== id) {
        chat.position = "left";
        setPreviousChats([
          ...previousChats,
          {
            position: "left",
            message: chat.message,
            time: chat.time,
          },
        ]);
      }
    });
    // console.log(sentChats.concat(receivedChats));
  }, [sentChats, receivedChats]);
  const sendChat = async (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      const url = "http://localhost:5000";
      const data = {
        sender: id,
        readstatus: "unread",
        message: e.target.value,
        reciever: user,
      };
      const text = e.target.value;
      axios({
        method: "post",
        url: `${url}/chats/add`,
        data: data,
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          console.log(res);
          document.getElementById("chat-input").value = "";
        })
        .catch((err) => {
          console.log(err);
        });

      const senderId = await axios.get(`${url}/users/id?username=${user}`);
      socket.emit("sendChat", {
        message: e.target.value,
        room: senderId.data,
        time: new Date().toLocaleString(),
        id: id,
      });

      if (previousChats.length === 0) {
        const senderId = await axios.get(`${url}/users/id?username=${user}`);
        const myUsername = await axios.get(`${url}/users/username?id=${id}`);
        const data = {
          username: user,
          id: id,
          senderId: senderId.data,
          myUsername: myUsername.data,
        };

        axios({
          method: "post",
          url: `${url}/contacts/add`,
          data: data,
          headers: { "content-type": "application/json" },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setChatStarted(true);
      setPreviousChats([
        ...previousChats,
        {
          position: "right",
          message: text,
          time: new Date().toLocaleString(),
        },
      ]);
      console.log(text);
    }
  };
  return (
    <div className={chatCompCSS.container}>
      <div className={chatCompCSS.profileContainer}>
        <div className={chatCompCSS.profile}>
          {chatCompShowStateType === "space" && (
            <div className={chatCompCSS.profileAvatar}>
              <Image src={groupAvatar} alt="profile" />
            </div>
          )}
          {chatCompShowStateType !== "space" && (
            <div className={chatCompCSS.profileAvatar}>
              <Image src={defaultAvatar} alt="profile" />
            </div>
          )}
          {chatCompShowStateType === "space" && (
            <div className={chatCompCSS.profileName}>{chatCompSpaceName}</div>
          )}
          {chatCompShowStateType !== "space" && (
            <div className={chatCompCSS.profileName}>{user}</div>
          )}
        </div>
        <div className={chatCompCSS.contact}>
          {chatCompShowStateType !== "space" && (
            <div className={chatCompCSS.iconContainer}>
              <IconButton onClick={() => setCallCompState("voice call")}>
                <CallIcon />
              </IconButton>
            </div>
          )}
          {chatCompShowStateType === "space" && (
            <div className={chatCompCSS.iconContainer}>
              <IconButton onClick={() => setCallCompState("video call")}>
                <VideocamIcon />
              </IconButton>
            </div>
          )}
          {chatCompShowStateType !== "space" && (
            <div className={chatCompCSS.iconContainer}>
              <IconButton onClick={() => setCallCompState("video call")}>
                <VideocamIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {previousChats.length === 0 && (
        <div className={chatCompCSS.emptyChatboxContainer}>
          <Image src={chatGraphic} alt="chat" />
          Start a conversation
        </div>
      )}
      {previousChats.length !== 0 && (
        <div className={chatCompCSS.chatboxContainer}>
          {previousChats.map((chat, index) => (
            <ChatElement
              key={index}
              position={chat.position}
              text={chat.message}
              date={chat.time}
            />
          ))}
        </div>
      )}
      <div className={chatCompCSS.chatInputContainer}>
        <div className={chatCompCSS.fileAttachContainer}>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </div>
        <input
          className={chatCompCSS.input}
          placeholder="Type a message"
          type="text"
          id="chat-input"
          onKeyUp={(e) => {
            sendChat(e);
          }}
        ></input>
        <div className={chatCompCSS.micIconContainer}>
          <IconButton>
            <MicIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatComp;
