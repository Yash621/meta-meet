/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
// import { Jutsu } from "react-jutsu";
import Head from "next/head";
import { useRouter } from "next/router";
import videoPageCSS from "./videoPage.module.css";
import { MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import IconButton from "@material-ui/core/IconButton";

import VideocamIcon from "@mui/icons-material/Videocam";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { selectSocket } from "../../pages/slices/videoSlice";
import { useSelector } from "react-redux";

function index() {
  const [stream, setStream] = useState(null);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const router = useRouter();
  const { host, id, meetingId } = router.query;
  const socket = useSelector(selectSocket);
  const [videoData, setVideoData] = useState(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    if (host === "false") {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });
      peer.on("signal", (userData) => {
        socket.emit("joinMeeting", {
          userId: id,
          signalData: userData,
          host: meetingId,
        });
      });
      socket.on("callAccepted", (data) => {
        console.log("call accepted");
        peer.signal(data.signal);
      });
      peer.on("stream", (stream) => {
        console.log("jadoo");
        userVideo.current.srcObject = stream;
      });
    } else {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });
      peer.on("signal", (data) => {
        setVideoData(data);
      });
      socket.on("newJoin", (data) => {
        const userId = data.userId;
        socket.emit("acceptCall", {
          signalData: stream,
          userId: userId,
        });
        peer.signal(data.signal);
      });
      peer.on("stream", (stream) => {
        console.log("jadoo");
        userVideo.current.srcObject = stream;
      });
    }

    // socket.on("newJoin", (data) => {
    //   setCaller(data.from);
    //   setName(data.name);
    //   setCallerSignal(data.signal);
    // });
    // if (host !== "true") {
    //   socket.emit("joinMeeting", me);
    // }
  }, []);

  return (
    <div>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/static/images/title-logo.png" />
      </Head>
      <div className={videoPageCSS.container}>
        <div className={videoPageCSS.videoContainer}>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={videoPageCSS.myVideo}
          />
          <div className={videoPageCSS.participantVideo}>
            <video
              playsInline
              muted
              ref={userVideo}
              autoPlay
              className={videoPageCSS.myVideo}
            />
          </div>
        </div>
        <div className={videoPageCSS.videoOptionsContainer}>
          <div className={videoPageCSS.videoOptionsSubContainer}>
            <div className={videoPageCSS.iconButtonContainer}>
              <IconButton>
                <MicIcon className={videoPageCSS.iconButton} />
              </IconButton>
            </div>
            <div className={videoPageCSS.iconButtonContainer}>
              <IconButton>
                <VideocamIcon className={videoPageCSS.iconButton} />
              </IconButton>
            </div>
            <div className={videoPageCSS.iconButtonContainer}>
              <IconButton>
                <PresentToAllIcon className={videoPageCSS.iconButton} />
              </IconButton>
            </div>
            <div
              className={videoPageCSS.iconButtonContainer}
              style={{
                backgroundColor: "#EB4334",
              }}
            >
              <IconButton>
                <CallEndIcon className={videoPageCSS.iconButton} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default index;
