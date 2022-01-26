import Head from "next/head";
import styles from "../styles/Home.module.css";
import LandingPage from "./LandingPage/LandingPage.tsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>metameet.io</title>
        <link rel="icon" href="/static/images/logo.png" />
      </Head>
      <LandingPage />
    </div>
  );
}
