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
import Peer from "simple-peer";
import { route } from "next/dist/server/router";
import { setSocket } from "../../pages/slices/videoSlice";
import axios from "axios";
import {
  setChatCompShowState,
  setChatCompShowStateType,
  setChatCompSpaceName,
} from "../../pages/slices/chatSlice";

function MeetCred({ meetType, meetingId, userId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [meetingRoomId, setMeetingRoomId] = useState("");
  const [spaceAlreadyExists, setSpaceAlreadyExists] = useState(false);

  const navigateToCall = () => {
    if (meetType === "new_meeting") {
      router.push(`/video?host=true&id=${meetingId}`);
    } else {
      setMeetingRoomId(document.getElementsByTagName("input")[0].value);
      router.push(
        `/video?host=false&meetingId=${
          document.getElementsByTagName("input")[0].value
        }&userId=${userId}`
      );
    }
  };

  const createSpace = () => {
    const url = "http://localhost:5000";
    const spacename = document.getElementById("space-name").value;
    const data = {
      spacename: spacename,
      members: [userId],
    };
    axios({
      method: "post",
      url: `${url}/spaces/add`,
      data: data,
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Space already exists") {
          setSpaceAlreadyExists(true);
        }
        if (res.data.message === "Space created") {
          dispatch(setmeetCredentialPageShowState(false));
          dispatch(setChatCompShowState(true));
          dispatch(setChatCompShowStateType("space"));
          dispatch(setChatCompSpaceName(spacename));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(meetType);
  });
  return (
    <div className={meetCredCSS.container}>
      <div className={meetCredCSS.meetDetailsContainer}></div>
      <div className={meetCredCSS.meetDetails}>
        <div className={meetCredCSS.meetDetailsheading}>
          {meetType === "space" ? "Create Space" : "Got a meeting code?"}
          <IconButton>
            <ClearIcon
              className={meetCredCSS.clearIcon}
              onClick={() => dispatch(setmeetCredentialPageShowState(false))}
            />
          </IconButton>
        </div>
        <div className={meetCredCSS.meetDetailsSubHeading}>
          {meetType === "space"
            ? "Give your space a preferred name"
            : "To join a meeting, enter the meeting code provided by the organizer"}
        </div>
        {spaceAlreadyExists && (
          <div className={meetCredCSS.warningContainer}>
            <p>Space name already exists, Enter a different space name</p>
          </div>
        )}

        {meetType !== "space" ? (
          <input
            type="text"
            placeholder="Enter meeting id"
            className={meetCredCSS.input}
            required
            id="meetingRoomId"
          ></input>
        ) : (
          <input
            type="text"
            placeholder="Enter space name"
            className={meetCredCSS.input}
            required
            id="space-name"
          ></input>
        )}
        <div className={meetCredCSS.buttonContainer}>
          {meetType === "space" ? (
            <button
              className={meetCredCSS.joinButton}
              onClick={() => {
                createSpace();
              }}
            >
              Create
            </button>
          ) : (
            <button
              className={meetCredCSS.joinButton}
              onClick={() => {
                navigateToCall();
              }}
            >
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MeetCred;
