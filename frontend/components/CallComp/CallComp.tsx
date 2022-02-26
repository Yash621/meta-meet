import React from "react";
import callCompCSS from "./CallComp.module.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallIcon from "@mui/icons-material/Call";
import { setCallCompShowState } from "../../pages/slices/callSlice";
import { useDispatch } from "react-redux";

function CallComp() {
  const dispatch = useDispatch();
  return (
    <div className={callCompCSS.container}>
      <div className={callCompCSS.backgroundContainer}></div>
      <div className={callCompCSS.callContainer}>
        <div className={callCompCSS.avatarContainer}>Y</div>
        <div className={callCompCSS.h1}>
          Someone is Inviting you for a video Call
        </div>
        <div className={callCompCSS.acceptRejectContainer}>
          <div
            className={callCompCSS.acceptReject}
            onClick={() => dispatch(setCallCompShowState(false))}
          >
            RejectCall <CallEndIcon className={callCompCSS.icon} />
          </div>
          <div className={`${callCompCSS.acceptReject} ${callCompCSS.accept}`}>
            Accept Call
            <CallIcon className={callCompCSS.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallComp;
