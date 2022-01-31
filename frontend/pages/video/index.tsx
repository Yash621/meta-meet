/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Jutsu } from "react-jutsu";
import Head from "next/head";
import { useRouter } from "next/router";
import videoPageCSS from "./videoPage.module.css";

function index() {
  const router = useRouter();
  const { roomid, password } = router.query;

  return (
    <div>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/static/images/title-logo.png" />
      </Head>
      <Jutsu
        roomName={roomid}
        password={password}
        onMeetingEnd={() => console.log("Meeting has ended")}
        loadingComponent={<p>loading ...</p>}
        errorComponent={<p>Oops, something went wrong</p>}
        containerStyles={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
}

export default index;
