import { Html, Head, Main, NextScript } from 'next/document'
import GoogleAdsense from '../components/googleAdsense/GoogleAdsense'

export default function Document() {
    return (
        <Html lang="pt-br">
            <Head>
                <title>Lectify</title>
                <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
            <body>
                <GoogleAdsense pId={process.env.NEXT_PUBLIC_ADSENSE as string} />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}