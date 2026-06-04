/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lawyerinnepal.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // if any
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://lawyerinnepal.com/server-sitemap.xml', // if any
    ],
  },
}
