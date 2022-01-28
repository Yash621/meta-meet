import React from "react";
import { useRouter } from "next/router";

function LoginRegister() {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <h1>jlkjf</h1>
    </div>
  );
}

export default LoginRegister;
