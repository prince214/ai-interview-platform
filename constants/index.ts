import { CreateAssistantDTO, CreateWorkflowDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];

export const generator: CreateWorkflowDTO = {
  name: "interview_ai_bot",
  nodes: [
    {
      name: "Node 1",
      type: "conversation",
      isStart: true,
      metadata: {
        position: {
          x: -449.8160050884255,
          y: -351.1322372463883,
        },
      },
      prompt:
        "Introduce yourself as a virtual assistant created by Prince. and tell what you will be doing the whole call session like by saying Lets prepare your interview. I'll ask you a few questions and generate a perfect interview just for you. ",
      model: {
        model: "gpt-4.1-mini",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      voice: {
        model: "aura-2",
        voiceId: "thalia",
        provider: "deepgram",
        chunkPlan: {
          enabled: true,
          formatPlan: {
            enabled: true,
            replacements: [],
            numberToDigitsCutoff: 2025,
          },
          minCharacters: 30,
          punctuationBoundaries: [".", "!", "?", ";"],
        },
        mipOptOut: false,
        cachingEnabled: true,
      },
      variableExtractionPlan: {
        output: [
          {
            enum: ["Frontend", "Backend", "Fullstack", "Design", "UX"],
            type: "string",
            title: "role",
            description:
              "What role would you like to train for? For example, Frontend, Backend, Fullstack, Design, UX",
          },
          {
            enum: ["technical", "behavioral ", "mixed "],
            type: "string",
            title: "type",
            description:
              "Are you aiming for a technical, behavioral or mixed interview?",
          },
          {
            enum: [],
            type: "string",
            title: "amount",
            description:
              "How many questions would you like me to prepare for you ?",
          },
          {
            enum: [],
            type: "string",
            title: "level",
            description: "The job experience level",
          },
          {
            enum: [],
            type: "string",
            title: "techstack",
            description:
              "A list of technologies to cover during the job interview",
          },
        ],
      },
      messagePlan: {
        firstMessage: "Hi {{username}}",
      },
      toolIds: [],
    },
    {
      name: "Confirmation",
      type: "conversation",
      metadata: {
        position: {
          x: -439.72080133921395,
          y: 222.8711327453523,
        },
      },
      prompt:
        "Based on your responses, a customised interview will be generated for you. The interview will be prepared shortly after your confirmation. Please confirm if you want to proceed.",
      model: {
        model: "gpt-4.1-mini",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      voice: {
        model: "aura-2",
        voiceId: "thalia",
        provider: "deepgram",
      },
      messagePlan: {
        firstMessage: "",
      },
      toolIds: [],
    },
    {
      name: "apiRequest_1748153524388",
      type: "apiRequest",
      metadata: {
        position: {
          x: -428.05413467254726,
          y: 584.5377994120189,
        },
      },
      method: "POST",
      url: "https://ai-interview-platform-ecru-eight.vercel.app/api/vapi/generate",
      headers: {
        type: "object",
        properties: {},
      },
      body: {
        type: "object",
        properties: {
          role: {
            type: "string",
            value: "{{ role }}",
            description: "",
          },
          type: {
            type: "string",
            value: "{{ type }}",
            description: "",
          },
          level: {
            type: "string",
            value: "{{ level }}",
            description: "",
          },
          amount: {
            type: "string",
            value: "{{ amount }}",
            description: "",
          },
          userid: {
            type: "string",
            value: "{{ userid }}",
            description: "",
          },
          techstack: {
            type: "string",
            value: "{{ techstack }}",
            description: "",
          },
        },
      },
      output: null,
      mode: "blocking",
    },
    {
      name: "Final Response",
      type: "conversation",
      metadata: {
        position: {
          x: -918.6849598873973,
          y: 916.9461167225228,
        },
      },
      prompt:
        "Say that the interview has been generated, and you can access it in your dashboard. Then thank the user for the call.",
      model: {
        model: "gpt-4.1-mini",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      messagePlan: {
        firstMessage: "",
      },
      toolIds: [],
    },
    {
      name: "hangup_1748153833548",
      type: "hangup",
      metadata: {
        position: {
          x: -351.4430401505664,
          y: 1027.4267048900383,
        },
      },
    },
  ],
  edges: [
    {
      from: "Confirmation",
      to: "apiRequest_1748153524388",
      condition: {
        type: "ai",
        prompt: "if user says yes",
      },
    },
    {
      from: "apiRequest_1748153524388",
      to: "Final Response",
      condition: {
        type: "ai",
        prompt: "",
      },
    },
    {
      from: "Final Response",
      to: "hangup_1748153833548",
      condition: {
        type: "ai",
        prompt: "",
      },
    },
    {
      from: "Node 1",
      to: "Confirmation",
      condition: {
        type: "ai",
        prompt: "user said yes",
      },
    },
  ],
  model: {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a voice assistant helping with creating new AI interviewers. Your task is to collect data from the user. Remember that this is a voice conversation - do not use any special characters.\nUser name is  {{ username }}",
      },
    ],
    provider: "openai",
    temperature: 0.7,
  },
  globalPrompt: "",
};
