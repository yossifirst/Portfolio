// All site copy lives here. Every number has a source and a date in docs.

const B = import.meta.env.BASE_URL
const img = (name: string) => `${B}images/${name}`

export const links = {
  email: 'firstenbergdan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dan-firstenberg-474865274',
  github: 'https://github.com/danfirsten',
  tedx: 'https://www.youtube.com/watch?v=Kw9ttQ7Smv4',
  halfspace: 'https://danfirsten.github.io/halfspace/',
  spoor: 'https://spoorapp.com',
  hookd: 'https://hookd-ai.com',
  creators: `${B}creators/`,
}

export const hero = {
  eyebrow: 'Software engineer · Seattle',
  name: 'Dan Firstenberg',
  lede:
    "I build products end to end, across mobile, web and AI. By day that's at Alitheon. On nights and weekends it's projects like Spoor, an app that tells you the story of a city as you walk through it.",
  photo: { src: img('tedx.webp'), alt: 'Dan Firstenberg on stage at TEDxUCDavis', w: 1536, h: 1152 },
  caption: ['On stage at TEDxUCDavis, Apr 2025', '“The Equation for Personal Growth”'],
}

export type IntroToken = { word: string } | { img: string; alt: string; tall?: boolean; pos?: string }

const w = (s: string): IntroToken[] => s.split(' ').map((word) => ({ word }))

export const intro: IntroToken[] = [
  ...w("I've worked on software that authenticates physical objects, built AI that spots insects in stored food"),
  { img: img('aivision-booth.webp'), alt: 'The AIVision Food team at a trade show', pos: '66% 40%' },
  ...w('a self-driving race car'),
  { img: img('darc-dan-car.webp'), alt: 'Dan holding the race car', tall: true, pos: '62% 70%' },
  ...w('and an app that narrates a city as you walk it.'),
  { img: img('spoor-walking.webp'), alt: 'Spoor walking screen', tall: true, pos: 'top' },
  ...w('I also help creators grow.'),
  { img: img('dan-john.webp'), alt: 'Dan with John Rusanov', pos: '50% 35%' },
  ...w('Different problems, same approach: learn it properly, then build it well.'),
]

export const alitheon = {
  title: ['Software engineer', 'at Alitheon.'],
  body:
    "Alitheon uses optical AI to identify and authenticate physical objects. I work across the stack on both of the company's customer-facing applications, on mobile and on desktop, picking whatever tools each problem needs.",
  cards: [
    { title: 'Atlas', tag: 'Building', body: 'The company-wide infrastructure that internal AI agents run on.' },
    {
      title: 'Quality',
      tag: 'Across the product',
      body: 'Automated testing and CI, so a release never waits on someone clicking through by hand.',
    },
  ],
}

export const work = [
  {
    id: 'spoor',
    name: 'Spoor',
    note: 'Audio tours that start on their own · 2026',
    kind: 'phones' as const,
    images: [img('spoor-home.webp'), img('spoor-walking.webp')],
    href: '#spoor',
  },
  {
    id: 'halfspace',
    name: 'Halfspace',
    note: 'Scout two Euros in plain English · Live',
    kind: 'image' as const,
    images: [img('halfspace-player.gif')],
    href: '#halfspace',
  },
  {
    id: 'hookd',
    name: 'Hookd AI',
    note: 'Founding engineer · Live',
    kind: 'hookd' as const,
    images: [img('hookd-logo.svg')],
    href: '#hookd',
  },
]

export const hookd = {
  lede: 'An AI studio for YouTube creators. Paste a video link and it makes the thumbnail, then you change it by chatting. I was the founding engineer and built it end to end.',
  meta: [
    ['Role', 'Founding engineer: product, frontend, backend and the AI pipelines'],
    ['Status', 'Live at hookd-ai.com'],
    ['Product', 'Thumbnails, an editing agent, scripts and YouTube tools'],
    ['Stack', 'React · TypeScript · Supabase · Stripe · PostHog'],
  ],
  points: [
    ['Generate from a link.', 'It pulls the video’s current thumbnail and transcript, takes your photos and a description, and returns a 1280×720 thumbnail.'],
    ['Edit by chatting.', 'An agent reads the thumbnail, picks the right tool for the request (face swap, reference edit, smart fill, upscale) and saves each result as a version.'],
    ['Look like yourself.', 'Creators train a model on their own face, so every thumbnail uses it.'],
    ['The video agent.', 'For Hookd 2.0: one prompt in, an edited video out (script, voiceover, scenes, visuals, captions), with progress streamed live and cost capped by credits.'],
  ],
  wins: [
    { src: img('hookd-win-powell.webp'), views: '1.86M', title: '40% of all US dollars were printed in the last 12 months' },
    { src: img('hookd-win-mcafee.webp'), views: '1.81M', title: 'McAfee did not kill himself' },
    { src: img('hookd-win-hormones.webp'), views: '1.42M', title: 'Hormones, fluoride, metals' },
  ],
  winsSource: 'Creator results · views from each video’s YouTube analytics',
  stats: [
    { value: 64, label: 'backend functions' },
    { value: 60, label: 'database migrations' },
    { value: 36, label: 'pages and tools' },
  ],
  statsSource: 'Counted from the codebase, Sept 2026',
  stack: 'React · TypeScript · Vite · Tailwind · Supabase (Postgres, Auth, Storage, Edge Functions) · Stripe · PostHog · GPT-5 · gpt-image-1 · Gemini · Ideogram · Flux',
}

export const spoor = {
  lede: 'Audio tours that start on their own. Put your phone in your pocket and each story begins when you reach the spot.',
  meta: [
    ['Role', 'Solo: product, design, code and the tours themselves'],
    ['Status', 'In TestFlight · waitlist at spoorapp.com'],
    ['Cities', 'Rome now · Florence next'],
    ['Stack', 'Expo · React Native · TypeScript'],
  ],
  constraint:
    "iOS only watches 20 locations per app at a time. Rome's 15 stops and Florence's 18 both fit. For bigger cities the design is written and ready: keep the nearest stops registered and swap them in as you walk.",
  phones: [
    { src: img('spoor-home.webp'), alt: 'Spoor home: walks that start themselves' },
    { src: img('spoor-walking.webp'), alt: 'Spoor walking: listening for the next stop' },
    { src: img('spoor-playing.webp'), alt: 'Spoor now playing at the Pantheon' },
  ],
  steps: [
    ['Pick a walk', 'Everything downloads first, so the walk needs no signal.'],
    ['Pocket the phone', 'It listens for where you are, even with the screen off.'],
    ['Arrive, and listen', 'Reach a stop and its story starts playing on its own.'],
  ],
}

export const aivision = {
  meta: 'ML engineer · Davis, CA · 2024 to 2026',
  lede:
    'SmartProbe sits in stored nuts and grain, photographs the insects it catches and alerts the facility before product is lost. I worked on the model that tells the insects apart, and on running it in production.',
  steps: [
    ['One model instead of many.', 'Replaced a model per species with a single YOLOv8 model that recognises three insect types.'],
    ['Running in production.', 'Packaged with Docker and deployed on AWS Lambda, reading probe images from S3.'],
    ['Finding the slow part.', 'Traced a slow Lambda to images that were never filtered by date, then built the automatic filtering.'],
  ],
  accuracy: { from: 84, to: 96, note: 'Up from 84%, by tuning the model and refining its training data.' },
}

export const coreLab = {
  meta: 'CORE Lab, UC Davis · F1TENTH · 2025',
  lede:
    "In the F1TENTH league, 1/10-scale cars race on real self-driving software. Our four-person team built the vision side of CORE Lab's car: using its camera to map the track, so the planner could work out the fastest line around it.",
  steps: [
    [
      'Maps from the camera.',
      'A semi-automated pipeline that finds the track edges with LangSAM, lines each frame up with where the car was, and stitches them onto the map.',
    ],
    [
      'A CNN that drives.',
      'Trained on camera images, track masks and driving data to predict steering and speed. Red is what the driver did, blue is what the model predicted.',
    ],
    [
      'The tools around it.',
      'Syncing camera and telemetry, a GUI to choose training frames, and overlays to check predictions. Integrated over ROS2 on a Jetson Xavier NX.',
    ],
  ],
  stack: 'LangSAM · TinySAM · TensorFlow · ROS2 · Python · C++ · OpenCV · RealSense D435 · Hokuyo LiDAR',
}

export const halfspace = {
  lede:
    'Search two European Championships the way a scout talks. Every match is cut into phases of play you can filter by how they started and how they ended, then watch back on an animated pitch.',
  points: [
    ['No backend.', 'The whole search runs in the browser with DuckDB-WASM over a 2.9 MB file. Queries land in 46 to 134 ms, and hosting costs nothing.'],
    ['Plain English, safely.', 'An LLM turns your question into a validated query language, never raw SQL, and shows it back as chips you can edit.'],
    ['Find similar.', 'Each phase is a 74-number fingerprint, so one click finds the closest matches. Pinned phases become a shareable scouting report.'],
  ],
  query: 'quick counterattacks by Spain that reached the box',
  chips: ['Counterattack', 'Reached the box', 'Direct speed ≥ 3 m/s', 'Team is Spain'],
  stats: [
    { value: 16782, label: 'phases from 102 matches', format: 'count' as const },
    { value: 46, label: 'fastest query, no server', suffix: ' ms' },
    { value: 0, label: 'to host, nothing to go down', prefix: '$' },
    { value: 433, label: 'tests' },
  ],
  stack: 'Python · Polars · DuckDB · TypeScript · React · DuckDB-WASM · FastAPI · StatsBomb Open Data',
}

export const social = {
  lede:
    "I come up with video concepts, write brand integrations and run growth for creators, including John Rusanov and others. Same habit as the engineering: find what's actually working, then build on it.",
  views: 644,
  viewsNote: 'views on 90 published videos that started as my concepts or brand integrations I wrote.',
  viewsSource: 'Counted Oct 2026 · YouTube 273.0M · TikTok 240.7M · Instagram 94.2M · Facebook 35.6M',
  more: 'See every account, brand and chart',
  client: {
    label: 'Recent engagement',
    body: 'A Western-lifestyle creator. I ran her growth for 30 days; these are the numbers at day 24.',
    stats: [
      ['+164%', 'TikTok views per day'],
      ['2.14M', 'Instagram views in 30 days'],
    ],
  },
  videos: [
    { src: img('john-prom.webp'), views: '73.7M', title: 'A mom picks your prom dress' },
    { src: img('john-box.webp'), views: '44.5M', title: 'Hand on a random box for a prize' },
    { src: img('john-hand.webp'), views: '40.0M', title: 'Last hand on the box keeps it' },
  ],
}

export const path = [
  {
    date: '2024',
    role: 'Creator consultant',
    org: 'John Rusanov and others',
    body: 'Started pitching video ideas to creators. 644M views so far.',
    img: img('dan-john.webp'),
    pos: '50% 38%',
  },
  {
    date: 'Sep 2024',
    role: 'ML engineer',
    org: 'AIVision Food',
    body: 'First production ML: insect detection running on AWS.',
    img: img('aivision-booth.webp'),
    pos: '66% 40%',
  },
  {
    date: 'Jan 2025',
    role: 'Self-driving race car',
    org: 'CORE Lab, UC Davis',
    body: 'Senior design. Gave the car a way to see the track.',
    img: img('darc-dan-car.webp'),
    pos: '60% 40%',
  },
  {
    date: 'Apr 2025',
    role: 'TEDx speaker',
    org: 'TEDxUCDavis',
    body: '“The Equation for Personal Growth.”',
    img: img('tedx.webp'),
    pos: '48% 45%',
    href: links.tedx,
  },
  {
    date: 'Jun 2025',
    role: 'Software intern',
    org: 'Oracle',
    body: 'Built a plain-English way to query databases: 50 to 60% faster. Won the intern Idea-a-thon.',
    img: img('oracle.webp'),
    pos: '50% 62%',
  },
  {
    date: '2026 · Now',
    role: 'Software engineer',
    org: 'Alitheon',
    body: 'Graduated from UC Davis in Computer Science, minor in Statistics.',
    img: img('graduation.webp'),
    pos: '30% 28%',
    now: true,
  },
]

export const community =
  'Ran philanthropy for AEPi: $10K+ raised and 200+ service hours. Received the Presidential Award for community service three times.'
