import React, { useEffect, useState } from 'react';
import LandingPageCSS from "./LandingPage.module.css";
import Logo from "../../public/static/images/logo.png";
import Image from 'next/image'

function LandingPage() {
   
  const [logoAnimation,setLogoAnimation]=useState(false);
  useEffect(() => {
    setTimeout(() => {
        setLogoAnimation(true);
    }, 3000);

  }, []);
  return <div className={LandingPageCSS.landingPage}>
    {logoAnimation && <div className={LandingPageCSS.landingPageTagline}>  <h1>Bring your Offices and Schools to your homes through metameet.io</h1></div>}
    <div className={`${!logoAnimation && LandingPageCSS.logo} `} ><Image src={Logo} alt="welcome to meta-meet.io" /></div>
    </div>;
}

export default LandingPage;
