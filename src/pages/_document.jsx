import { Head, Html, Main, NextScript } from 'next/document'
import { useConfig } from "@/contexts/config";

export default function Document() {

  const state = useConfig()
  const locale = state?.app?.locale || "ar"

  return (
    <Html 
      className="bg-white antialiased" 
      lang={locale ?? 'en'} 
      dir={locale && locale === 'ar' ?'rtl':'ltr'}
    >
      <Head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
