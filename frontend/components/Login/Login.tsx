/* eslint-disable @next/next/link-passhref */
import React from "react";
import LoginCSS from "../Login/Login.module.css";
import Image from "next/image";
import Logo from "../../public/static/images/logo.png";
import { auth, provider } from "../../firebase";
import Link from "next/link";

function Login({ authState }) {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
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
          className={LoginCSS.input}
          placeholder="Enter your email"
        ></input>
      </div>
      <div className={LoginCSS.loginOptions}>
        <div className={LoginCSS.loginOptionName}>Password</div>
        <input
          className={LoginCSS.input}
          placeholder="Enter your password"
        ></input>
      </div>
      <div className={LoginCSS.loginOptions}>
        <button className={LoginCSS.submitLogin}>{authState}</button>
        <div className={LoginCSS.forgotPass}>
          {authState === "Sign In" && <p>Forgot Password?</p>}
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
