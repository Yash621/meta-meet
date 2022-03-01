/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/link-passhref */
import React, { useEffect } from "react";
import LoginCSS from "../Login/Login.module.css";
import Image from "next/image";
import Logo from "../../public/static/images/logo.png";
import { auth, provider } from "../../firebase";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import axios from "axios";

function Login({ authState }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(() => {
        router.push("/chat");
      })
      .catch((err) => {
        alert("oops! something went wrong!");
      });
  };

  const createUser = () => {
    const url = "http://localhost:5000";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = {
      email: email,
      password: password,
    };
    axios({
      method: "post",
      url: `${url}/users/create`,
      headers: { "content-type": "application/json" },
      data: data,
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
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
        <input
          type="text"
          className={LoginCSS.input}
          placeholder="Enter your email"
          id="email"
        ></input>
      </div>
      <div className={LoginCSS.loginOptions}>
        <div className={LoginCSS.loginOptionName}>Password</div>
        <input
          type="password"
          className={LoginCSS.input}
          placeholder="Enter your password"
          id="password"
        ></input>
      </div>
      <div className={LoginCSS.loginOptions}>
        <button className={LoginCSS.submitLogin} onClick={() => createUser()}>
          {authState}
        </button>
        <div className={LoginCSS.forgotPass}>
          {authState === "Sign In" && (
            <Link href="/auth/register">
              <p>Don't have an account? Sign Up</p>
            </Link>
          )}
          <p onClick={signIn}>{authState} with Google</p>
          {authState !== "Sign In" && (
            <Link href="/auth/login">
              <p>Already have an account ? Sign In</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
