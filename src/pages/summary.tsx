import Head from "next/head"
import { Hero } from "../screens/summary"

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
