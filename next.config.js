/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['ar', 'en', 'fr'],
    defaultLocale: process.env.APP_LOCALE ?? process.env.APP_FALLBACK_LOCALE,
    localeDetection: false,
  },
  poweredByHeader: false,
}

module.exports = nextConfig
