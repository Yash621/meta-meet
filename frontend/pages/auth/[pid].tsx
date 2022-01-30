import React from "react";
import { useRouter } from "next/router";
import Login from "../../components/Login/Login";
import authCSS from "../auth/auth.module.css";
import Head from "next/head";

function LoginRegister() {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className={authCSS.auth}>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="/static/images/logo.png" />
      </Head>
      {pid == "login" ? (
        <Login authState="Sign In" />
      ) : (
        <Login authState="Sign Up" />
      )}
    </div>
  );
}

export default LoginRegister;
