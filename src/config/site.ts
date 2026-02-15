export const SITE = {
  name: "Church Name",
  tagline: "A place where everyone belongs.",

  address: {
    line1: "1234 Faith Avenue",
    line2: "Atlanta, GA 30301",
  },

  serviceTimes: {
    sunday: "8:00 AM, 10:30 AM, 6:00 PM",
    wednesday: "7:00 PM Bible Study",
  },

  links: {
    website: "https://fromscratchsoftware.com/",
    youtubeLive: "https://www.youtube.com/@YourChurchChannel/live",
    facebook: "#",
    instagram: "#",
  },

  // When you go live on SiteGround with the PHP API, set this to true and
  // configure /public/api/config.local.php on the server.
  features: {
    useLiveApi: true,
  },
} as const;
