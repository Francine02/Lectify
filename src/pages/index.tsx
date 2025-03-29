import Head from "next/head"
import { HomeContent } from "../screens/home"

function Home() {
  return (
    <>
      <Head>
        <title>Lectify | Home</title>
      </Head>
      <HomeContent/>
    </>
  )
}

export default Home
