import '@/styles/globals.scss'
import { ConfigProvider } from "@/contexts/config";

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp
