import React, { useEffect, useState } from "react";
import meetCredCSS from "./MeetCred.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import {
  selectmeetCredentialPageShowState,
  setmeetCredentialPageShowState,
} from "../../pages/slices/meetCredentialSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import io from "socket.io-client";

function MeetCred({ meetType }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const navigateToCall = () => {
    const roomid = "hello";
    const password = "hello";
    const socket = io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });
    socket.on("me", (id) => {
      console.log(id + "hello sir");
    });
    router.push(`/video?roomid=${roomid}&password=${password}`);
  };
  const [inputCopyState, setInputCopyState] = useState({
    value: "JYBFnhdubnfc7xjQAAAN",
    copied: false,
  });

  useEffect(() => {
    console.log(meetType);
  });
  return (
    <div className={meetCredCSS.container}>
      <div className={meetCredCSS.meetDetailsContainer}></div>
      <div className={meetCredCSS.meetDetails}>
        <div className={meetCredCSS.meetDetailsheading}>
          {meetType === "new_meeting"
            ? "Invite more people to meeting"
            : "Got a meeting code?"}
          <IconButton>
            <ClearIcon
              className={meetCredCSS.clearIcon}
              onClick={() => dispatch(setmeetCredentialPageShowState(false))}
            />
          </IconButton>
        </div>
        <div className={meetCredCSS.meetDetailsSubHeading}>
          {meetType === "new_meeting"
            ? "Copy this code and share it with people you want to meet with"
            : "To join a meeting, enter the meeting code provided by the organizer"}
        </div>
        {meetType !== "new_meeting" ? (
          <input
            type="text"
            placeholder="Enter meeting id"
            className={meetCredCSS.input}
            required
          ></input>
        ) : (
          <div className={meetCredCSS.meetIdContainer}>
            JYBFnhdubnfc7xjQAAAN
            <CopyToClipboard
              text={inputCopyState.value}
              onCopy={() =>
                setInputCopyState({ value: inputCopyState.value, copied: true })
              }
            >
              <IconButton>
                <ContentCopyIcon />
              </IconButton>
            </CopyToClipboard>
          </div>
        )}
        <div className={meetCredCSS.buttonContainer}>
          <button
            className={meetCredCSS.joinButton}
            onClick={() => {
              navigateToCall();
            }}
          >
            {meetType === "new_meeting" ? "Start now" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetCred;
