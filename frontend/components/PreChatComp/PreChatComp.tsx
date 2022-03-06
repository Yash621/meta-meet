import React from "react";
import preChatComp from "./PreChatComp.module.css";
import defaultAvatar from "../../public/static/images/default-profile-photo.png";
import Image from "next/image";
import groupAvatar from "../../public/static/images/group-avatar.png";

function PreChatComp({ username, type }) {
  return (
    <div className={preChatComp.container}>
      <div className={preChatComp.avatarContainer}>
        {type == "space" ? (
          <Image
            src={groupAvatar}
            className={preChatComp.avatar}
            alt="Avatar"
          />
        ) : (
          <Image
            src={defaultAvatar}
            className={preChatComp.avatar}
            alt="Avatar"
          />
        )}
      </div>
      <div className={preChatComp.textContainer}>{username}</div>
    </div>
  );
}

export default PreChatComp;
