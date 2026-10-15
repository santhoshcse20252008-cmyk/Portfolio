-- ==============================================================================
-- Full-Stack Personal Portfolio Database Schema
-- Database: MySQL 8.0+
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(150) NOT NULL,
  headline VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(100) NOT NULL,
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  leetcode_url VARCHAR(255),
  resume_url VARCHAR(255),
  cgpa VARCHAR(20) DEFAULT '8.92 / 10',
  college VARCHAR(255) NOT NULL,
  availability_status VARCHAR(150) DEFAULT 'Open for Full-Time Roles & Internships',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category ENUM('languages', 'frontend', 'backend', 'database', 'devops_tools', 'core_cs') NOT NULL,
  proficiency INT NOT NULL CHECK (proficiency BETWEEN 0 AND 100),
  level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') NOT NULL DEFAULT 'Intermediate',
  icon VARCHAR(50) DEFAULT 'Code',
  description VARCHAR(255),
  tags VARCHAR(255),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  summary VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category ENUM('fullstack', 'systems', 'ai_tools', 'mobile_web') NOT NULL DEFAULT 'fullstack',
  technologies JSON NOT NULL,
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  stars INT DEFAULT 0,
  architecture_highlights TEXT,
  metrics VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Education Table
CREATE TABLE IF NOT EXISTS education (
  id INT PRIMARY KEY AUTO_INCREMENT,
  degree VARCHAR(150) NOT NULL,
  department VARCHAR(150) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  location VARCHAR(100) NOT NULL,
  start_year INT NOT NULL,
  end_year INT NOT NULL,
  grade VARCHAR(50) NOT NULL,
  courses JSON,
  highlights JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  issuer VARCHAR(150) NOT NULL,
  issue_date VARCHAR(50) NOT NULL,
  expiry_date VARCHAR(50) DEFAULT 'No Expiration',
  credential_id VARCHAR(100),
  credential_url VARCHAR(255),
  badge_color VARCHAR(50) DEFAULT 'blue',
  skills_covered JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  organization VARCHAR(150) NOT NULL,
  category ENUM('hackathon', 'competitive_coding', 'academic', 'opensource') NOT NULL,
  achievement_date VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  rank_badge VARCHAR(100),
  proof_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('unread', 'read', 'replied', 'archived') DEFAULT 'unread',
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Admin Users Table
CREATE TABLE IF NOT EXISTS admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Indexes for high performance
CREATE INDEX idx_projects_featured ON projects (featured);
CREATE INDEX idx_skills_category ON skills (category);
CREATE INDEX idx_contact_status ON contact_messages (status);
