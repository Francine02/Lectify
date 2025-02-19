import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import "../style/globals.css"
import { I18nextProvider } from "react-i18next";
import i18next from "../i18n/i18n";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <I18nextProvider i18n={i18next}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </I18nextProvider>
    );
}
