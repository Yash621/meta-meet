import React from 'react';
import LandingPageCSS from "./LandingPage.module.css";
import Logo from "../../public/static/images/logo.png";
import Image from 'next/image'

function LandingPage() {
  
  return <div className={LandingPageCSS.landingPage}>
    <Image src={Logo} alt="welcome to meta-meet.io" className={`${LandingPageCSS.logo} ${LandingPageCSS.animation}`} />
    </div>;
}

export default LandingPage;
