import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  typescript: {
    // we can ignore typescript build errors because we have type aware linting with oxlint
    ignoreBuildErrors: true
  },
}

export default nextConfig
