module.exports = {
  siteMetadata: {
    title: "FaShop",
    description: "A few clicks is all it takes.",
    author: "AbdulSamad",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          includePaths: ["src/scss"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-webfonts",
      options: {
        fonts: {
          google: [
            {
              family: "Montserrat",
              variants: ["700"],
              fontDisplay: "swap",
            },
            {
              family: "Open Sans",
              variants: ["400", "700"],
              fontDisplay: "swap",
            },
          ],
        },
      },
    },
  ],
};
