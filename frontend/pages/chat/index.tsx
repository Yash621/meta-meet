/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import chatPageCSS from "./chatPage.module.css";
import Image from "next/image";
import graphic from "../../public/static/images/landing-page-icon.png";

function index() {
  return (
    <div className={chatPageCSS.container}>
      <div className={chatPageCSS.contactContainer}>
        <div className={chatPageCSS.headerContainer}>
          <div className={chatPageCSS.profileAvatarContainer}></div>
          <div className={chatPageCSS.profileNameContainer}></div>
        </div>
        <div className={chatPageCSS.searchBarContainer}>
          <div className={chatPageCSS.searchBar}>
            <div className={chatPageCSS.searchBarIcon}></div>
            <div className={chatPageCSS.searchBarInput}></div>
          </div>
        </div>
        <div className={chatPageCSS.OptionsIconContainer}></div>
        <div className={chatPageCSS.contactListContainer}></div>
      </div>
      <div className={chatPageCSS.chatContainer}>
        <div className={chatPageCSS.headerContainer}></div>
        <div className={chatPageCSS.chat}>
          <Image src={graphic} />
        </div>
        <div className={chatPageCSS.chatInputContainer}>
          <div className={chatPageCSS.chatInput}></div>
          <div className={chatPageCSS.chatIcon}></div>
        </div>
      </div>
    </div>
  );
}

export default index;
