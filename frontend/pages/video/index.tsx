/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
// import { Jutsu } from "react-jutsu";
import Head from "next/head";
import { useRouter } from "next/router";
import videoPageCSS from "./videoPage.module.css";
import { MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";

function index() {
  var jwt = require("jsonwebtoken");
  var uuid4 = require("uuid4");
  const meeting = useMeeting();

  // Need to generate from app.videosdk.live
  const API_KEY = "595c6a4d-f630-4bc6-ba4c-c3d663e56302";
  const SECRET_KEY =
    "24e00c42e2b09e64754a98595b9eba3a483deadb5f007daf6f4331a11c561940";

  jwt.sign(
    {
      apikey: API_KEY,
      permissions: ["allow_join"], // Permission to join the meeting
    },
    SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "24h",
      jwtid: uuid4(),
    },
    function (err, token) {
      console.log(token);
    }
  );
  useEffect(() => {
    meeting?.join();
  }, []);
  return (
    <div>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/static/images/title-logo.png" />
      </Head>
      <MeetingProvider
        config={{
          meetingId: "<Id-on-meeting>",
          name: "<Name-of-participant>",
          micEnabled: "<Flag-to-enable-mic>",
          webcamEnabled: "<Flag-to-enable-webcam>",
          maxResolution: "<Maximum-resolution>",
        }}
        token={"<Authentication-token>"}
      >
        {/* <MeetingView>...</MeetingView> */}
      </MeetingProvider>
      {/* <Jutsu
        roomName="nar"
        password="dattebayo"
        displayName="uzumaki"
        onMeetingEnd={() => console.log("Meeting has ended")}
        containerStyles={{ width: "100vw", height: "100vh" }}
      /> */}
    </div>
  );
}
const MeetingView = () => {
  // Get Meeting object using useMeeting hook
  const meeting = useMeeting();

  return <>...</>;
};
export default index;
