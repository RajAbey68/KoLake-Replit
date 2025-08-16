/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_GROUP_INVITE: process.env.WHATSAPP_GROUP_INVITE,
    NEXT_PUBLIC_MANAGER_E164: process.env.MANAGER_E164,
  },
  serverExternalPackages: ['sharp'],
  experimental: {
    typedRoutes: false,
  },
}

export default nextConfig