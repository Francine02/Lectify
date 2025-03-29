import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="pt-br">
            <Head>
                <title>Lectify</title>
                <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
                <link rel="icon" type="image/png" href="/assets/logo-rosa.png" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1044585829409035"
                    crossOrigin="anonymous"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}