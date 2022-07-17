const CompressionPlugin = require("compression-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
 reactStrictMode: true,
 pageExtensions: ["mdx", "md", "jsx", "js"],
 poweredByHeader: false,
 trailingSlash: false,
 compress: true,
 optimizeCss: true,
 swcMinify: false,
 images: {
  domains: [
   "cdn.discordapp.com", // Discord
   "media.discordapp.net", // Discord
  ],
 },
 async headers() {
  return [
   {
    source: "/(.*)",
    headers: securityHeaders,
   },
  ];
 },
 webpack: (config, { isServer, dev, config: { distDir } }) => {
  if (!isServer && !dev) {
   config.plugins.push(
    new CompressionPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
     "process.env.ASSET_PATH": JSON.stringify("./public/"),
     "process.env.VERSION": JSON.stringify(process.env.npm_package_version),
    })
   ),
    (config.optimization.minimizer = [new TerserPlugin()]);
  }
  return config;
 },
};

const ContentSecurityPolicy = `
default-src 'self' *.googletagmanager.com;
script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
child-src 'self' ;
style-src 'self' 'unsafe-inline' *.googleapis.com *.cloudflare.com;
img-src * blob: data:;
media-src 'none';
connect-src *;
font-src 'self' *.googleapis.com *.gstatic.com;
`;

const securityHeaders = [
 {
  key: "Content-Security-Policy",
  value: ContentSecurityPolicy.replace(/\n/g, ""),
 },
 {
  key: "Referrer-Policy",
  value: "no-referrer",
 },
 {
  key: "X-Content-Type-Options",
  value: "nosniff",
 },
 {
  key: "X-DNS-Prefetch-Control",
  value: "on",
 },
 {
  key: "Strict-Transport-Security",
  value: "max-age=31536000; includeSubDomains; preload",
 },
 {
  key: "Cache-Control",
  value: "public, max-age=31536000",
 },
 {
  key: "X-XSS-Protection",
  value: "1; mode=block",
 },
 {
  key: "Permissions-Policy",
  value: "camera=(), microphone=(), geolocation=()",
 },
];
