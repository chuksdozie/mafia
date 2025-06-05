// next-seo.config.js
const title = "MafiaMaster | Lead. Deceive. Survive.";
const description =
  "Dive into the ultimate social deduction experience. Form alliances, expose the Mafia, or manipulate your way to power. Play online with friends — thrilling, strategic, and always unpredictable.";

export default {
  title,
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mafiagame.devchuks.com",
    title,
    description,
    images: [
      {
        url: "https://ik.imagekit.io/akf2tcskl/DCC/Screenshot%202025-06-05%20at%2013.31.49_dix-NBZbd7.png", // Upload a proper OG banner
        width: 1200,
        height: 630,
        alt: "MafiaMaster | Lead. Deceive. Survive.",
      },
    ],
    site_name: "Mafia Game",
  },
  // twitter: {
  //   handle: "@devchuks_", // Use your actual handle
  //   site: "@devchuks_",
  //   cardType: "summary_large_image",
  // },
};
