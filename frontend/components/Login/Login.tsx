import React from "react";
import LoginCSS from "../Login/Login.module.css";
import Image from "next/image";
import Logo from "../../public/static/images/logo.png";

function Login() {
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
      <div className={LoginCSS.loginheading}>Login</div>
      <div className={LoginCSS.loginOptions}>
        <div>Email</div>
        <input
          className={LoginCSS.input}
          placeholder="Enter your email"
        ></input>
      </div>
      <div className={LoginCSS.loginOptions}>
        <div>Password</div>
        <input
          className={LoginCSS.input}
          placeholder="Enter your password"
        ></input>
      </div>
      <div className={LoginCSS.loginOptions}>
        <button className={LoginCSS.submitLogin}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
