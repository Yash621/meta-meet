import Head from "next/head";
import styles from "../styles/Home.module.css";
import LandingPage from "./LandingPage/LandingPage.tsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MetaMeet.io</title>
        <link rel="icon" href="static/images/title-logo.png" />
      </Head>
      <LandingPage />
    </div>
  );
}
