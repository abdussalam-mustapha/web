import type { Role } from "./types";

type RoleInput = Omit<Role, "c" | "p">;

const RAW: RoleInput[] = [
  {
    t: "Port66", tag: "CTO", d: "Now", tech: ["Next.js", "Solana", "Smart contracts"],
    m: "I lead engineering across the frontend, backend and smart contracts for a luxury collectibles marketplace with on-chain pools.",
    list: [
      "I lead engineering across the whole stack: the frontend, the backend and the smart contracts.",
      "The marketplace sells authenticated luxury fashion, watches and collectibles, with a collector network and a seller dashboard.",
      "Real-world asset pools are tied to one physical piece each and recorded on Solana, with direct USDC purchases.",
    ],
    ph: "Add the numbers: users, listings, transactions.",
    h: "/work/port66", go: "Read the case study",
  },
  {
    t: "LZJ Esoleen Ltd", tag: "Fullstack Engineer", d: "Nov 2025 to Jun 2026", loc: "Remote", tech: ["React.js", "REST APIs"],
    m: "Worked on a restaurant management system used by over 2,000 restaurants in Nigeria. I owned the React frontend modules and helped connect them to the backend.",
    list: [
      "Worked on LZJ's Restaurant Management System, used by over 2,000 restaurants across Nigeria.",
      "The platform handles multi-branch control, live order tracking and financial analytics.",
      "I owned and delivered all the React frontend modules, turning complex restaurant operations into clean, responsive screens for managers.",
      "I worked across the stack to connect the frontend to the backend APIs behind workflows that automate daily restaurant operations.",
    ],
    ph: "Add a result, like time saved or orders handled.",
  },
  {
    t: "Thrifto", tag: "Frontend Engineer", d: "Nov 2025 to Jun 2026", loc: "Lagos", tech: ["React.js"],
    m: "Led all frontend work for a fintech app that helps salary earners and traders save together: dashboards, onboarding and real-time account screens in React.",
    list: [
      "Led all frontend development for a fintech platform that helps salary earners and traders save together and reach their financial goals.",
      "Owned the whole frontend architecture, from implementing designs to deployment.",
      "Built the core modules: savings dashboards, onboarding flows and real-time account management screens, tailored to the Nigerian market.",
    ],
    ph: "Add users or savings goals reached.",
  },
  {
    t: "Andersen Consulting", tag: "Frontend Engineer", d: "Apr to Oct 2025", loc: "Lagos", tech: ["Angular"],
    m: "Built interfaces for a visitor management system in Angular, using modular, clean-architecture patterns inside an agile team.",
    list: [
      "Built responsive, friendly interfaces for a Visitor Management System in Angular.",
      "Improved maintainability and performance through modular design and clean architecture.",
      "Worked in a cross-functional agile team under a lead engineer.",
    ],
  },
  {
    t: "A3get Technologies", tag: "Frontend Engineer", d: "Aug 2024 to Feb 2025", loc: "Lagos", tech: ["React.js", "Next.js"],
    m: "Built client-facing web apps with React and Next.js, turning requirements into responsive, reusable components.",
    list: [
      "Worked with the team lead to design and build client-facing web apps with responsive, polished interfaces.",
      "Kept the code clean with reusable components in React.js and Next.js.",
      "Turned client requirements into performant, scalable solutions.",
    ],
  },
  {
    t: "Centiiv", tag: "Frontend Developer", d: "Jul 2023 to Feb 2024", loc: "Lagos", tech: ["React.js", "Next.js", "Tailwind CSS"],
    m: "One of four developers building the company website and product with React, Next.js and Tailwind CSS.",
    list: [
      "Part of a team of four developers who designed, built and deployed the company's website and product.",
      "Built responsive, high-performance interfaces with a modern workflow.",
      "Stayed adaptable and worked closely with teammates to deliver.",
    ],
  },
  {
    t: "GetBlack", tag: "Fullstack Developer", d: "Nov 2022 to Aug 2023", loc: "Remote", tech: ["React.js", "Node.js", "Express"],
    m: "Led two developers building the company website and internal tools with React, Node.js and Express.",
    list: [
      "Led a team of two developers building the company website and internal tools.",
      "Covered both frontend and backend, with a focus on responsive design, performance and scalability.",
      "Delivered high-quality work under tight deadlines.",
    ],
  },
  {
    t: "Qitmeer Network", tag: "Creative Ambassador", d: "Apr to Jun 2023", loc: "Remote", tech: ["Frontend", "Web3"],
    m: "Built frontend interfaces and Web3 content for a blockchain network, working with marketing and developer relations.",
    list: [
      "Built and maintained frontend interfaces for the network's blockchain-based applications.",
      "Worked with the marketing and developer relations teams on interactive Web3 content.",
      "Helped grow the project's community reach and visibility.",
    ],
  },
  {
    t: "TechGen Africa", tag: "Community Lead", d: "Best Intern, 2022", tech: ["Community", "Mentorship", "Events"],
    m: "Built and led a community of hundreds of tech enthusiasts through events, workshops and mentorship. I started there as an intern.",
    list: [
      "Built and led a community of hundreds of tech enthusiasts.",
      "Organized events, knowledge-sharing sessions and technical workshops, and supported members through mentorship.",
      "I started there as an intern in 2022 (March to November), helping with web development and community activities, and was named Best Intern.",
    ],
    ph: "Add how many events you ran.",
  },
];

const RC = ["#ffe66d", "#ffb3d1", "#a8f0cf", "#d2bfff", "#ffc58a"];
const RP = ["#e63946", "#2a9d8f", "#f4a261", "#7b2cbf", "#06a77d"];

/** Nine roles, newest first. */
export const ROLES: Role[] = RAW.map((r, i) => ({ ...r, c: RC[i % 5], p: RP[i % 5] }));

/** Career timeline: role indexes oldest to newest, with the year label for each. */
export const TIMELINE: { role: number; year: string }[] = [
  { role: 8, year: "2022" },
  { role: 6, year: "2022 to 2023" },
  { role: 7, year: "2023" },
  { role: 5, year: "2023 to 2024" },
  { role: 4, year: "2024 to 2025" },
  { role: 3, year: "2025" },
  { role: 2, year: "2025 to 2026" },
  { role: 1, year: "2025 to 2026" },
  { role: 0, year: "Now" },
];
