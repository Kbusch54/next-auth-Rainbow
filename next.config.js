
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: config => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      return config;
    },
    env: {
        NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
        NEXT_PUBLIC_SUPABASE: process.env.SUPABASE_KEY,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,

      },
  };
  
  module.exports = nextConfig;