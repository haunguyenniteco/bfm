const appConfig = require('./config')

module.exports = {
  siteUrl: appConfig.SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/profile', '/orders', '/server-sitemap/products.xml', '/server-sitemap/categories.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${appConfig.SITE_URL}/server-sitemap/products.xml`,
      `${appConfig.SITE_URL}/server-sitemap/categories.xml`,
    ],
  },
}
