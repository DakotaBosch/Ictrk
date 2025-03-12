/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allows builds to complete despite TypeScript errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also ignores ESLint errors during builds
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
