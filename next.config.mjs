/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Prevent client-side bundling of server-only modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        "pg-native": false,
      };
    }

    // Mark specific packages as external for client-side
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        postgres: "commonjs postgres",
        pg: "commonjs pg",
        "drizzle-orm": "commonjs drizzle-orm",
      });
    }

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["postgres", "pg", "drizzle-orm"],
  },
  // Configurações de imagem
  images: {
    domains: ["lh3.googleusercontent.com", "graph.facebook.com"],
  },
};

export default nextConfig;
