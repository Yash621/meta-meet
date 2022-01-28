import React from "react";
import { useRouter } from "next/router";
import Login from "../../components/Login/Login";
import Logout from "../../components/Logout/Logout";
import authCSS from "../auth/auth.module.css";

function LoginRegister() {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className={authCSS.auth}>
      {pid == "login" ? <Login /> : <Logout />}
    </div>
  );
}

export default LoginRegister;
