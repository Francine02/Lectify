import Head from "next/head"
import { Hero } from "../components/home/Hero"

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
