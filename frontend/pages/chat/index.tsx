/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import chatPageCSS from "./chatPage.module.css";
import Image from "next/image";
import graphic from "../../public/static/images/chat-page-graphic.jpg";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import profilePhoto from "../../public/static/images/profile-photo.jpeg";
import ChatIcon from "@mui/icons-material/Chat";
import Head from "next/head";
import DehazeIcon from "@mui/icons-material/Dehaze";
import logo from "../../public/static/images/title-logo.png";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MeetCred from "../../components/MeetCred/MeetCred";
import {
  selectmeetCredentialPageShowState,
  setmeetCredentialPageShowState,
} from "../../pages/slices/meetCredentialSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMeeting } from "@videosdk.live/react-sdk";

function index() {
  // const [joinMeetingClick, setJoinMeetingClick] = useState(false);
  const meetCredentialPageShowState = useSelector(
    selectmeetCredentialPageShowState
  );
  const dispatch = useDispatch();

  return (
    <div className={chatPageCSS.container}>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/static/images/title-logo.png" />
      </Head>
      {meetCredentialPageShowState && <MeetCred />}
      <div className={chatPageCSS.headerContainer}>
        <div className={chatPageCSS.chatIconContainer}>
          <DehazeIcon className={chatPageCSS.slideIcon} />
        </div>
        <div className={chatPageCSS.companyNameLogo}>
          <Image src={logo} />
          MetaMeet.io
        </div>
        <div className={chatPageCSS.inputContainer}>
          <div className={chatPageCSS.chatIconContainer}>
            <SearchIcon className={chatPageCSS.chatIcon} />
          </div>
          <input
            type="text"
            placeholder="Search users or spaces"
            className={chatPageCSS.input}
          ></input>
        </div>
        <div className={chatPageCSS.profileAvatarContainer}>
          <Image src={profilePhoto} />
        </div>
      </div>
      <div className={chatPageCSS.chatContainer}>
        <div className={chatPageCSS.chatOptionsContainer}>
          <div className={chatPageCSS.chatOptionContainer}>
            <div className={chatPageCSS.chatOptionHeadContainer}>⯆ Chat</div>
            <div className={chatPageCSS.chatsSpacesContainer}>
              <div className={chatPageCSS.nilChatSpacesHeadContainer}>
                <ChatBubbleOutlineIcon className={chatPageCSS.chatIcon} />
                <p>No Conversations</p>
                <div>Find a chat</div>
              </div>
            </div>
          </div>
          <div className={chatPageCSS.chatOptionContainer}>
            <div className={chatPageCSS.chatOptionHeadContainer}>⯆ Spaces</div>
            <div className={chatPageCSS.chatsSpacesContainer}>
              <div className={chatPageCSS.nilChatSpacesHeadContainer}>
                <GroupsIcon className={chatPageCSS.chatIcon} />
                <p>No spaces yet</p>
                <div> Find a space to join</div>
              </div>
            </div>
          </div>
          <div className={chatPageCSS.startMeetContainer}>
            <div className={chatPageCSS.chatOptionMeetHeadContainer}>
              ⯆ Meet
            </div>
            <div className={chatPageCSS.startMeetOptionsContainer}>
              <div className={chatPageCSS.startMeetOptionContainer}>
                <VideoCallIcon />
                <p> New Meeting</p>
              </div>
              <div
                className={chatPageCSS.startMeetOptionContainer}
                onClick={() => dispatch(setmeetCredentialPageShowState(true))}
              >
                <KeyboardIcon />
                <p> Join a Meeting</p>
              </div>
            </div>
          </div>
        </div>
        <div className={chatPageCSS.serachResultContainer}>
          <Image src={graphic} />
          <p> Start a conversation now </p>
        </div>
      </div>
    </div>
  );
}

export default index;
