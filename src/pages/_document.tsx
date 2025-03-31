import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="pt-br">
            <Head>
                <title>Lectify</title>
                <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
                <link rel="shortcut icon" href="/favicon.png" />
                <script async
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE}`}
                    crossOrigin="anonymous"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}