/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lawyersinnepal.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // if any
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://lawyersinnepal.com/server-sitemap.xml', // if any
    ],
  },
}
