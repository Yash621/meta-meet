/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import callCompCSS from "./CallComp.module.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallIcon from "@mui/icons-material/Call";
import {
  setCallCompShowState,
  selectCallCompShowStateType,
} from "../../store/slices/callSlice";
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
        {/* {authMethod === "google" && (
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
        )} */}
        <div className={callCompCSS.warningContainer}> Warning !</div>
        {/* <div className={callCompCSS.avatarContainer}>Y</div> */}
        <div className={callCompCSS.h1}>
          It is detected that you are using hate speech which is not acceptable
          according to our policies, If you do not stop using it, your account
          could be permanently deleted.
        </div>
        <div className={callCompCSS.acceptRejectContainer}>
          <div
            className={callCompCSS.acceptReject}
            onClick={() => dispatch(setCallCompShowState(false))}
          >
            Ok
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallComp;
