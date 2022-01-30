/* eslint-disable jsx-a11y/alt-text */
import React from "react";
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

function index() {
  return (
    <div className={chatPageCSS.container}>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/static/images/title-logo.png" />
      </Head>
      <div className={chatPageCSS.headerContainer}>
        <div>
          <DehazeIcon className={chatPageCSS.slideIcon} />
        </div>
        <div className={chatPageCSS.companyNameLogo}>
          <Image src={logo} />
          MetaMeet.io
        </div>
        <div className={chatPageCSS.inputContainer}>
          <SearchIcon className={chatPageCSS.chatIcon} />
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
      <div className={chatPageCSS.chatContainer}></div>
    </div>
  );
}

export default index;
