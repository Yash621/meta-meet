/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import chatPageCSS from "./chatPage.module.css";
import Image from "next/image";
import graphic from "../../public/static/images/chat-page-graphic.jpg";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import profilePhoto from "../../public/static/images/profile-photo.jpeg";
import ChatIcon from "@mui/icons-material/Chat";
import Head from "next/head";
import DehazeIcon from "@mui/icons-material/Dehaze";
import logo from "../../public/static/images/title-logo.png";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MeetCred from "../../components/MeetCred/MeetCred";
import { auth } from "../../firebase";
import {
  selectmeetCredentialPageShowState,
  setmeetCredentialPageShowState,
} from "../../pages/slices/meetCredentialSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMeeting } from "@videosdk.live/react-sdk";
import io from "socket.io-client";
import { uid } from "../../utils/uid";
import { useRouter } from "next/router";
import ChatComp from "../../components/ChatComp/ChatComp";
import { tabScrollButtonClasses } from "@mui/material";
import CallComp from "../../components/CallComp/CallComp";
import { selectCallCompShowState } from "../slices/callSlice";
import { selectAcessToken, selectAuthMethod } from "../slices/landingSlice";
import defaultProfilePhoto from "../../public/static/images/default-profile-photo.png";
import axios from "axios";

function index() {
  const meetCredentialPageShowState = useSelector(
    selectmeetCredentialPageShowState
  );
  const [meetCredProp, setMeetCredProp] = useState("new_meeting");
  const [meetingId, setMeetingId] = useState("");
  const router = useRouter();
  const [searchBarHighlight, setSearchBarHighlight] = useState(false);
  const [searchBarHighlightType, setSearchBarHighlightType] = useState("");
  const [chatComp, setChatComp] = useState(false);
  const callComp = useSelector(selectCallCompShowState);
  const accessToken = useSelector(selectAcessToken);
  const { authMethod } = router.query;
  const authWay = useSelector(selectAuthMethod);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [logOutShowState, setLogOutShowState] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setMeetingId(uid());
    if (authMethod === "google") {
      setPhotoUrl(auth.currentUser.photoURL.toString());
    }
  }, []);

  const dispatch = useDispatch();
  const setMeetTypeClickAndmeetCredentialShowState = (meetType) => {
    if (meetType === "new_meeting") {
      setMeetCredProp("new_meeting");
      router.push(`/video?host=true&meetingId=${meetingId}`);
    } else {
      setMeetCredProp("join_meeting");
      dispatch(setmeetCredentialPageShowState(true));
    }
  };

  const focusSearchBar = (kind) => {
    if (
      !(
        ((kind === "space" && searchBarHighlightType == "chat") ||
          (kind === "chat" && searchBarHighlightType == "space")) &&
        searchBarHighlight === true
      )
    ) {
      setSearchBarHighlight(!searchBarHighlight);
      !searchBarHighlight
        ? document.getElementById("search-bar").focus()
        : document.getElementById("search-bar").blur();
    }
    setSearchBarHighlightType(kind);
  };
  const logOut = () => {
    router.push("/");
  };
  const filterInput = async (e) => {
    console.log("helo");
    const url = "http://localhost:5000";
    const filter = document.getElementById("search-bar").value;
    if (filter === "") {
      document.getElementById("search-results-container").innerHTML = "";
    } else {
      await axios
        .get(`${url}/users/search?filter=${filter}`)
        .then((response) => {
          setFilteredResults(response.data);
          document.getElementById("search-results-container").innerHTML = "";
          if (response.data.length > 0) {
            response.data.forEach((user) => {
              const element = document.createElement("div");
              element.className = chatPageCSS.searchResults;
              element.innerHTML = user.username;
              document
                .getElementById("search-results-container")
                .appendChild(element);
            });
          } else {
            const element = document.createElement("div");
            element.className = chatPageCSS.searchResults;
            element.innerHTML = "No results found";
            document.getElementById("search-results-container").innerHTML = "";
            document
              .getElementById("search-results-container")
              .appendChild(element);
          }

          console.log(filteredResults);
        });
    }
  };

  return (
    <div className={chatPageCSS.container}>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/title-logo.png" />
      </Head>
      {meetCredentialPageShowState && (
        <MeetCred meetType={meetCredProp} meetingId={meetingId} />
      )}
      {callComp && <CallComp authMethod={authMethod} />}

      <div className={chatPageCSS.headerContainer}>
        <div className={chatPageCSS.chatIconContainer}>
          <DehazeIcon className={chatPageCSS.slideIcon} />
        </div>
        <div className={chatPageCSS.companyNameLogo}>
          <Image src={logo} />
          MetaMeet.io
        </div>
        <div
          className={`${chatPageCSS.inputContainer} ${
            searchBarHighlight && chatPageCSS.highlight
          }`}
        >
          <div
            className={chatPageCSS.chatIconContainer}
            onClick={() => {
              document.getElementById("search-bar").focus();
            }}
          >
            <SearchIcon className={chatPageCSS.chatIcon} />
          </div>
          <input
            type="text"
            placeholder="Search users or spaces"
            className={`${chatPageCSS.input} `}
            id="search-bar"
            onFocus={() => setSearchBarHighlight(true)}
            onKeyUp={(e) => {
              filterInput(e);
            }}
          ></input>
        </div>

        {authMethod === "google" && (
          <img
            src={photoUrl}
            alt="profile-photo"
            className={chatPageCSS.profileAvatarContainer}
            onClick={() => setLogOutShowState(!logOutShowState)}
          />
        )}

        {authMethod !== "google" && (
          <div
            className={`${chatPageCSS.profileAvatarContainer} ${chatPageCSS.animatedAvatar}`}
            onClick={() => setLogOutShowState(!logOutShowState)}
          >
            <Image src={defaultProfilePhoto} />
          </div>
        )}
        {logOutShowState && (
          <div className={chatPageCSS.logOutContainer} onClick={() => logOut()}>
            LogOut
          </div>
        )}
      </div>
      <div
        className={chatPageCSS.searchResultsContainer}
        id="search-results-container"
      >
        {/* {filteredResults.map((user) => {
          <div className={chatPageCSS.searchResults}>{user.username}</div>;
        })} */}
      </div>
      <div className={chatPageCSS.chatContainer}>
        <div className={chatPageCSS.chatOptionsContainer}>
          <div className={chatPageCSS.chatOptionContainer}>
            <div className={chatPageCSS.chatOptionHeadContainer}>⯆ Chat</div>
            <div className={chatPageCSS.chatsSpacesContainer}>
              <div className={chatPageCSS.nilChatSpacesHeadContainer}>
                <ChatBubbleOutlineIcon className={chatPageCSS.chatIcon} />
                <p>No Conversations</p>
                <div onClick={() => focusSearchBar("chat")}>Find a chat</div>
              </div>
            </div>
          </div>
          <div className={chatPageCSS.chatOptionContainer}>
            <div className={chatPageCSS.chatOptionHeadContainer}>⯆ Spaces</div>
            <div className={chatPageCSS.chatsSpacesContainer}>
              <div className={chatPageCSS.nilChatSpacesHeadContainer}>
                <GroupsIcon className={chatPageCSS.chatIcon} />
                <p>No spaces yet</p>
                <div onClick={() => focusSearchBar("space")}>
                  Find a space to join
                </div>
                <div>Create Space</div>
              </div>
            </div>
          </div>
          <div className={chatPageCSS.startMeetContainer}>
            <div className={chatPageCSS.chatOptionMeetHeadContainer}>
              ⯆ Meet
            </div>
            <div className={chatPageCSS.startMeetOptionsContainer}>
              <div
                className={chatPageCSS.startMeetOptionContainer}
                onClick={() =>
                  setMeetTypeClickAndmeetCredentialShowState("new_meeting")
                }
              >
                <VideoCallIcon />
                <p> New Meeting</p>
              </div>
              <div
                className={chatPageCSS.startMeetOptionContainer}
                onClick={() =>
                  setMeetTypeClickAndmeetCredentialShowState("join_meeting")
                }
              >
                <KeyboardIcon />
                <p>Join a Meeting</p>
              </div>
            </div>
          </div>
        </div>
        {chatComp ? (
          <div className={chatPageCSS.searchResultContainer}>
            <ChatComp />
          </div>
        ) : (
          <div
            className={chatPageCSS.searchResultContainer}
            onClick={() => setSearchBarHighlight(false)}
          >
            <Image src={graphic} />
            <p> Start a conversation now </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default index;
