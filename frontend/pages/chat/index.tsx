/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import chatPageCSS from "./chatPage.module.css";
import Image from "next/image";
import graphic from "../../public/static/images/landing-page-icon.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import profilePhoto from "../../public/static/images/profile-photo.jpeg";
import ChatIcon from "@mui/icons-material/Chat";

function index() {
  return (
    <div className={chatPageCSS.container}>
      <div className={chatPageCSS.contactContainer}>
        <div className={chatPageCSS.headerContainer}>
          <div className={chatPageCSS.profileOverviewContainer}>
            <div className={chatPageCSS.profileAvatarContainer}>
              <Image src={profilePhoto} alt="welcome to meta-meet.io" />
            </div>
            <div className={chatPageCSS.profileNameContainer}>
              Nitya Patankar
            </div>
          </div>
        </div>
        <div className={chatPageCSS.searchBarContainer}>
          <div className={chatPageCSS.searchBar}>
            <div className={chatPageCSS.searchBarIconContainer}>
              <SearchIcon className={chatPageCSS.searchBarIcon} />
            </div>
            <input
              type="text"
              placeholder="Search for users or rooms"
              className={chatPageCSS.searchBarInput}
            ></input>
          </div>
        </div>
        <div className={chatPageCSS.OptionsIconContainer}>
          <div>
            <ChatIcon className={chatPageCSS.OptionsIcon} />
          </div>
          <div>
            <GroupsIcon className={chatPageCSS.OptionsIcon} />
          </div>
          <div>
            <PersonIcon className={chatPageCSS.OptionsIcon} />
          </div>
        </div>
        <div className={chatPageCSS.contactListContainer}></div>
      </div>
      <div className={chatPageCSS.chatContainer}>
        <div className={chatPageCSS.headerContainer}>
          <div className={chatPageCSS.profileOverviewContainer}>
            <div className={chatPageCSS.profileAvatarContainer}>
              <Image src={profilePhoto} alt="welcome to meta-meet.io" />
            </div>
            <div className={chatPageCSS.profileNameContainer}>
              Nitya Patankar
            </div>
          </div>
          <VideocamIcon className={chatPageCSS.chatIcon} />
        </div>
        <div className={chatPageCSS.chat}>
          <Image src={graphic} />
        </div>
        <div className={chatPageCSS.chatInputContainer}>
          <div className={chatPageCSS.chatIconContainer}>
            <AttachFileIcon className={chatPageCSS.chatIcon} />
          </div>
          <input
            type="text"
            placeholder="Type a message"
            className={chatPageCSS.chatInput}
          ></input>
          <div className={chatPageCSS.chatIconContainer}>
            <KeyboardVoiceIcon className={chatPageCSS.chatIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
