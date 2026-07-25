import bundleAnalyzer from "@next/bundle-analyzer"

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ]
  },
  skipTrailingSlashRedirect: true,
  images: { formats: ["image/avif", "image/webp"] },
}

export default withBundleAnalyzer(nextConfig)
