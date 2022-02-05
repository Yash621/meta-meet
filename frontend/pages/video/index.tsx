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

const socket = io.connect("http://localhost:5000", {
  transports: ["websocket"],
});

function index() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  // const callUser = (id) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: stream,
  //   });
  //   peer.on("signal", (data) => {
  //     socket.emit("callUser", {
  //       userToCall: id,
  //       signalData: data,
  //       from: me,
  //       name: name,
  //     });
  //   });
  //   peer.on("stream", (stream) => {
  //     userVideo.current.srcObject = stream;
  //   });
  //   socket.on("callAccepted", (signal) => {
  //     setCallAccepted(true);
  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const answerCall = () => {
  //   setCallAccepted(true);
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });
  //   peer.on("signal", (data) => {
  //     socket.emit("answerCall", { signal: data, to: caller });
  //   });
  //   peer.on("stream", (stream) => {
  //     userVideo.current.srcObject = stream;
  //   });

  //   peer.signal(callerSignal);
  //   connectionRef.current = peer;
  // };

  // const leaveCall = () => {
  //   setCallEnded(true);
  //   connectionRef.current.destroy();
  // };

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
