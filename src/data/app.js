
export default {
  name: process.env.APP_NAME || "DevSite",
  locale: process.env.APP_LOCALE || "ar",
  defaultLocale: process.env.APP_FALLBACK_LOCALE || "en"
}