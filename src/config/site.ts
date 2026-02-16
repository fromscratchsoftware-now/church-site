export const SITE = {
  name: "Church Name",
  brandSuffix: "Ministry",
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
    // Optional hero background video (MP4). Keep empty to use image-only hero.
    heroVideo: "/images/hero.mp4",
    giving: "#",
    facebook: "#",
    instagram: "#",
  },

  nav: [
    { label: "Home", to: "/" },
    { label: "Sermons", to: "/sermons" },
    { label: "Events", to: "/events" },
    { label: "Testimonials", to: "/testimonials" },
  ],

  // When you go live on SiteGround with the PHP API, set this to true and
  // configure /public/api/config.local.php on the server.
  features: {
    useLiveApi: true,
  },
} as const;
