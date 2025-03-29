import Head from "next/head"
import { QuestionsContent } from "../../../screens/questions"

function Questions() {
    return (
        <>
            <Head>
                <title>Lectify | Questions</title>
            </Head>
            <QuestionsContent />
        </>
    )
}

export default Questions
