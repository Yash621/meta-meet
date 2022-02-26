import React from "react";
import callCompCSS from "./CallComp.module.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallIcon from "@mui/icons-material/Call";
import {
  setCallCompShowState,
  selectCallCompShowStateType,
} from "../../pages/slices/callSlice";
import { useDispatch, useSelector } from "react-redux";

function CallComp() {
  const dispatch = useDispatch();
  const callType = useSelector(selectCallCompShowStateType);

  return (
    <div className={callCompCSS.container}>
      <div className={callCompCSS.backgroundContainer}></div>
      <div className={callCompCSS.callContainer}>
        <div className={callCompCSS.avatarContainer}>Y</div>
        <div className={callCompCSS.h1}>
          Someone is Inviting you for a {callType}
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
