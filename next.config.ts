import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  reactCompiler: true,
  typescript: {
    // we can ignore typescript build errors because we have type aware linting with oxlint
    ignoreBuildErrors: true
  }
}

const withNextIntl = createNextIntlPlugin({
  requestConfig: 'src/methods/i18n/request.ts'
})
export default withNextIntl(nextConfig)
