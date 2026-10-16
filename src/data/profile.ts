// Everything about you lives here. Edit freely; components read from this file.
// Projects live in /content/projects/*.mdx (one file per project).

export type Experience = {
  role: string;
  org: string;
  location: string;
  dates: string;
  summary: string;
};

export type Education = {
  title: string;
  detail: string;
  dates?: string;
};

export const profile = {
  name: "Mustafa Kanpurwala",
  shortName: "Mustafa",
  tagline:
    "CS student at York University building data-heavy tools that people actually use.",
  intro:
    "I build machine-learning dashboards, operations platforms, and data pipelines with Python, TypeScript, and a healthy respect for the person on the other side of the screen.",
  email: "mkanpurw@my.yorku.ca",
  location: "Mississauga, ON",
  links: {
    github: "https://github.com/MustafaKanpur",
    linkedin: "LINKEDIN_URL_PLACEHOLDER", // TODO: your LinkedIn URL
    resume: "/resume",
  },

  education: [
    {
      title: "BSc Computer Science, York University",
      detail: "Expected graduation",
      dates: "Dec 2027",
    },
    {
      title: "Western University (transferred)",
      detail: "Dean's Honor List across multiple terms",
      dates: "2022 – 2025",
    },
    {
      title: "Provost's Award",
      detail: "Recipient",
    },
  ] satisfies Education[],

  certifications: [
    {
      title: "AWS Certified Developer – Associate",
      detail: "Amazon Web Services",
      dates: "Aug 2024 – Aug 2027",
    },
  ] satisfies Education[],

  skills: {
    Languages: ["Python", "TypeScript", "SQL", "C", "Java"],
    "Frameworks & libraries": ["React", "FastAPI", "XGBoost", "Polars", "Prisma"],
    Tools: ["Git", "GitHub", "Vercel", "AWS", "Power BI", "Jira"],
    "AI & dev tools": ["Claude", "GitHub Copilot", "Cursor"],
    Concepts: ["REST APIs", "OOP", "Agile/Scrum", "Data analysis", "Machine learning"],
  } satisfies Record<string, string[]>,

  experience: [
    {
      role: "Software Developer & Technical Support",
      org: "York University MSA",
      location: "Toronto, ON",
      dates: "Oct 2026 – Present",
      summary:
        "Maintain the MSA website (Next.js, Vercel) including prayer schedules, events, and the online store. Scope features with executives and document systems for a clean handoff between terms.",
    },
    {
      role: "Programs & Events Intern",
      org: "ISNA Canada",
      location: "Mississauga, ON",
      dates: "Jul – Aug 2026",
      summary:
        "Coordinated logistics for community events with 300+ attendees, managing timelines, vendors, and cross-team dependencies.",
    },
    {
      role: "Sales & Marketing Intern (Salesforce/CPQ)",
      org: "BizTBaa Inc",
      location: "Mississauga, ON",
      dates: "Jun – Aug 2025",
      summary:
        "Made 20+ daily cold calls and ran email campaigns to qualify B2B leads. Configured Salesforce fields, workflows, and reports.",
    },
  ] satisfies Experience[],
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
