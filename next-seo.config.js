// next-seo.config.js
const title = "BuddyPaid | Effortless Group Expense Tracking";
const description =
  "Split bills and track group expenses instantly — no signup required. Perfect for friends, roommates, trips, and events. Built for transparency and ease.";

export default {
  title,
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buddy.devchuks.com", // Replace with your actual BuddyPaid custom domain
    title,
    description,
    images: [
      {
        url: "https://ik.imagekit.io/akf2tcskl/DCC/DCC%20Banner%20AI_civhHDMi6.webp", // Upload a proper OG banner
        width: 1200,
        height: 630,
        alt: "BuddyPaid – Split Group Bills Easily",
      },
    ],
    site_name: "BuddyPaid",
  },
  // twitter: {
  //   handle: "@devchuks_", // Use your actual handle
  //   site: "@devchuks_",
  //   cardType: "summary_large_image",
  // },
};
