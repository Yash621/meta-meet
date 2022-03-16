/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from "react";
import LandingPageCSS from "./LandingPage.module.css";
import Logo from "../../public/static/images/landing-page-icon.png";
import logo from "../../public/static/images/logo.png";
import Image from "next/image";
import NavBar from "../../components/NavBar/NavBar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  selectlandingPageVisit,
  setLandingPageVisit,
} from "../../store/slices/landingSlice";
import { useMediaQuery } from "@material-ui/core";

function LandingPage() {
  const landingPageVisit = useSelector(selectlandingPageVisit);
  const dispatch = useDispatch();
  const destopScreen = useMediaQuery("(min-width: 1100px)");
  const mobileScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (mobileScreen === true) {
      dispatch(setLandingPageVisit(true));
    } else {
      setTimeout(() => {
        dispatch(setLandingPageVisit(true));
      }, 3000);
    }
  }, []);
  return (
    <div className={LandingPageCSS.landingPage}>
      <NavBar />
      <div
        className={`${LandingPageCSS.landingPageContainer} ${
          mobileScreen && LandingPageCSS.changeFlex
        }`}
      >
        {(landingPageVisit || mobileScreen) && (
          <div
            className={`${LandingPageCSS.landingPageTagline} ${
              mobileScreen && LandingPageCSS.mobileTagline
            }`}
          >
            <div className={LandingPageCSS.company}>
              <div className={LandingPageCSS.companyName}>MetaMeet.io</div>
              {destopScreen && (
                <div className={LandingPageCSS.companyLogo}>
                  <Image src={logo} alt="welcome to meta-meet.io" />
                </div>
              )}
            </div>
            <div className={LandingPageCSS.tagline}>
              Bring your Offices and Schools to your homes through MetaMeet.io
            </div>
            <Link href="/auth/register">
              <div className={LandingPageCSS.joinUs}>
                <div>
                  <p>Join us</p>
                </div>
              </div>
            </Link>
          </div>
        )}
        {/* {destopScreen && ( */}
        <div
          className={`${
            !landingPageVisit && !mobileScreen && LandingPageCSS.logo
          } `}
        >
          <Image src={Logo} alt="welcome to meta-meet.io" />
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default LandingPage;
