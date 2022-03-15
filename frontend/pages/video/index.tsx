/* eslint-disable @next/next/no-img-element */
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
import {
  selectMainUserId,
  setMainUserId,
  selectGlobalStatePeer,
  setGlobalStatePeer,
} from "../../pages/slices/videoSlice";
import { setmeetCredentialPageShowState } from "../slices/meetCredentialSlice";
import { uid } from "../../utils/uid";
import { drawHand } from "../../utils/detectionUtils";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import victory from "../../public/static/images/victory.png";
import thumbs_up from "../../public/static/images/thumbs_up.png";
import good_bye from "../../public/static/images/good_bye.png";
import Webcam from "react-webcam";
import Image from "next/image";
import rock from "../../public/static/images/rock.png";
import { auth } from "../../firebase";
import defaultAvatar from "../../public/static/images/default-profile-photo.png";
import {
  selectAcessToken,
  selectAuthMethod,
} from "../../pages/slices/landingSlice";
import axios from "axios";

const socket = io.connect("http://localhost:5000", {
  transports: ["websocket"],
});

function index() {
  const [stream, setStream] = useState(null);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const router = useRouter();
  const { host, meetingId } = router.query;
  const [videoData, setVideoData] = useState([]);
  const [newJoin, setNewJoin] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const streamStatus = useSelector(selectStream);
  const dispatch = useDispatch();
  const connectionRef = useRef();
  const [socketId, setSocketId] = useState(null);
  const [meetCredShow, setMeetCredShow] = useState(false);
  const [micIconState, setMicIconState] = useState(true);
  const [camIconState, setCamIconState] = useState(true);
  const [globalPeer, setGlobalPeer] = useState([]);
  const [Participants, setParticipants] = useState(null);
  const [participantIde, setParticipantIde] = useState(null);
  const [joinedParticipantsVideo, setJoinedParticipantsVideo] = useState([]);
  const callerPeer = useRef(null);
  var ide = null;
  const [tPeer, setTpeer] = useState(null);
  const idRef = useRef(null);
  const [peerData, setPeerData] = useState(null);
  const canvasRef = useRef(null);
  const images = { thumbs_up: thumbs_up, victory: victory, good_bye: good_bye };
  const [emoji, setEmoji] = useState(null);
  const webcamRef = useRef(null);
  const [shareScreenState, setShareScreenState] = useState(false);
  const authMethod = useSelector(selectAuthMethod);
  const { userId } = router.query;
  const [userName, setUserName] = useState(null);
  const authToken = useSelector(selectAcessToken);

  // const globalStatePeer = useSelector(selectGlobalStatePeer);

  const callAllParticipants = (participantId) => {
    setParticipantIde(participantId);
    document.getElementById(videoPageCSS.dummy).click();
    console.log("I love you nitya");
  };

  useEffect(() => {
    if (authToken === null) {
      router.push("/");
    }
    socket.on("helloworld", (data) => {
      console.log(data.message);
    });
    socket.on("leftCall", (data) => {
      console.log(document.getElementById(data.id));
      console.log(document.getElementById("participants-video"));
      document
        .getElementById("participants-video")
        .removeChild(document.getElementById(data.id));
      console.log("element removed  " + data.id);
    });
    socket.on("me", (data) => {
      console.log(data.id + " meid");
      ide = data.id;
      idRef.current = data.id;
      setSocketId(data.id);
      console.log(ide + "ide");
    });
    socket.on("Participants", (data) => {
      setParticipants(data.Participants);
      setTimeout(() => {
        console.log(data.Participants);
        var dum = 0;
        const interval = window.setInterval(() => {
          if (dum < data.Participants.length) {
            callAllParticipants(data.Participants[dum]);
            console.log(dum);
            dum++;
          }
          if (dum === data.Participants.length) {
            clearInterval(interval);
          }
        }, 8000);
      }, 800);
    });
    if (host === "false") {
      socket.emit("meetingData", { roomId: meetingId });
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        // myVideo.current.srcObject = stream;
      });
    socket.on("newJoin", (data) => {
      console.log(data.guestId + "userid");
      setGuestId(data.guestId);
      setTpeer(data.peer);
      setUserName(data.username);
      var localVideoData = videoData;
      localVideoData.push(data.signal);
      setVideoData(localVideoData);
      setTimeout(() => {
        console.log("click");
        document.getElementById(videoPageCSS.dummyb).click();
      }, 800);
    });

    if (host === "true") {
      dispatch(setMainUserId(uid()));
      setTimeout(() => {
        console.log(meetingId);
        setMeetCredShow(true);
        console.log(ide + " ide is the best");
        socket.emit("createRoom", { roomId: meetingId });
      }, 1200);
    }

    socket.on("callAccepted", (data) => {
      setUserName(data.username);
      var localVideoData = joinedParticipantsVideo;
      localVideoData.push(data.signal);
      setJoinedParticipantsVideo(localVideoData);
      console.log(data.username + "hahaha");
      console.log("connectionRef");
      console.log(data.id + "  yobrohowareyou");
      console.log("call accepted");
      console.log(data.signal + " yobro1234");
      console.log(joinedParticipantsVideo.length - 1);
      console.log(joinedParticipantsVideo);
      setPeerData(data.signal);
      setTimeout(() => {
        console.log("click yash");
        document.getElementById("peer-click").click();
      }, 800);
      // peer.signal(joinedParticipantsVideo[joinedParticipantsVideo.length - 1]);
      console.log("my name is yash");
    });

    runHandpose();
  }, []);

  const createVideoElement = async (guestId) => {
    const video = document.createElement("video");
    const container = document.createElement("div");
    const nameContainer = document.createElement("div");
    nameContainer.innerHTML = userName;
    console.log(userName + " element created");
    nameContainer.className = videoPageCSS.nameContainer;
    container.className = videoPageCSS.otherVideoContainer;
    container.setAttribute("id", guestId);
    container.appendChild(video);
    container.appendChild(nameContainer);
    video.playsInline = true;
    video.autoplay = true;
    video.className = videoPageCSS.participantsVideo;
    // video.id = guestId;
    document.getElementById("participants-video").appendChild(container);
    return video;
  };
  const shareScreen = async () => {
    setEmoji(null);
    var displayMediaStreamConstraints = {
      video: true,
    };
    const screenStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaStreamConstraints
    );
    screenStream.getVideoTracks()[0].addEventListener("ended", () => {
      myVideo.current.srcObject = stream;
      setShareScreenState(false);
      globalPeer.forEach((peer) => {
        peer.replaceTrack(
          stream.getVideoTracks()[0],
          stream.getVideoTracks()[0],
          stream
        );
      });
    });

    globalPeer.forEach((peer) => {
      peer.replaceTrack(
        stream.getVideoTracks()[0],
        screenStream.getVideoTracks()[0],
        stream
      );
    });
    // console.log(stream);
    setEmoji(null);
    setShareScreenState(true);
    myVideo.current.srcObject = screenStream;
  };
  const callUser = (pid) => {
    console.log(participantIde + "participantIde to be called");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    var peerArr = globalPeer;
    peerArr.push(peer);
    setGlobalPeer(peerArr);
    callerPeer.current = peer;

    peer.on("signal", async (data) => {
      console.log(data);
      const url = "http://localhost:5000";
      const username = await axios.get(`${url}/users/username?id=${userId}`);
      // await axios.get(`${url}/users/username?id=${userId}`);
      console.log(username.data + "hahaha ");
      console.log(meetingId);
      socket.emit("joinMeeting", {
        id: socketId,
        signal: data,
        host: participantIde,
        roomId: meetingId,
        peer: peer,
        username: username.data,
      });
    });

    peer.on("stream", async (stream) => {
      console.log("jadoo");
      console.log(userName + " stream");
      const video = await createVideoElement(participantIde);
      video.srcObject = stream;
      console.log("hello world");
    });
    connectionRef.current = peer;
  };

  const acceptCall = (guestId, videoData) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    var peerArr = globalPeer;
    peerArr.push(peer);
    setGlobalPeer(peerArr);

    console.log("hello");
    peer.on("signal", async (data) => {
      console.log(data + "yobro12345");
      const url = "http://localhost:5000";
      const username = await axios.get(`${url}/users/username?id=${userId}`);
      // await axios.get(`${url}/users/username?id=${userId}`);
      console.log(username.data + "hahaha ");
      socket.emit("acceptCall", {
        signal: data,
        guestId: guestId,
        id: socketId,
        peer: tPeer,
        username: username.data,
      });
    });
    console.log(videoData.length);
    peer.signal(videoData[videoData.length - 1]);
    peer.on("stream", async (stream) => {
      console.log("yo123");
      const video = await createVideoElement(guestId);
      video.srcObject = stream;
    });
    connectionRef.current = peer;
  };
  const adjustCamIconState = () => {
    if (camIconState === true) {
      setEmoji(null);
    }
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
    socket.emit("endCall", { id: socketId, meetingId: meetingId });
    stream
      .getTracks()
      .find((track) => track.kind === "video")
      .stop();
    globalPeer.forEach((peer) => {
      peer.destroy();
    });
    router.push(`/chat?id=${userId}`);
  };
  const acceptUserCall = (guestId, videoData) => {
    console.log(guestId + "guestid");
    console.log(videoData + "videoData");
    acceptCall(guestId, videoData);
  };
  const setPeerSignal = (globalPeer, peerData) => {
    console.log(userName + "userName");
    globalPeer.signal(peerData);
  };
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);
      // create new gesture with id "rock"
      const PaperGesture = new fp.GestureDescription("good_bye");
      PaperGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
      PaperGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
      PaperGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl);
      PaperGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl);
      PaperGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          PaperGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures + "I am the best");
          // console.log(gesture.gestures[0]);
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          // console.log(confidence + "I am the best");
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          // console.log(maxConfidence + "I am the best");
          // console.log(gesture.gestures[maxConfidence].name);
          // console.log(gesture.gestures[maxConfidence].name + "  I am the best");
          if (gesture.gestures[maxConfidence].name === "victory") {
            // console.log("hello ji");
            document.getElementById("mute").click();
          }
          if (gesture.gestures[maxConfidence].name === "thumbs_up") {
            document.getElementById("unmute").click();
          }
          if (gesture.gestures[maxConfidence].name === "good_bye") {
            document.getElementById("end-btn").click();
            // console.log("hello ji");
          }
          setEmoji(gesture.gestures[maxConfidence].name);
          // console.log(emoji);
        }
      }
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };
  const mute = () => {
    console.log("hello ji");
    setMicIconState(false);
    stream.getTracks().find((track) => track.kind === "audio").enabled = false;
  };
  const unMute = () => {
    console.log("hello ji");
    setMicIconState(true);
    stream.getTracks().find((track) => track.kind === "audio").enabled = true;
  };

  return (
    <div>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/static/images/title-logo.png" />
      </Head>
      <div id={videoPageCSS.dummy} onClick={() => callUser(null)}></div>
      <div id="mute" onClick={() => mute()}></div>
      <div id="unmute" onClick={() => unMute()}></div>
      <div
        id="peer-click"
        onClick={() =>
          setPeerSignal(globalPeer[globalPeer.length - 1], peerData)
        }
      ></div>
      <div
        id={videoPageCSS.dummyb}
        onClick={() => acceptUserCall(guestId, videoData)}
      ></div>
      {newJoin && (
        <div className={videoPageCSS.notifier}>
          <div className={videoPageCSS.notifierText}>
            Someone wants to join this call
            <p>As the host you can decide to accept or deny the request</p>
          </div>
          <div className={videoPageCSS.notifierButtons}>
            <button
              className={videoPageCSS.notifierButton}
              // onClick={() => acceptCall()}
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
            {meetingId}
            <CopyToClipboard text={meetingId}>
              <IconButton>
                <ContentCopyIcon />
              </IconButton>
            </CopyToClipboard>
          </div>
        </div>
      )}
      {/* NEW STUFF */}
      {emoji && (
        <div className={videoPageCSS.handSignContainer}>
          <Image src={images[emoji]} alt="" className={videoPageCSS.handSign} />
        </div>
      )}
      {/* NEW STUFF */}
      <div className={videoPageCSS.container}>
        <div className={videoPageCSS.videoContainer}>
          {camIconState ? (
            <div className={videoPageCSS.myVideoContainer}>
              {!shareScreenState && (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  id="my-video"
                  className={videoPageCSS.myVideo}
                />
              )}
              {shareScreenState && (
                <video
                  playsInline
                  ref={myVideo}
                  muted
                  autoPlay
                  className={videoPageCSS.myVideo}
                  id="my-video"
                />
              )}
              <div className={videoPageCSS.myVideoOverlay}>You</div>
            </div>
          ) : (
            <div className={videoPageCSS.userProfileContainer}>
              {authMethod === "inputCredentials" && (
                <div className={videoPageCSS.userProfile}>
                  <Image src={defaultAvatar} alt="" />
                </div>
              )}
              {authMethod !== "inputCredentials" && (
                <img
                  src={auth.currentUser.photoURL.toString()}
                  alt=""
                  className={videoPageCSS.userProfile}
                />
              )}
              <div className={videoPageCSS.myVideoOffOverlay}>You</div>
            </div>
          )}
          {/* canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480,
            }}
          />
          <div
            className={videoPageCSS.participantVideoContainer}
            id="participants-video"
          >
            {/* yo */}
          </div>
        </div>
        <div className={videoPageCSS.videoOptionsContainer}>
          <div className={videoPageCSS.videoOptionsSubContainer}>
            <div
              className={videoPageCSS.iconButtonContainer}
              onClick={() => adjustMicIconState()}
              id="mic"
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
              id="end-btn"
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
