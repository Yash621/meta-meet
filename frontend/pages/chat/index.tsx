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
} from "../../store/slices/meetCredentialSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMeeting } from "@videosdk.live/react-sdk";
import io from "socket.io-client";
import { uid } from "../../utils/uid";
import { useRouter } from "next/router";
import ChatComp from "../../components/ChatComp/ChatComp";
import { tabScrollButtonClasses } from "@mui/material";
import CallComp from "../../components/CallComp/CallComp";
import { selectCallCompShowState } from "../../store/slices/callSlice";
import {
  selectAcessToken,
  selectAuthMethod,
  selectJoinedGroups,
  setJoinedGroups,
  selectSpaceJoined,
  setSpaceJoined,
} from "../../store/slices/landingSlice";
import defaultProfilePhoto from "../../public/static/images/default-profile-photo.png";
import axios from "axios";
import { ChatItem } from "react-chat-elements";
import PreChatComp from "../../components/PreChatComp/PreChatComp";
import {
  selectChatCompShowState,
  setChatCompShowState,
  setChatCompShowStateType,
  setChatCompSpaceName,
  setChatCompGroupChat,
} from "../../store/slices/chatSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMediaQuery } from "@material-ui/core";

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
  const { id } = router.query;
  const [userName, setUserName] = useState(null);
  const [sentChats, setSentChats] = useState([]);
  const [receivedChats, setReceivedChats] = useState([]);
  const [conversationExists, setConversationExists] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const [contactsExist, setContactsExist] = useState(false);
  const chatCompShowState = useSelector(selectChatCompShowState);
  // const [joinedSpaces, setJoinedSpaces] = useState([]);
  const joinedSpaces = useSelector(selectJoinedGroups);
  const [previousGroupChat, setPreviousGroupChat] = useState([]);
  const mobileScreen = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    if (accessToken === null) {
      router.push("/");
    }
    setMeetingId(uid());
    if (authMethod === "google") {
      setPhotoUrl(auth.currentUser.photoURL.toString());
    }
    getContacts();
    getSpaces();
  }, []);

  const getPreviousGroupChat = async (space) => {
    const url = "https://metameetio.herokuapp.com";
    try {
      const response = await axios.get(
        `${url}/spacechats/chats?space=${space}`
      );
      const groupChat = response.data;
      setPreviousGroupChat(groupChat);
      console.log(groupChat);
    } catch {
      console.log("error");
    }
  };
  const getSpaces = async () => {
    const url = "https://metameetio.herokuapp.com";
    try {
      const response = await axios.get(`${url}/spaces/getSpaces?userId=${id}`);
      dispatch(setJoinedGroups(response.data.spaces));
      console.log(response.data.spaces.length + " hello124598");
    } catch {
      console.log("error");
    }
  };

  const getContacts = async () => {
    const url = "https://metameetio.herokuapp.com";
    const contacts = await axios.get(`${url}/contacts/contact?id=${id}`);
    setPreviousChats(contacts.data);
    if (contacts.data.length > 0) {
      setContactsExist(true);
    }
    console.log(contacts.data);
  };

  const dispatch = useDispatch();
  const setMeetTypeClickAndmeetCredentialShowState = (meetType) => {
    if (meetType === "new_meeting") {
      setMeetCredProp("new_meeting");
      router.push(`/video?host=true&meetingId=${meetingId}&userId=${id}`);
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
  const getChats = async (user) => {
    const url = "https://metameetio.herokuapp.com";
    const senderId = await axios.get(`${url}/users/id?username=${user}`);
    const myUsername = await axios.get(`${url}/users/username?id=${id}`);
    console.log(myUsername.data);
    console.log(senderId.data);
    await axios
      .get(
        `${url}/chats/chat?userId=${id}&senderId=${senderId.data}&user=${myUsername.data}&reciever=${user}`
      )
      .then((res) => {
        console.log(res.data);
        if (
          res.data.recievedChats.length === 0 &&
          res.data.sentChats.length === 0
        ) {
          setConversationExists(false);
          setReceivedChats([]);
          setSentChats([]);
        } else {
          setSentChats(res.data.sentChats);
          setReceivedChats(res.data.recievedChats);
          setConversationExists(true);
        }
      });
  };
  const filterInput = async (e) => {
    console.log("helo");
    const url = "https://metameetio.herokuapp.com";
    const filter = document.getElementById("search-bar").value;
    if (filter === "") {
      document.getElementById("search-results-container").innerHTML = "";
    } else {
      console.log("hello");
      await axios
        .get(`${url}/users/search?filter=${filter}&id=${id}`)
        .then(async (response) => {
          console.log("hello");
          const spaces = await axios.get(`${url}/spaces/`);
          console.log("hello");
          const filteredUsers = response.data;
          filteredUsers.forEach((user) => {
            user.type = "user";
          });
          const filteredSpaces = spaces.data.spaces.filter((space) => {
            return space.spacename.includes(filter);
          });
          filteredSpaces.forEach((space) => {
            space.type = "space";
          });
          const filteredResults = filteredUsers.concat(filteredSpaces);
          console.log("hello");
          console.log(filteredResults);
          setFilteredResults(filteredResults);
          document.getElementById("search-results-container").innerHTML = "";
          if (filteredResults.length > 0) {
            filteredResults.forEach((result) => {
              const element = document.createElement("div");
              element.className = chatPageCSS.searchResults;
              if (result.type === "user") {
                element.innerHTML = result.username + " (user)";
              } else {
                element.innerHTML = result.spacename + " (space)";
              }
              element.addEventListener("click", async () => {
                document.getElementById("search-bar").value = "";
                setSearchBarHighlight(false);
                dispatch(setChatCompShowState(true));
                if (result.type === "user") {
                  dispatch(setChatCompShowStateType("chat"));
                  setUserName(result.username);
                  getChats(result.username);
                  var checkDuplicate = false;
                  previousChats.forEach((chat) => {
                    if (chat.username === result.username) {
                      checkDuplicate = true;
                    }
                  });
                  if (!checkDuplicate) {
                    setPreviousChats([
                      ...previousChats,
                      {
                        username: result.username,
                      },
                    ]);
                  }
                  setContactsExist(true);
                  document.getElementById("search-results-container").click();
                } else {
                  displaySpace(result.spacename);
                  var checkDuplicate = false;
                  joinedSpaces.forEach((space) => {
                    if (space === result.spacename) {
                      checkDuplicate = true;
                    }
                  });
                  if (!checkDuplicate) {
                    console.log("hello");
                    dispatch(
                      setJoinedGroups([...joinedSpaces, result.spacename])
                    );
                  }
                }
                document.getElementById("search-results-container").innerHTML =
                  "";
              });
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

  const displayChat = (user) => {
    dispatch(setChatCompShowState(true));
    dispatch(setChatCompShowStateType("chat"));
    setUserName(user);
    getChats(user);
  };

  const displayCreateSpacePage = () => {
    setMeetCredProp("space");
    dispatch(setmeetCredentialPageShowState(true));
  };

  const displaySpace = async (space) => {
    const url = "https://metameetio.herokuapp.com";
    const res = await axios.get(
      `${url}/spaces/memberExist?userId=${id}&space=${space}`
    );
    if (res.data.message == "member exists") {
      dispatch(setSpaceJoined(true));
    }
    console.log(res.data.message);
    if (res.data.message == "member does not exists") {
      dispatch(setSpaceJoined(false));
    }
    const response = await axios.get(`${url}/spacechats/chats?space=${space}`);
    const groupChat = response.data;
    setPreviousGroupChat(groupChat);
    console.log(groupChat);
    // getPreviousGroupChat(space);

    dispatch(setChatCompShowStateType("space"));
    dispatch(setChatCompSpaceName(space));
    dispatch(setChatCompShowState(true));
  };
  return (
    <div className={chatPageCSS.container}>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/title-logo.png" />
      </Head>
      {meetCredentialPageShowState && (
        <MeetCred meetType={meetCredProp} meetingId={meetingId} userId={id} />
      )}
      {callComp && <CallComp authMethod={authMethod} />}
      <div className={chatPageCSS.headerContainer}>
        {!mobileScreen && (
          <div className={chatPageCSS.companyNameLogo}>
            <Image src={logo} />
            MetaMeet.io
          </div>
        )}
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
        className={`${chatPageCSS.searchResultsContainer} ${
          mobileScreen && chatPageCSS.mobileSearchResultsContainer
        }`}
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
              {contactsExist && (
                <div className={chatPageCSS.contactsContainer} id="contacts">
                  {previousChats.map((chat, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => displayChat(chat.username)}
                        className={chatPageCSS.contact}
                      >
                        <PreChatComp username={chat.username} type="chat" />
                      </div>
                    );
                  })}
                </div>
              )}
              {!contactsExist && (
                <div className={chatPageCSS.nilChatSpacesHeadContainer}>
                  <ChatBubbleOutlineIcon className={chatPageCSS.chatIcon} />
                  <p>No Conversations</p>
                  <div onClick={() => focusSearchBar("chat")}>Find a chat</div>
                </div>
              )}
            </div>
          </div>
          <div className={chatPageCSS.chatOptionContainer}>
            <div className={chatPageCSS.chatOptionHeadContainer}>
              ⯆ Spaces
              <div
                className={chatPageCSS.addSpace}
                onClick={() => displayCreateSpacePage()}
              >
                <AddCircleIcon />
              </div>
            </div>
            <div className={chatPageCSS.chatsSpacesContainer}>
              {joinedSpaces.length > 0 && (
                <div
                  className={chatPageCSS.contactsContainer}
                  id="joined-spaces"
                >
                  {joinedSpaces.map((space, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => displaySpace(space)}
                        className={chatPageCSS.contact}
                      >
                        <PreChatComp username={space} type="space" />
                      </div>
                    );
                  })}
                </div>
              )}
              {joinedSpaces.length === 0 && (
                <div className={chatPageCSS.nilChatSpacesHeadContainer}>
                  <GroupsIcon className={chatPageCSS.chatIcon} />
                  <p>No spaces yet</p>
                  <div onClick={() => focusSearchBar("space")}>
                    Find a space to join
                  </div>
                </div>
              )}
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
        {chatCompShowState ? (
          <div
            className={chatPageCSS.chatComponentContainer}
            onClick={() => setSearchBarHighlight(false)}
          >
            <ChatComp
              user={userName}
              id={id}
              sentChats={sentChats}
              receivedChats={receivedChats}
              conversationExists={conversationExists}
              groupChat={previousGroupChat}
              meetingId={meetingId}
            />
          </div>
        ) : (
          <div
            className={chatPageCSS.startAChatContainer}
            onClick={() => setSearchBarHighlight(false)}
          >
            <Image src={graphic} className={chatPageCSS.graphic} />
            <p> Start a conversation now </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default index;
