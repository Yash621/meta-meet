/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import callCompCSS from "./CallComp.module.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallIcon from "@mui/icons-material/Call";
import {
  setCallCompShowState,
  selectCallCompShowStateType,
} from "../../pages/slices/callSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import defaultAvatar from "../../public/static/images/default-profile-photo.png";
import Image from "next/image";

function CallComp({ authMethod }) {
  const dispatch = useDispatch();
  const callType = useSelector(selectCallCompShowStateType);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (authMethod === "google") {
      setPhotoUrl(auth.currentUser.photoURL.toString());
    }
  });

  return (
    <div className={callCompCSS.container}>
      <div className={callCompCSS.backgroundContainer}></div>
      <div className={callCompCSS.callContainer}>
        {authMethod === "google" && (
          <img
            src={photoUrl}
            className={callCompCSS.avatarContainer}
            alt="profile"
          />
        )}
        {authMethod !== "google" && (
          <div className={callCompCSS.avatarContainer}>
            <Image src={defaultAvatar} alt="profile-photo" />
          </div>
        )}
        {/* <div className={callCompCSS.avatarContainer}>Y</div> */}
        <div className={callCompCSS.h1}>
          Someone is Inviting you for a {callType}
        </div>
        <div className={callCompCSS.acceptRejectContainer}>
          <div
            className={callCompCSS.acceptReject}
            onClick={() => dispatch(setCallCompShowState(false))}
          >
            RejectCall <CallEndIcon className={callCompCSS.icon} />
          </div>
          <div className={`${callCompCSS.acceptReject} ${callCompCSS.accept}`}>
            Accept Call
            <CallIcon className={callCompCSS.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallComp;
