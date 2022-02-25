/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
// import { Jutsu } from "react-jutsu";
import { setStreamStatus, selectStream } from "../slices/videoSlice";
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
import ClearIcon from "@mui/icons-material/Clear";
import VideocamIcon from "@mui/icons-material/Videocam";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { selectSocket } from "../../pages/slices/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { selectMainUserId, setMainUserId } from "../../pages/slices/videoSlice";
import { setmeetCredentialPageShowState } from "../slices/meetCredentialSlice";
const socket = io.connect("http://localhost:5000", {
  transports: ["websocket"],
});

function index() {
  const [stream, setStream] = useState(null);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const router = useRouter();
  const { host, meetingId } = router.query;
  const [videoData, setVideoData] = useState(null);
  const [newJoin, setNewJoin] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const streamStatus = useSelector(selectStream);
  const dispatch = useDispatch();
  const connectionRef = useRef();
  const [socketId, setSocketId] = useState(null);
  const [meetCredShow, setMeetCredShow] = useState(false);
  const [micIconState, setMicIconState] = useState(true);
  const [camIconState, setCamIconState] = useState(true);
  const [globalPeer, setGlobalPeer] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const { type } = router.query;

  var ide = null;
  useEffect(() => {
    socket.on("me", (id) => {
      console.log(id + " meid");
      ide = id;
      setSocketId(id);
      console.log(ide + "ide");
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("newJoin", (data) => {
      setNewJoin(true);
      console.log(data.guestId + "userid");
      setGuestId(data.guestId);
      setVideoData(data.signal);
    });
    if (host === "true") {
      setTimeout(() => {
        setMeetCredShow(true);
      }, 1200);
    }
    if (host === "false") {
      setTimeout(() => {
        document.getElementById(videoPageCSS.dummy).click();
      }, 800);
    }
  }, []);
  const shareScreen = async () => {
    var displayMediaStreamConstraints = {
      video: true,
    };

    const screenStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaStreamConstraints
    );
    screenStream.getVideoTracks()[0].addEventListener("ended", () => {
      myVideo.current.srcObject = stream;
      // stream.getTracks().find((track) => track.kind === "video").enabled = true;
      // globalPeer.addTrack(stream.getVideoTracks()[0], stream);
      // globalPeer.addStream(screenStream);
      // globalPeer.addTrack(screenStream.getVideoTracks()[0], screenStream);
      globalPeer.replaceTrack(
        stream.getVideoTracks()[0],
        stream.getVideoTracks()[0],
        stream
      );
    });
    // globalPeer.removeTrack(stream.getVideoTracks()[0], stream);
    // screenStream.getTracks().find((track) => track.kind === "video").enabled =
    //   true;
    // globalPeer.addTrack(screenStream.getVideoTracks()[0], screenStream);
    globalPeer.replaceTrack(
      stream.getVideoTracks()[0],
      screenStream.getVideoTracks()[0],
      stream
    );
    // console.log(stream);
    myVideo.current.srcObject = screenStream;
  };
  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    setGlobalPeer(peer);
    peer.on("signal", (data) => {
      console.log(data);
      socket.emit("joinMeeting", {
        id: socketId,
        signal: data,
        host: meetingId,
      });
    });
    socket.on("callAccepted", (data) => {
      console.log(connectionRef);
      console.log("call accepted");
      console.log(data.signal + " yobro1234");
      peer.signal(data.signal);
    });
    peer.on("stream", (stream) => {
      console.log("jadoo");
      userVideo.current.srcObject = stream;
    });
    connectionRef.current = peer;
  };
  const acceptCall = () => {
    setNewJoin(false);
    console.log(newJoin);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    setGlobalPeer(peer);
    console.log("hello");
    peer.on("signal", (data) => {
      console.log(data + "yobro12345");
      socket.emit("acceptCall", {
        signal: data,
        guestId: guestId,
      });
    });
    peer.signal(videoData);
    peer.on("stream", (stream) => {
      console.log("yo123");
      userVideo.current.srcObject = stream;
    });
    // console.log(videoData + "     yo123");
    connectionRef.current = peer;
  };
  const adjustCamIconState = () => {
    setCamIconState(!camIconState);
    stream.getTracks().find((track) => track.kind === "video").enabled = !stream
      .getTracks()
      .find((track) => track.kind === "video").enabled;
    if (stream.getTracks().find((track) => track.kind === "video").enabled) {
      setTimeout(() => {
        myVideo.current = document.getElementsByClassName(
          videoPageCSS.myVideo
        )[0];
        myVideo.current.srcObject = stream;
        console.log(
          document.getElementsByClassName(videoPageCSS.myVideo).length
        );
      }, 10);
    }
  };
  const adjustMicIconState = () => {
    setMicIconState(!micIconState);
    stream.getTracks().find((track) => track.kind === "audio").enabled = !stream
      .getTracks()
      .find((track) => track.kind === "audio").enabled;
  };
  const endCall = () => {
    dispatch(setmeetCredentialPageShowState(false));
    stream
      .getTracks()
      .find((track) => track.kind === "video")
      .stop();
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    router.push("/chat");
  };
  return (
    <div>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/static/images/title-logo.png" />
      </Head>
      <div id={videoPageCSS.dummy} onClick={() => callUser()}></div>
      {newJoin && (
        <div className={videoPageCSS.notifier}>
          <div className={videoPageCSS.notifierText}>
            Someone wants to join this call
            <p>As the host you can decide to accept or deny the request</p>
          </div>
          <div className={videoPageCSS.notifierButtons}>
            <button
              className={videoPageCSS.notifierButton}
              onClick={() => acceptCall()}
            >
              Accept entry
            </button>
            <button className={videoPageCSS.notifierButton}>Deny entry</button>
          </div>
        </div>
      )}
      {meetCredShow && (
        <div className={videoPageCSS.meetDetails}>
          <div className={videoPageCSS.meetDetailsheading}>
            Invite more people to meeting
            <IconButton>
              <ClearIcon
                className={videoPageCSS.clearIcon}
                onClick={() => setMeetCredShow(false)}
              />
            </IconButton>
          </div>
          <div className={videoPageCSS.meetDetailsSubHeading}>
            To join a meeting, enter the meeting code provided by the organizer
          </div>
          <div className={videoPageCSS.meetIdContainer}>
            {socketId}
            <CopyToClipboard text={socketId}>
              <IconButton>
                <ContentCopyIcon />
              </IconButton>
            </CopyToClipboard>
          </div>
        </div>
      )}
      <div className={videoPageCSS.container}>
        <div className={videoPageCSS.videoContainer}>
          {camIconState ? (
            <video
              playsInline
              ref={myVideo}
              muted
              autoPlay
              className={videoPageCSS.myVideo}
              id="my-video"
            />
          ) : (
            <div className={videoPageCSS.userProfileContainer}>
              <div className={videoPageCSS.userProfile}>Y</div>
            </div>
          )}
          <div className={videoPageCSS.participantVideo}>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={videoPageCSS.myVideo}
            />
          </div>
        </div>
        <div className={videoPageCSS.videoOptionsContainer}>
          <div className={videoPageCSS.videoOptionsSubContainer}>
            <div
              className={videoPageCSS.iconButtonContainer}
              onClick={() => adjustMicIconState()}
            >
              <IconButton>
                {micIconState ? (
                  <MicIcon className={videoPageCSS.iconButton} />
                ) : (
                  <MicOffIcon className={videoPageCSS.iconButton} />
                )}
              </IconButton>
            </div>
            <div
              className={videoPageCSS.iconButtonContainer}
              onClick={() => adjustCamIconState()}
            >
              <IconButton>
                {camIconState ? (
                  <VideocamIcon className={videoPageCSS.iconButton} />
                ) : (
                  <VideocamOffIcon className={videoPageCSS.iconButton} />
                )}
              </IconButton>
            </div>
            <div
              className={videoPageCSS.iconButtonContainer}
              onClick={() => shareScreen()}
            >
              <IconButton>
                <PresentToAllIcon className={videoPageCSS.iconButton} />
              </IconButton>
            </div>
            <div
              className={videoPageCSS.iconButtonContainer}
              style={{
                backgroundColor: "#EB4334",
              }}
              onClick={() => endCall()}
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
