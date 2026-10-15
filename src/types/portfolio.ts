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

export type SkillCategory = 'all' | 'languages' | 'frontend' | 'backend' | 'database' | 'devops_tools' | 'core_cs';

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

export type ProjectCategory = 'all' | 'fullstack' | 'systems' | 'ai_tools' | 'mobile_web';

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

export interface DatabaseStatus {
  mode: 'mysql' | 'embedded';
  connected: boolean;
  hasExternalMySQL: boolean;
  databaseName: string;
  stats: {
    projectsCount: number;
    skillsCount: number;
    certificationsCount: number;
    contactMessagesCount: number;
    unreadMessagesCount: number;
  };
}
