import React, { useEffect, useState } from "react";
import LandingPageCSS from "./LandingPage.module.css";
import Logo from "../../public/static/images/landing-page-icon.png";
import logo from "../../public/static/images/logo.png";
import Image from "next/image";
import NavBar from "../../components/NavBar/NavBar";

function LandingPage() {
  const [logoAnimation, setLogoAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLogoAnimation(true);
    }, 3000);
  }, []);
  return (
    <div className={LandingPageCSS.landingPage}>
      <NavBar />
      <div className={LandingPageCSS.landingPageContainer}>
        {logoAnimation && (
          <div className={LandingPageCSS.landingPageTagline}>
            <div className={LandingPageCSS.company}>
              <div className={LandingPageCSS.companyName}>MetaMeet.io</div>
              <div className={LandingPageCSS.companyLogo}>
                <Image src={logo} alt="welcome to meta-meet.io" />
              </div>
            </div>
            <div className={LandingPageCSS.tagline}>
              Bring your Offices and Schools to your homes through MetaMeet.io
            </div>
          </div>
        )}
        <div className={`${!logoAnimation && LandingPageCSS.logo} `}>
          <Image src={Logo} alt="welcome to meta-meet.io" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
