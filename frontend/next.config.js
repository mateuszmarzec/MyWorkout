const { i18n } = require('./next-i18next.config')
const { withGoogleFonts } = require("nextjs-google-fonts");

module.exports = withGoogleFonts({
  reactStrictMode: true,
  i18n,
  googleFonts: {
    fonts: [
      "https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800&display=swap",
    ],
  }
})
