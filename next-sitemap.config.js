/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lawyerinnepal.com.np',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // if any
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://lawyerinnepal.com.np/server-sitemap.xml', // if any
    ],
  },
}
