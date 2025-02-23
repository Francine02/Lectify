import Head from "next/head"
import { Hero } from "../components/summary/Hero"

function Summary() {
    return (
        <>
            <Head>
                <title>Lectify | Summary</title>
            </Head>
            <Hero />
        </>
    )
}

export default Summary
