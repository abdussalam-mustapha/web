import type { Story } from "./types";

/** The seven landing-page stories (story sheets). Order matters: notes reference them by index. */
export const STORIES: Story[] = [
  {
    tag: "Build", t: "From intern to CTO", c: "#ffe66d", p: "#e63946",
    photo: "Add a screenshot of something you built",
    body: [
      "My first role in tech was an internship at TechGen Africa in 2022, and I have kept building ever since.",
      "Frontend and fullstack roles across fintech, restaurant software and Web3 taught me how products behave in the real world, and leading two developers at GetBlack taught me how to build with other people.",
      "Today I am CTO at Port66, where I lead the frontend, backend and smart contracts.",
    ],
    h: "/engineering", go: "Open the engineering stories",
  },
  {
    tag: "Share", t: "Thinking out loud", c: "#ffb3d1", p: "#2a9d8f",
    photo: "Add a photo or screenshot of your content",
    body: [
      "Not everything I know fits in a commit message. Writing and saved links are where I keep the rest.",
      "This is where my notes, bookmarks and the things I share online live.",
    ],
    ph: "Add the story of why you started sharing, and what you want people to take from it.",
    h: "/content", go: "Open the content page",
  },
  {
    tag: "Grow", t: "The people part", c: "#a8f0cf", p: "#e63946",
    photo: "Add a photo from a community event",
    body: [
      "I joined TechGen Africa as an intern in 2022 and was named Best Intern. I also served as Community Lead there, helping grow a community of hundreds through events, workshops and mentorship.",
      "I have served as Technical Lead at OSSGuild and on the core team of the Google Developer Student Club at the University of Ilorin.",
    ],
    ph: "Add a moment you are proudest of.",
    h: "/community", go: "Meet the community",
  },
  {
    tag: "Impact", t: "First lines of HTML", c: "#d2bfff", p: "#f4a261",
    photo: "Add a photo of your learners",
    body: [
      "I run STEMTisha FutureCoders, a program that teaches younger learners HTML and web fundamentals.",
      "I mix design thinking and project management into how I teach, because the goal is not to memorize syntax. It is to learn how to build.",
    ],
    ph: "Add how many learners you have taught and one thing a student built.",
    h: "/teaching", go: "See the teaching page",
  },
  {
    tag: "Play", t: "The part that is not code", c: "#ffc58a", p: "#06a77d",
    photo: "Add a Strava screenshot or a gym photo",
    body: [
      "I love anime, I train at the gym, and I track my walks and workouts on Strava.",
      "They keep me balanced when I am not building.",
    ],
    ph: "Add your favorite series and your Strava link.",
    h: "/fun", go: "Come hang out",
  },
  {
    tag: "Contact", t: "Let us build something", c: "#c5f27a", p: "#7b2cbf",
    photo: "Add a friendly photo of you",
    body: ["Whether you want to build a product, start a community, or learn to code, I would love to hear from you."],
    h: "/about", go: "Get in touch",
  },
  {
    tag: "Mantra", t: "Never miss a lucky day", c: "#ffe66d", p: "#e63946",
    photo: "Add a photo that says lucky day to you",
    body: ["Never miss a lucky day is my personal mantra."],
    ph: "Add the story of where this mantra came from.",
  },
];
