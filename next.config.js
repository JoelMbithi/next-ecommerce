/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'media.istockphoto.com',
      'localhost',              // for local backend
      'yourdomain.com'          // replace with your real domain in prod
    ],
  },
};

module.exports = nextConfig;
