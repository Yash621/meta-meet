import React, { useEffect, useState } from "react";
import chat from "../../pages/chat";
import chatCompCSS from "./ChatComp.module.css";
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
} from "../../store/slices/callSlice";
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
  selectChatCompGroupChat,
} from "../../store/slices/chatSlice";
import groupAvatar from "../../public/static/images/group-avatar.png";
import {
  selectSpaceJoined,
  setSpaceJoined,
} from "../../store/slices/landingSlice";
// import useSpeechToText from "react-hook-speech-to-text";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import toxicity from "@tensorflow-models/toxicity";

const socket = io.connect("https://metameetio.herokuapp.com", {
  transports: ["websocket"],
});

function ChatComp({
  user,
  id,
  sentChats,
  receivedChats,
  conversationExists,
  groupChat,
  meetingId,
}) {
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
  const [previousGroupChat, setPreviousGroupChat] = useState([]);
  const spaceJoinedGroupChat = useSelector(selectSpaceJoined);
  var { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (chatCompShowStateType !== "space") {
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
        return Number(c) - Number(d);
      });
      setPreviousChats(previousChats);
      socket.on("chatMessage", (chat) => {
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
    } else {
      socket.emit("joinSpace", { space: chatCompSpaceName, id: id });

      groupChat.sort(function (a, b) {
        var c = new Date(a.time);
        var d = new Date(b.time);
        return Number(c) - Number(d);
      });
      groupChat.forEach((chat) => {
        if (chat.id !== id) {
          chat.position = "left";
        } else {
          chat.position = "right";
        }
      });
      console.log(groupChat);
      setPreviousGroupChat(groupChat);
      console.log("hello");
      socket.on("spaceChat", (data) => {
        console.log("mera naam yash");
        if (data.id !== id) {
          console.log(previousGroupChat);
          setPreviousGroupChat([
            ...groupChat,
            {
              position: "left",
              message: data.message,
              time: data.time,
              username: data.user,
            },
          ]);
        }
      });
    }
  }, [sentChats, receivedChats, groupChat]);

  const sendChat = async (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      const sentence = e.target.value;
      toxicity.load(0.6).then((model) => {
        const sentences = [sentence];
        console.log(sentence);
        model.classify(sentences).then((predictions) => {
          for (
            var predictionsIndex = 0;
            predictionsIndex < predictions.length;
            predictionsIndex++
          ) {
            if (predictions[predictionsIndex].results[0].match) {
              dispatch(setCallCompShowState(true));
              break;
            }
          }
        });
      });
      if (chatCompShowStateType !== "space") {
        const url = "https://metameetio.herokuapp.com";
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
      } else {
        const url = "https://metameetio.herokuapp.com";
        const myUserName = await axios.get(`${url}/users/username?id=${id}`);
        const message = e.target.value;
        const data = {
          username: myUserName.data,
          message: message,
          time: new Date().toLocaleString(),
          space: chatCompSpaceName,
          id: id,
        };
        axios({
          method: "post",
          url: `${url}/spacechats/add`,
          data: data,
          headers: { "content-type": "application/json" },
        })
          .then((res) => {
            console.log(res);
            document.getElementById("chat-input").value = "";
            console.log("mera namm yash hai");
            socket.emit("sendSpaceChat", {
              message: message,
              space: chatCompSpaceName,
              time: new Date().toLocaleString(),
              user: myUserName.data,
              id: id,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        setPreviousGroupChat([
          ...previousGroupChat,
          {
            position: "right",
            message: message,
            time: new Date().toLocaleString(),
            username: myUserName.data,
          },
        ]);
      }
      resetTranscript();
      document.getElementById("chat-input").removeAttribute("value");
    }
  };
  const startVideoMeeting = () => {
    router.push(`/video?host=true&meetingId=${meetingId}&userId=${id}`);
  };
  const joinSpace = async () => {
    const url = "https://metameetio.herokuapp.com";
    const data = {
      userId: id,
      spacename: chatCompSpaceName,
    };
    console.log(data);
    axios({
      method: "post",
      url: `${url}/spaces/addmember`,
      data: data,
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        dispatch(setSpaceJoined(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const startRecording = () => {
    if (listening) {
      document.getElementById("chat-input").value = transcript;
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className={chatCompCSS.container}>
      <div className={chatCompCSS.profileContainer} id="container">
        <div className={chatCompCSS.profile}>
          {chatCompShowStateType === "space" && (
            <div className={chatCompCSS.profileAvatar}>
              <Image src={groupAvatar} alt="profile" />
            </div>
          )}
          {chatCompShowStateType !== "space" && (
            <div
              className={`${chatCompCSS.profileAvatar} ${chatCompCSS.chatProfileAvatar}`}
            >
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
          {chatCompShowStateType === "space" && !spaceJoinedGroupChat && (
            <div className={chatCompCSS.joinSpace} onClick={() => joinSpace()}>
              Join
            </div>
          )}
          {chatCompShowStateType === "space" && spaceJoinedGroupChat && (
            <div className={chatCompCSS.iconContainer}>
              <IconButton onClick={() => startVideoMeeting()}>
                <VideocamIcon />
              </IconButton>
            </div>
          )}
          {chatCompShowStateType !== "space" && (
            <div className={chatCompCSS.iconContainer}>
              <IconButton onClick={() => startVideoMeeting()}>
                <VideocamIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {chatCompShowStateType !== "space" && previousChats.length === 0 && (
        <div className={chatCompCSS.emptyChatboxContainer}>
          <Image src={chatGraphic} alt="chat" />
          Start a conversation
        </div>
      )}
      {chatCompShowStateType !== "space" && previousChats.length !== 0 && (
        <div className={chatCompCSS.chatboxContainer}>
          {previousChats.map((chat, index) => (
            <ChatElement
              key={index}
              position={chat.position}
              text={chat.message}
              date={chat.time}
              type={chatCompShowStateType}
              user="welcome"
              inputType="text"
            />
          ))}
        </div>
      )}
      {chatCompShowStateType === "space" && previousGroupChat.length === 0 && (
        <div className={chatCompCSS.emptyChatboxContainer}>
          <Image src={chatGraphic} alt="chat" />
          Start a conversation
        </div>
      )}
      {chatCompShowStateType === "space" && previousGroupChat.length !== 0 && (
        <div className={chatCompCSS.chatboxContainer}>
          {previousGroupChat.map((chat, index) => (
            <ChatElement
              key={index}
              position={chat.position}
              text={chat.message}
              date={chat.time}
              type={chatCompShowStateType}
              user={chat.username}
              inputType="text"
            />
          ))}
        </div>
      )}
      <div className={chatCompCSS.chatInputContainer}>
        {chatCompShowStateType === "space" && !spaceJoinedGroupChat && (
          <input
            className={`${chatCompCSS.input} ${chatCompCSS.disabledInput}`}
            placeholder="Type a message"
            type="text"
            id="chat-input"
            value={listening ? transcript : null}
            disabled
            onKeyUp={(e) => {
              sendChat(e);
            }}
          ></input>
        )}
        {chatCompShowStateType === "space" && spaceJoinedGroupChat && (
          <input
            className={chatCompCSS.input}
            placeholder="Type a message"
            type="text"
            id="chat-input"
            value={listening ? transcript : null}
            onKeyUp={(e) => {
              sendChat(e);
            }}
          ></input>
        )}
        {chatCompShowStateType !== "space" && (
          <input
            className={chatCompCSS.input}
            placeholder="Type a message"
            type="text"
            id="chat-input"
            value={listening ? transcript : null}
            onKeyUp={(e) => {
              sendChat(e);
            }}
          ></input>
        )}
        <div
          className={`${chatCompCSS.micIconContainer} `}
          onClick={() => startRecording()}
        >
          <IconButton className={`${listening && chatCompCSS.mic}`}>
            <MicIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatComp;
