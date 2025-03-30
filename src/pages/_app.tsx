import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import "../style/globals.css"
import { I18nextProvider } from "react-i18next";
import i18next from "../i18n/i18n";
import { QuizProvider } from "../context/QuizContext";
import { AnimatePresence } from "framer-motion";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QuizProvider>
            <I18nextProvider i18n={i18next}>
                <AnimatePresence mode="wait">
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AnimatePresence>
            </I18nextProvider>
        </QuizProvider>
    );
}
