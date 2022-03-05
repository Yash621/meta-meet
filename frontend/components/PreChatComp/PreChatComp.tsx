import React from "react";
import preChatComp from "./PreChatComp.module.css";
import defaultAvatar from "../../public/static/images/default-profile-photo.png";
import Image from "next/image";

function PreChatComp({ username }) {
  return (
    <div className={preChatComp.container}>
      <div className={preChatComp.avatarContainer}>
        <Image
          src={defaultAvatar}
          className={preChatComp.avatar}
          alt="Avatar"
        />
      </div>
      <div className={preChatComp.textContainer}>{username}</div>
    </div>
  );
}

export default PreChatComp;
