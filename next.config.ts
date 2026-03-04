import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig

// Required for OpenNext Cloudflare dev mode
import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev())
