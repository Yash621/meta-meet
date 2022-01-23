import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>metameet.io</title>
        <link rel="icon" href="/static/images/meta-meet-logo.jpg" />
      </Head>
      <main className={styles.main}>
          <h1>hello</h1>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
