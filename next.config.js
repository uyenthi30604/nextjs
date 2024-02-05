/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['id.mvpapp.vn'],
    },
    reactStrictMode: false, // fix useEffect run twice
}

module.exports = nextConfig
