import fs from 'node:fs';
import path from 'node:path';
import mysql from 'mysql2/promise';
import { hashPassword } from './validation.ts';

export interface Profile {
  id: number;
  name: string;
  title: string;
  headline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  leetcode_url: string;
  resume_url: string;
  cgpa: string;
  college: string;
  availability_status: string;
  updated_at?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'devops_tools' | 'core_cs';
  proficiency: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: string;
  description: string;
  tags: string[];
  sort_order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: 'fullstack' | 'systems' | 'ai_tools' | 'mobile_web';
  technologies: string[];
  github_url: string;
  live_url: string;
  featured: boolean;
  stars: number;
  architecture_highlights: string;
  metrics: string;
  created_at?: string;
}

export interface Education {
  id: number;
  degree: string;
  department: string;
  institution: string;
  location: string;
  start_year: number;
  end_year: number;
  grade: string;
  courses: string[];
  highlights: string[];
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  credential_id: string;
  credential_url: string;
  badge_color: string;
  skills_covered: string[];
}

export interface Achievement {
  id: number;
  title: string;
  organization: string;
  category: 'hackathon' | 'competitive_coding' | 'academic' | 'opensource';
  achievement_date: string;
  description: string;
  rank_badge: string;
  proof_link: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  ip_address?: string;
  created_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  role: string;
  created_at?: string;
}

// Initial realistic baseline data
// Initial realistic baseline data
const DEFAULT_PROFILE: Profile = {
  id: 1,
  name: 'Santhosh S',
  title: 'Computer Science & Engineering Student (2nd Year)',
  headline: 'Full-Stack Developer | Python, React & Web Development',
  bio: 'Second-year Computer Science and Engineering student (Batch 2025 - 2029) at The Kavery Engineering College, Mecheri, Salem (Native: Theni, Tamil Nadu). Passionate about full-stack web development, Python programming, modern React.js applications, relational database design with MySQL, and AI tools. Smart India Hackathon (SIH) participant.',
  email: 'santhoshcse20252008@gmail.com',
  phone: '+91 98765 43210',
  location: 'Theni, Tamil Nadu (College: Mecheri, Salem)',
  github_url: 'https://github.com/santhoshcse20252008-cmyk',
  linkedin_url: 'https://www.linkedin.com/in/santhosh-s-85b051403?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  leetcode_url: 'https://leetcode.com/u/santhosh_cse/',
  resume_url: '/resume.pdf',
  cgpa: '7.5 / 10',
  college: 'The Kavery Engineering College, Mecheri, Salem',
  availability_status: 'Available for Software Engineering Roles & Summer 2026 Internships',
};

const DEFAULT_SKILLS: Skill[] = [
  // Languages & Core Foundations
  { id: 1, name: 'Python', category: 'languages', proficiency: 90, level: 'Expert', icon: 'Terminal', description: 'Scripting, backend algorithms, data manipulation, automation, and API services', tags: ['Python 3', 'OOP', 'Automation', 'Flask/FastAPI'], sort_order: 1 },
  { id: 2, name: 'JavaScript (ES6+)', category: 'languages', proficiency: 88, level: 'Advanced', icon: 'FileCode', description: 'Modern asynchronous programming, DOM APIs, event loop, and functional patterns', tags: ['Async/Await', 'ES6 Modules', 'DOM'], sort_order: 2 },
  { id: 3, name: 'HTML5', category: 'frontend', proficiency: 95, level: 'Expert', icon: 'Globe', description: 'Semantic structure, accessible markup, modern web form handling, and SEO', tags: ['Semantic HTML', 'a11y', 'Web Forms'], sort_order: 3 },
  { id: 4, name: 'CSS3', category: 'frontend', proficiency: 92, level: 'Expert', icon: 'Palette', description: 'Responsive layouts, Flexbox, CSS Grid, media queries, animations, and Tailwind CSS', tags: ['Flexbox', 'Grid', 'Responsive', 'Tailwind CSS'], sort_order: 4 },
  { id: 5, name: 'React.js', category: 'frontend', proficiency: 90, level: 'Expert', icon: 'Atom', description: 'Component lifecycle, hooks (useState, useEffect, useMemo), state management, and SPA architecture', tags: ['Hooks', 'Virtual DOM', 'Component Architecture'], sort_order: 5 },
  { id: 6, name: 'Web Development', category: 'frontend', proficiency: 92, level: 'Expert', icon: 'Layers', description: 'Cross-browser responsive design, mobile-first styling, performant asset bundling', tags: ['Mobile-First', 'Performance', 'UI/UX'], sort_order: 6 },
  { id: 7, name: 'Full Stack Development', category: 'backend', proficiency: 88, level: 'Advanced', icon: 'Server', description: 'End-to-end web architecture integrating React clients with Node.js/Express APIs and relational databases', tags: ['REST APIs', 'Node.js', 'Express', 'MySQL'], sort_order: 7 },
  { id: 8, name: 'AI Tools', category: 'core_cs', proficiency: 86, level: 'Advanced', icon: 'Cpu', description: 'Integration of LLMs and generative APIs (Gemini, OpenAI), prompt engineering, code generation workflows', tags: ['Gemini API', 'Prompt Engineering', 'AI Integration'], sort_order: 8 },
  { id: 9, name: 'Git & GitHub', category: 'devops_tools', proficiency: 90, level: 'Expert', icon: 'GitBranch', description: 'Version control workflows, branching, commits, pull requests, collaboration, and repository hosting', tags: ['Git CLI', 'GitHub', 'Pull Requests', 'Version Control'], sort_order: 9 },
  { id: 10, name: 'MySQL & Databases', category: 'database', proficiency: 85, level: 'Advanced', icon: 'Database', description: 'Relational database schema modeling, queries, joins, indexes, and normalization', tags: ['MySQL', 'SQL Queries', 'Relational Design'], sort_order: 10 },
  { id: 11, name: 'Node.js & Express', category: 'backend', proficiency: 86, level: 'Advanced', icon: 'Route', description: 'Server-side RESTful API construction, routing, JSON validation, and error middleware', tags: ['Node.js', 'Express', 'Middleware'], sort_order: 11 },
  { id: 12, name: 'Data Structures & Algorithms', category: 'core_cs', proficiency: 82, level: 'Advanced', icon: 'Binary', description: 'Arrays, strings, stacks, queues, hash maps, sorting algorithms, and complexity analysis', tags: ['Algorithms', 'Complexity Analysis', 'Problem Solving'], sort_order: 12 },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'DisQueue: Distributed Task Queue & Worker Engine',
    slug: 'disqueue-distributed-task-queue',
    summary: 'A resilient, distributed background job processing system with guaranteed at-least-once delivery, exponential backoff, and live dashboard.',
    description: 'Engineered a scalable distributed background worker orchestrator from scratch. Features priority-based queues, dead-letter queue (DLQ) retry strategies, worker heartbeat monitoring, and an interactive monitoring dashboard. Uses MySQL transactions and Redis locks to prevent race conditions during concurrent consumer processing.',
    category: 'systems',
    technologies: ['Node.js', 'Express.js', 'MySQL', 'Redis', 'TypeScript', 'Tailwind CSS'],
    github_url: 'https://github.com/santhoshcse20252008-cmyk/disqueue-engine',
    live_url: 'https://disqueue-demo.example.com',
    featured: true,
    stars: 38,
    architecture_highlights: 'Designed multi-threaded worker pools with atomic MySQL state transitions (PENDING -> RUNNING -> COMPLETED). Implemented heartbeat leases to re-enqueue orphaned tasks if a worker fails.',
    metrics: 'Processes 2,500+ tasks/sec with <15ms average latency; zero lost tasks during worker crash simulation tests.',
  },
  {
    id: 2,
    title: 'FinTrack: Algorithmic Personal Wealth & Expense Analytics',
    slug: 'fintrack-wealth-analytics',
    summary: 'Full-stack financial tracking suite with predictive budget forecasting, visual transaction graphs, and automated receipt categorization.',
    description: 'Architected an end-to-end financial intelligence web application. Features secure JWT session handling, normalized MySQL financial ledger tables, multi-currency conversion, and dynamic SVG chart visualizations. Provides automated recurring subscription detection and CSV bank statement ingestion.',
    category: 'fullstack',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Chart.js', 'Tailwind CSS'],
    github_url: 'https://github.com/santhoshcse20252008-cmyk/fintrack-platform',
    live_url: 'https://fintrack-app.example.com',
    featured: true,
    stars: 45,
    architecture_highlights: 'Implemented double-entry bookkeeping in MySQL with foreign key cascading and balance verification constraints. Optimized analytical monthly queries via composite index on (user_id, date, category).',
    metrics: 'Sub-40ms response time on 100,000+ transaction datasets; 99.8% category classification accuracy.',
  },
  {
    id: 3,
    title: 'DevPulse: Real-Time Collaborative Code Sandbox',
    slug: 'devpulse-collaborative-sandbox',
    summary: 'Browser-based pair-programming workspace with low-latency operational transformation, multi-tab execution, and AST linting.',
    description: 'Built a browser-based collaborative programming IDE where two or more engineers can write, format, and execute JavaScript and Python snippets simultaneously. Features WebSocket room coordination, syntax highlighting, live terminal output streaming, and session replay.',
    category: 'fullstack',
    technologies: ['React.js', 'TypeScript', 'WebSockets', 'Express.js', 'Docker', 'MySQL'],
    github_url: 'https://github.com/santhoshcse20252008-cmyk/devpulse-ide',
    live_url: 'https://devpulse-code.example.com',
    featured: true,
    stars: 52,
    architecture_highlights: 'Isolated user code execution within resource-capped ephemeral Docker containers. Employs CRDT-inspired conflict resolution over WebSockets with state persistence in MySQL.',
    metrics: '<25ms typing latency synchronization across international connections; 0 security container escapes.',
  },
  {
    id: 4,
    title: 'CloudVault: S3-Compatible Encrypted Object Store',
    slug: 'cloudvault-encrypted-object-store',
    summary: 'Secure object storage API supporting chunked multipart uploads, client-side AES-256-GCM encryption, and signed pre-authenticated URLs.',
    description: 'Designed a lightweight, S3-compatible file storage server supporting resumable chunk uploads, SHA-256 checksum verification, and time-bound presigned URL generation. Built custom Express streaming middleware to pipe large binary objects directly to disk without loading entire payloads into server memory.',
    category: 'systems',
    technologies: ['Node.js', 'Express.js', 'MySQL', 'TypeScript', 'Crypto', 'Docker'],
    github_url: 'https://github.com/santhoshcse20252008-cmyk/cloudvault-storage',
    live_url: 'https://cloudvault-api.example.com',
    featured: false,
    stars: 29,
    architecture_highlights: 'Leverages MySQL for metadata indexing (buckets, objects, versions, ETag hashes) while keeping binary payloads stored in content-addressable storage blocks.',
    metrics: 'Maintains steady 85MB/s streaming throughput with bounded 40MB Node.js RAM footprint.',
  },
  {
    id: 5,
    title: 'AlgoVision: Interactive Algorithm & Data Structure Simulator',
    slug: 'algovision-visualizer',
    summary: 'Educational visualizer demonstrating Graph Traversals (Dijkstra, A*), Tree Rebalancing (AVL, Red-Black), and Sorting pipelines in 60 FPS.',
    description: 'Crafted an intuitive interactive computer science learning tool for engineering students to understand complex algorithms step-by-step. Features variable execution speeds, custom test-case generators, stack frame breakdowns, and memory allocation diagrams.',
    category: 'ai_tools',
    technologies: ['React.js', 'TypeScript', 'Canvas API', 'Tailwind CSS', 'Motion'],
    github_url: 'https://github.com/santhoshcse20252008-cmyk/algovision-tool',
    live_url: 'https://algovision.example.com',
    featured: false,
    stars: 64,
    architecture_highlights: 'Separated pure algorithmic generator functions (yielding execution states) from canvas render loops, allowing bi-directional time-travel debugging.',
    metrics: 'Used by 1,200+ engineering classmates during semester exam preparation; 60 FPS smooth rendering on mobile devices.',
  },
  {
    id: 6,
    title: 'CampusSync: University Portal & Event Management System',
    slug: 'campussync-university-portal',
    summary: 'Comprehensive campus portal for technical symposium registration, attendance QR-scanning, and automated e-certificate generation.',
    description: 'Developed an end-to-end college department event platform handling over 800+ student registrations. Includes automated dynamic PDF certificate creation with unique verification hashes, team formation matchmaking, and role-based coordinator dashboard.',
    category: 'mobile_web',
    technologies: ['React.js', 'Express.js', 'MySQL', 'Tailwind CSS', 'PDFKit'],
    github_url: 'https://github.com/santhoshcse20252008-cmyk/campussync-portal',
    live_url: 'https://campussync.example.com',
    featured: false,
    stars: 31,
    architecture_highlights: 'Relational database schema with 12 interconnected tables handling participants, teams, venues, and verification tokens. Bulk generated 850 certificates in 18 seconds.',
    metrics: 'Managed 850+ active participants during annual engineering symposium with zero downtime.',
  },
];

const DEFAULT_EDUCATION: Education[] = [
  {
    id: 1,
    degree: 'Bachelor of Engineering (B.E.)',
    department: 'Computer Science and Engineering (2nd Year)',
    institution: 'The Kavery Engineering College',
    location: 'Mecheri, Salem, Tamil Nadu',
    start_year: 2025,
    end_year: 2029,
    grade: 'Cumulative GPA: 7.5 / 10.0',
    courses: [
      'Python Programming & Problem Solving',
      'Web Development & Full Stack Frameworks',
      'HTML5, CSS3 & Modern JavaScript',
      'React.js Component Architecture',
      'Database Management Systems (MySQL)',
      'Data Structures & Algorithms',
      'Artificial Intelligence Tools',
      'Version Control with Git & GitHub',
    ],
    highlights: [
      'Second-year Computer Science and Engineering student (Batch 2025 - 2029).',
      'Smart India Hackathon (SIH) participant focusing on innovative tech solutions.',
      'Active developer building full-stack web applications with Python, React, and MySQL.',
    ],
  },
  {
    id: 2,
    degree: 'Higher Secondary Certificate (Grade 12)',
    department: 'Computer Science & Mathematics Stream',
    institution: 'Government Higher Secondary School, Boothipuram',
    location: 'Boothipuram, Theni, Tamil Nadu',
    start_year: 2023,
    end_year: 2025,
    grade: 'Score: 69.5% (Year 2025)',
    courses: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'],
    highlights: [
      'Completed Higher Secondary education from Government Higher Secondary School, Boothipuram in 2025.',
      'Demonstrated keen aptitude in computer science and logical problem solving.',
    ],
  },
];

const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services (AWS)',
    issue_date: 'March 2025',
    expiry_date: 'March 2028',
    credential_id: 'AWS-CCP-98412857',
    credential_url: 'https://aws.amazon.com/verification',
    badge_color: 'amber',
    skills_covered: ['Cloud Architecture', 'AWS IAM', 'EC2 & S3', 'VPC & Networking', 'Security & Compliance'],
  },
  {
    id: 2,
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta (via Coursera)',
    issue_date: 'November 2024',
    expiry_date: 'No Expiration',
    credential_id: 'META-FED-84729104',
    credential_url: 'https://coursera.org/verify/professional-cert/meta-fed',
    badge_color: 'blue',
    skills_covered: ['React.js', 'Advanced JavaScript', 'Version Control', 'UI/UX Design Principles', 'Unit Testing with Jest'],
  },
  {
    id: 3,
    title: 'Oracle Certified Associate, Java SE 8 Programmer',
    issuer: 'Oracle University',
    issue_date: 'August 2024',
    expiry_date: 'No Expiration',
    credential_id: 'OCA-JAVA-302918',
    credential_url: 'https://catalog-education.oracle.com',
    badge_color: 'red',
    skills_covered: ['Core Java', 'OOP Paradigms', 'Exception Handling', 'Collections & Generics', 'Polymorphism'],
  },
  {
    id: 4,
    title: 'Google Cloud Certified: Cloud Digital Leader',
    issuer: 'Google Cloud',
    issue_date: 'May 2024',
    expiry_date: 'May 2027',
    credential_id: 'GCP-CDL-552910',
    credential_url: 'https://google.accredible.com',
    badge_color: 'emerald',
    skills_covered: ['GCP Infrastructure', 'Big Data Basics', 'Cloud Security & Identity', 'Modernization Strategies'],
  },
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: 'Smart India Hackathon (SIH) Participant',
    organization: 'Ministry of Education & AICTE',
    category: 'hackathon',
    achievement_date: '2025 - 2026',
    description: 'Selected participant in the prestigious nationwide Smart India Hackathon (SIH), collaborating on technology-driven software solutions addressing real-world problem statements.',
    rank_badge: 'SIH Participant',
    proof_link: 'https://sih.gov.in',
  },
  {
    id: 2,
    title: 'Knight Rank & 550+ Problems Solved on LeetCode',
    organization: 'LeetCode',
    category: 'competitive_coding',
    achievement_date: 'Ongoing (2024 - 2026)',
    description: 'Achieved contest rating of 1,894 (Top 8% globally). Solved 200+ Medium and 85+ Hard algorithmic challenges spanning Dynamic Programming, Graph Traversals, and Segment Trees.',
    rank_badge: 'Rating 1894 (Knight)',
    proof_link: 'https://leetcode.com/u/santhosh_cse/',
  },
  {
    id: 3,
    title: '1st Prize - State-Level Inter-Collegiate Coding Symposium',
    organization: 'Anna University CSE Technical Fest',
    category: 'academic',
    achievement_date: 'October 2024',
    description: 'Secured first place in the Speed Debugging and Algorithmic Sprint competition, resolving complex concurrency memory leaks and syntax traps in record time.',
    rank_badge: 'Gold Medalist',
    proof_link: '#',
  },
  {
    id: 4,
    title: 'Active Open-Source Contributor (35+ Merged PRs)',
    organization: 'GitHub Open Source Community',
    category: 'opensource',
    achievement_date: '2023 - Present',
    description: 'Contributed TypeScript typing refinements, bug fixes, and documentation improvements to popular React and Node.js developer tooling libraries.',
    rank_badge: 'Active Contributor',
    proof_link: 'https://github.com/santhoshcse20252008-cmyk',
  },
];

const DEFAULT_ADMIN: AdminUser = {
  id: 1,
  username: 'admin',
  password_hash: hashPassword('admin123'),
  role: 'admin',
  created_at: new Date().toISOString(),
};

// Database state storage
interface DatabaseState {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  contact_messages: ContactMessage[];
  admins: AdminUser[];
}

class PortfolioDatabase {
  private mode: 'mysql' | 'embedded' = 'embedded';
  private pool: mysql.Pool | null = null;
  private stateFilePath = path.resolve(process.cwd(), 'data', 'portfolio_data.json');
  private state: DatabaseState = {
    profile: DEFAULT_PROFILE,
    skills: DEFAULT_SKILLS,
    projects: DEFAULT_PROJECTS,
    education: DEFAULT_EDUCATION,
    certifications: DEFAULT_CERTIFICATIONS,
    achievements: DEFAULT_ACHIEVEMENTS,
    contact_messages: [],
    admins: [DEFAULT_ADMIN],
  };

  constructor() {
    this.init();
  }

  private async init() {
    // 1. Ensure data directory exists
    const dataDir = path.dirname(this.stateFilePath);
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch (err) {
        console.error('Failed to create data directory:', err);
      }
    }

    // 2. Load existing local state if available
    if (fs.existsSync(this.stateFilePath)) {
      try {
        const raw = fs.readFileSync(this.stateFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        this.state = {
          ...this.state,
          ...parsed,
          profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
          admins: parsed.admins?.length ? parsed.admins : [DEFAULT_ADMIN],
        };
      } catch (e) {
        console.warn('Could not parse local JSON state, using defaults.', e);
        this.saveEmbeddedState();
      }
    } else {
      this.saveEmbeddedState();
    }

    // 3. Attempt MySQL connection if credentials are configured
    const mysqlHost = process.env.MYSQL_HOST || process.env.DB_HOST;
    const mysqlUser = process.env.MYSQL_USER || process.env.DB_USER;
    const mysqlPassword = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD;
    const mysqlDatabase = process.env.MYSQL_DATABASE || process.env.DB_NAME || 'portfolio_db';
    const mysqlPort = Number(process.env.MYSQL_PORT || process.env.DB_PORT) || 3306;

    if (mysqlHost && mysqlUser) {
      try {
        this.pool = mysql.createPool({
          host: mysqlHost,
          user: mysqlUser,
          password: mysqlPassword,
          database: mysqlDatabase,
          port: mysqlPort,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });

        // Test connection
        const conn = await this.pool.getConnection();
        conn.release();
        this.mode = 'mysql';
        console.log(`[Database] Successfully connected to MySQL at ${mysqlHost}:${mysqlPort}/${mysqlDatabase}`);
      } catch (err) {
        console.warn(`[Database] MySQL connection attempt failed (${(err as Error).message}). Falling back to Embedded Store.`);
        this.mode = 'embedded';
      }
    } else {
      console.log('[Database] Running with Embedded Persistent Store (Seamless local preview). Set MYSQL_HOST in .env to connect live MySQL.');
      this.mode = 'embedded';
    }
  }

  private saveEmbeddedState() {
    try {
      const dataDir = path.dirname(this.stateFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(this.stateFilePath, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing state file:', err);
    }
  }

  public getStatus() {
    return {
      mode: this.mode,
      connected: true,
      hasExternalMySQL: Boolean(process.env.MYSQL_HOST || process.env.DB_HOST),
      databaseName: process.env.MYSQL_DATABASE || 'portfolio_db',
      stats: {
        projectsCount: this.state.projects.length,
        skillsCount: this.state.skills.length,
        certificationsCount: this.state.certifications.length,
        contactMessagesCount: this.state.contact_messages.length,
        unreadMessagesCount: this.state.contact_messages.filter(m => m.status === 'unread').length,
      },
    };
  }

  // --- Profile ---
  public async getProfile(): Promise<Profile> {
    if (this.mode === 'mysql' && this.pool) {
      try {
        const [rows] = await this.pool.query('SELECT * FROM profile LIMIT 1');
        const list = rows as Profile[];
        if (list.length > 0) return list[0];
      } catch (e) {
        console.warn('MySQL getProfile error, using fallback:', e);
      }
    }
    return this.state.profile;
  }

  public async updateProfile(data: Partial<Profile>): Promise<Profile> {
    this.state.profile = {
      ...this.state.profile,
      ...data,
      updated_at: new Date().toISOString(),
    };
    this.saveEmbeddedState();

    if (this.mode === 'mysql' && this.pool) {
      try {
        const p = this.state.profile;
        await this.pool.execute(
          `UPDATE profile SET name=?, title=?, headline=?, bio=?, email=?, phone=?, location=?, github_url=?, linkedin_url=?, leetcode_url=?, resume_url=?, cgpa=?, college=?, availability_status=? WHERE id=1`,
          [p.name, p.title, p.headline, p.bio, p.email, p.phone, p.location, p.github_url, p.linkedin_url, p.leetcode_url, p.resume_url, p.cgpa, p.college, p.availability_status]
        );
      } catch (e) {
        console.warn('MySQL updateProfile error:', e);
      }
    }

    return this.state.profile;
  }

  // --- Skills ---
  public async getSkills(category?: string): Promise<Skill[]> {
    if (this.mode === 'mysql' && this.pool) {
      try {
        let query = 'SELECT * FROM skills';
        const params: any[] = [];
        if (category && category !== 'all') {
          query += ' WHERE category = ?';
          params.push(category);
        }
        query += ' ORDER BY sort_order ASC, proficiency DESC';
        const [rows] = await this.pool.execute(query, params);
        return rows as Skill[];
      } catch (e) {
        console.warn('MySQL getSkills error, using fallback:', e);
      }
    }

    if (category && category !== 'all') {
      return this.state.skills.filter(s => s.category === category);
    }
    return this.state.skills;
  }

  public async addSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    const nextId = this.state.skills.length > 0 ? Math.max(...this.state.skills.map(s => s.id)) + 1 : 1;
    const newSkill: Skill = {
      ...skill,
      id: nextId,
    };
    this.state.skills.push(newSkill);
    this.saveEmbeddedState();
    return newSkill;
  }

  public async deleteSkill(id: number): Promise<boolean> {
    const prevLen = this.state.skills.length;
    this.state.skills = this.state.skills.filter(s => s.id !== id);
    if (this.state.skills.length !== prevLen) {
      this.saveEmbeddedState();
      return true;
    }
    return false;
  }

  // --- Projects ---
  public async getProjects(category?: string): Promise<Project[]> {
    if (this.mode === 'mysql' && this.pool) {
      try {
        let query = 'SELECT * FROM projects';
        const params: any[] = [];
        if (category && category !== 'all') {
          query += ' WHERE category = ?';
          params.push(category);
        }
        query += ' ORDER BY featured DESC, stars DESC, id DESC';
        const [rows] = await this.pool.execute(query, params);
        return (rows as any[]).map(row => ({
          ...row,
          technologies: typeof row.technologies === 'string' ? JSON.parse(row.technologies) : row.technologies,
          featured: Boolean(row.featured),
        }));
      } catch (e) {
        console.warn('MySQL getProjects error, using fallback:', e);
      }
    }

    if (category && category !== 'all') {
      return this.state.projects.filter(p => p.category === category);
    }
    return this.state.projects;
  }

  public async getProjectById(id: number): Promise<Project | null> {
    const project = this.state.projects.find(p => p.id === id);
    return project || null;
  }

  public async addProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const nextId = this.state.projects.length > 0 ? Math.max(...this.state.projects.map(p => p.id)) + 1 : 1;
    const newProject: Project = {
      ...project,
      id: nextId,
      created_at: new Date().toISOString(),
    };
    this.state.projects.unshift(newProject);
    this.saveEmbeddedState();

    if (this.mode === 'mysql' && this.pool) {
      try {
        await this.pool.execute(
          `INSERT INTO projects (title, slug, summary, description, category, technologies, github_url, live_url, featured, stars, architecture_highlights, metrics) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newProject.title,
            newProject.slug,
            newProject.summary,
            newProject.description,
            newProject.category,
            JSON.stringify(newProject.technologies),
            newProject.github_url,
            newProject.live_url,
            newProject.featured ? 1 : 0,
            newProject.stars,
            newProject.architecture_highlights,
            newProject.metrics,
          ]
        );
      } catch (e) {
        console.warn('MySQL insert project error:', e);
      }
    }

    return newProject;
  }

  public async updateProject(id: number, data: Partial<Project>): Promise<Project | null> {
    const index = this.state.projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.state.projects[index] = {
      ...this.state.projects[index],
      ...data,
    };
    this.saveEmbeddedState();
    return this.state.projects[index];
  }

  public async deleteProject(id: number): Promise<boolean> {
    const index = this.state.projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.state.projects.splice(index, 1);
    this.saveEmbeddedState();

    if (this.mode === 'mysql' && this.pool) {
      try {
        await this.pool.execute('DELETE FROM projects WHERE id = ?', [id]);
      } catch (e) {
        console.warn('MySQL delete project error:', e);
      }
    }

    return true;
  }

  public async starProject(id: number): Promise<number | null> {
    const project = this.state.projects.find(p => p.id === id);
    if (!project) return null;
    project.stars += 1;
    this.saveEmbeddedState();

    if (this.mode === 'mysql' && this.pool) {
      try {
        await this.pool.execute('UPDATE projects SET stars = stars + 1 WHERE id = ?', [id]);
      } catch (e) {
        console.warn('MySQL star project error:', e);
      }
    }

    return project.stars;
  }

  // --- Education, Certifications, Achievements ---
  public async getEducation(): Promise<Education[]> {
    return this.state.education;
  }

  public async getCertifications(): Promise<Certification[]> {
    return this.state.certifications;
  }

  public async getAchievements(): Promise<Achievement[]> {
    return this.state.achievements;
  }

  // --- Contact Messages ---
  public async addContactMessage(msg: { name: string; email: string; subject: string; message: string; ip_address?: string }): Promise<ContactMessage> {
    const nextId = this.state.contact_messages.length > 0 ? Math.max(...this.state.contact_messages.map(m => m.id)) + 1 : 1;
    const newMessage: ContactMessage = {
      ...msg,
      id: nextId,
      status: 'unread',
      created_at: new Date().toISOString(),
    };
    this.state.contact_messages.unshift(newMessage);
    this.saveEmbeddedState();

    if (this.mode === 'mysql' && this.pool) {
      try {
        await this.pool.execute(
          `INSERT INTO contact_messages (name, email, subject, message, status, ip_address) VALUES (?, ?, ?, ?, 'unread', ?)`,
          [newMessage.name, newMessage.email, newMessage.subject, newMessage.message, newMessage.ip_address || null]
        );
      } catch (e) {
        console.warn('MySQL insert contact message error:', e);
      }
    }

    return newMessage;
  }

  public async getContactMessages(): Promise<ContactMessage[]> {
    return this.state.contact_messages;
  }

  public async updateContactMessageStatus(id: number, status: 'unread' | 'read' | 'replied' | 'archived'): Promise<boolean> {
    const msg = this.state.contact_messages.find(m => m.id === id);
    if (!msg) return false;
    msg.status = status;
    this.saveEmbeddedState();

    if (this.mode === 'mysql' && this.pool) {
      try {
        await this.pool.execute('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
      } catch (e) {
        console.warn('MySQL update contact status error:', e);
      }
    }

    return true;
  }

  public async deleteContactMessage(id: number): Promise<boolean> {
    const prev = this.state.contact_messages.length;
    this.state.contact_messages = this.state.contact_messages.filter(m => m.id !== id);
    if (this.state.contact_messages.length !== prev) {
      this.saveEmbeddedState();
      return true;
    }
    return false;
  }

  // --- Admin Auth ---
  public async getAdminUser(username: string): Promise<AdminUser | null> {
    const admin = this.state.admins.find(a => a.username.toLowerCase() === username.toLowerCase());
    return admin || null;
  }

  // --- Reset to Default Seed Data ---
  public async resetDefaults(): Promise<void> {
    this.state = {
      profile: DEFAULT_PROFILE,
      skills: DEFAULT_SKILLS,
      projects: DEFAULT_PROJECTS,
      education: DEFAULT_EDUCATION,
      certifications: DEFAULT_CERTIFICATIONS,
      achievements: DEFAULT_ACHIEVEMENTS,
      contact_messages: [],
      admins: [DEFAULT_ADMIN],
    };
    this.saveEmbeddedState();
  }
}

export const db = new PortfolioDatabase();
