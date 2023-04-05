/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STORE_ID: "shop-bit",
    SECRET_KEY: "lLmJ0OVMewPdiYmZ9s5iOBEHLHbxMxjW",
    PUBLIC_KEY: "pk_7egaQNP59Kaa5bEKx4cDq3Tx5UjWQTJ4",
    ENDPOINT: "https://shop-bit.swell.store/graphql"
  }
}

module.exports = nextConfig
