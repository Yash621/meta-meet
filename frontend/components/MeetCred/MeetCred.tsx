import React from "react";
import meetCredCSS from "./MeetCred.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import {
  selectmeetCredentialPageShowState,
  setmeetCredentialPageShowState,
} from "../../pages/slices/meetCredentialSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";

function MeetCred() {
  const dispatch = useDispatch();
  const router = useRouter();
  const navigateToCall = () => {
    const roomid = "hello";
    const password = "hello";
    router.push(`/video?roomid=${roomid}&password=${password}`);
  };
  return (
    <div className={meetCredCSS.container}>
      <div className={meetCredCSS.meetDetailsContainer}></div>
      <div className={meetCredCSS.meetDetails}>
        <div className={meetCredCSS.meetDetailsheading}>
          Got a meeting code?
          <IconButton>
            {" "}
            <ClearIcon
              className={meetCredCSS.clearIcon}
              onClick={() => dispatch(setmeetCredentialPageShowState(false))}
            />
          </IconButton>
        </div>
        <div className={meetCredCSS.meetDetailsSubHeading}>
          To join a meeting, enter the meeting code provided by the organizer
        </div>
        <input
          type="text"
          placeholder="Enter meeting id"
          className={meetCredCSS.input}
        ></input>
        <div className={meetCredCSS.buttonContainer}>
          <button
            className={meetCredCSS.joinButton}
            onClick={() => {
              navigateToCall();
            }}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetCred;
