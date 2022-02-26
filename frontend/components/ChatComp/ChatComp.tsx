import React from "react";
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
import { useDispatch } from "react-redux";

function ChatComp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const setCallCompState = (callType: string) => {
    dispatch(setCallCompShowState(true));
    dispatch(setCallCompShowStateType(callType));
  };
  return (
    <div className={chatCompCSS.container}>
      <div className={chatCompCSS.profileContainer}>
        <div className={chatCompCSS.profile}>
          <div className={chatCompCSS.profileAvatar}>
            <Image src={profilePicture} alt="profile" />
          </div>
          <div className={chatCompCSS.profileName}>Nitya Patankar</div>
        </div>
        <div className={chatCompCSS.contact}>
          <div className={chatCompCSS.iconContainer}>
            <IconButton onClick={() => setCallCompState("voice call")}>
              <CallIcon />
            </IconButton>
          </div>
          <div className={chatCompCSS.iconContainer}>
            <IconButton onClick={() => setCallCompState("video call")}>
              <VideocamIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={chatCompCSS.chatboxContainer}>
        <Image src={chatGraphic} alt="chat" />
        Start a conversation
      </div>
      <div className={chatCompCSS.chatInputContainer}>
        <div className={chatCompCSS.fileAttachContainer}>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </div>
        <input
          className={chatCompCSS.input}
          placeholder="Type a message"
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
