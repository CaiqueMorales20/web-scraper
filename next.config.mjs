/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          net: false,
          dns: false,
          tls: false,
          fs: false,
          child_process: false,
        },
      }
    }

    config.module.exprContextCritical = false // Workaround to suppress next-i18next warning, see https://github.com/isaachinman/next-i18next/issues/1545

    return config
  },
}

export default nextConfig
