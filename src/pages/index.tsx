import Head from "next/head"
import { Hero } from "../screens/home"

function Home() {
  return (
    <>
      <Head>
        <title>Lectify | Home</title>
      </Head>
      <Hero />
    </>
  )
}

export default Home
