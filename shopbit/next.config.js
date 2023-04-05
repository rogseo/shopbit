/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STORE_ID: "shop-bit",
    SECRET_KEY: "lLmJ0OVMewPdiYmZ9s5iOBEHLHbxMxjW",
    PUBLIC_KEY: "pk_kginZY2nGI2TCevgCw5ZvvitVye5R3Gz",
    ENDPOINT: "https://shop-bit.swell.store/graphql"
  }
}

module.exports = nextConfig
