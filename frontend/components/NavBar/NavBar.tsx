/* eslint-disable @next/next/link-passhref */
import React from "react";
import NavBarCSS from "./NavBar.module.css";
import Image from "next/image";
import Logo from "../../public/static/images/logo.png";
import Link from "next/link";
import { auth } from "../../firebase";

function NavBar() {
  return (
    <div className={NavBarCSS.navBar}>
      <div className={NavBarCSS.navBarlogo}>
        <Image
          src={Logo}
          alt="welcome to meta-meet.io"
          width={80}
          height={50}
        />
        <h1>MetaMeet.io</h1>
      </div>
      <div className={NavBarCSS.loginLogoutContainer}>
        <Link href="/auth/register">
          <div>Register</div>
        </Link>
        <Link href="/auth/login">
          <div>Login</div>
        </Link>
        <div onClick={() => auth.signOut()}>Logout</div>
      </div>
    </div>
  );
}

export default NavBar;
