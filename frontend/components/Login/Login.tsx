/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from "react";
import LoginCSS from "../Login/Login.module.css";
import Image from "next/image";
import Logo from "../../public/static/images/logo.png";
import { auth, provider } from "../../firebase";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken, setAuthMethod } from "../../pages/slices/landingSlice";

function Login({ authState }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(() => {
        router.push("/chat?authMethod=google");
      })
      .catch((err) => {
        alert("oops! something went wrong!");
      });
  };

  const authUser = () => {
    const url = "http://localhost:5000";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (authState === "Sign In") {
      const data = {
        email: email,
        password: password,
      };
      axios({
        method: "post",
        url: `${url}/users/login`,
        data: data,
        headers: { "content-type": "application/json" },
      })
        .then(function (response) {
          //handle success
          console.log("hello");
          if (response.data.message === "authenticated") {
            dispatch(setAccessToken(response.data.accessToken));
            dispatch(setAuthMethod("inputCredentials"));
            router.push("/chat?id=" + response.data.userId);
          } else {
            setIncorrectPassword(true);
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    } else {
      const data = {
        email: email,
        password: password,
      };
      axios({
        method: "post",
        url: `${url}/users/register`,
        headers: { "content-type": "application/json" },
        data: data,
      })
        .then(function (response) {
          if (response.data.message === "User already exists") {
            setEmailAlreadyExists(true);
          } else {
            router.push("/chat?id=" + response.data.userId);
            dispatch(setAuthMethod("inputCredentials"));
          }
        })
        .catch(function (response) {
          //handle error
        });
    }
  };
  const refreshStates = () => {
    setEmailAlreadyExists(false);
    setIncorrectPassword(false);
  };

  return (
    <div className={LoginCSS.login}>
      <div className={LoginCSS.companyName}>
        <Image
          src={Logo}
          alt="welcome to meta-meet.io"
          width={80}
          height={50}
        />
        <h1>MetaMeet.io</h1>
      </div>
      <div className={LoginCSS.loginheading}>{authState}</div>
      <div className={`${LoginCSS.loginOptions}`}>
        <div className={LoginCSS.loginOptionName}>Email</div>
        {emailAlreadyExists && (
          <div className={LoginCSS.warnings}>
            <p>Email already exists, please try a different email</p>
          </div>
        )}

        <input
          type="text"
          className={LoginCSS.input}
          placeholder="Enter your email"
          id="email"
        ></input>
      </div>
      <div className={LoginCSS.loginOptions}>
        <div className={LoginCSS.loginOptionName}>Password</div>
        {incorrectPassword && (
          <div className={LoginCSS.warnings}>
            <p>Incorrect Password, Please try again</p>
          </div>
        )}
        <input
          type="password"
          className={LoginCSS.input}
          placeholder="Enter your password"
          id="password"
        ></input>
      </div>
      <div className={LoginCSS.loginOptions}>
        <button className={LoginCSS.submitLogin} onClick={() => authUser()}>
          {authState}
        </button>
        <div className={LoginCSS.forgotPass}>
          {authState === "Sign In" && (
            <Link href="/auth/register">
              <p onClick={() => refreshStates()}>
                Don't have an account? Sign Up
              </p>
            </Link>
          )}
          <p onClick={signIn}>{authState} with Google</p>
          {authState !== "Sign In" && (
            <Link href="/auth/login">
              <p onClick={() => refreshStates()}>
                Already have an account ? Sign In
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
