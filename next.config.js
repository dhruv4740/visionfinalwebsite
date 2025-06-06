/** @type {import('next').NextConfig} */
const nextConfig = {
  // Update this:
  // experimental: {
  //   serverComponentsExternalPackages: ['sharp'],
  // },
  
  // To this:
  serverExternalPackages: ['sharp'],
}

module.exports = nextConfig