import React, { useState } from 'react';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Database,
  Cpu,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface HeroProps {
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'system' | 'stats'>('profile');

  const stats = [
    { label: 'Projects Engineered', value: '15+', sub: 'Full-stack & systems' },
    { label: 'LeetCode Solved', value: '550+', sub: 'Knight (1894 rating)' },
    { label: 'Academic CGPA', value: profile.cgpa || '8.92 / 10', sub: 'Top 5% CSE cohort' },
    { label: 'Hackathons', value: '1st Place', sub: 'National SIH Grand Prize' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{profile.availability_status}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <p className="text-sm md:text-base font-mono font-medium text-blue-400 tracking-wide uppercase">
                Hello World, I'm {profile.name}
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Architecting{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  Resilient Systems
                </span>{' '}
                & Modern Web Platforms
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {profile.bio}
            </p>

            {/* Primary Stack Quick Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono text-slate-400 mr-1">Core Skills:</span>
              {['Python', 'React.js', 'JavaScript', 'HTML5 & CSS3', 'Full Stack', 'AI Tools', 'Git & GitHub', 'MySQL'].map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:border-blue-500/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#resume"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white border border-slate-700/80 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>View Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 font-mono">Connect:</span>
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile.leetcode_url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors text-xs font-mono flex items-center gap-1.5"
                aria-label="LeetCode Profile"
              >
                <Code2 className="w-3.5 h-3.5 text-amber-500" />
                <span>LeetCode</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Developer Console / Code Widget */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative borders */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

              <div className="relative rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
                
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">
                      santhosh@tkec-station:~
                    </span>
                  </div>

                  {/* Terminal Tabs */}
                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-md p-0.5 text-[11px] font-mono">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`px-2 py-0.5 rounded ${
                        activeTab === 'profile'
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      profile.json
                    </button>
                    <button
                      onClick={() => setActiveTab('system')}
                      className={`px-2 py-0.5 rounded ${
                        activeTab === 'system'
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      schema.sql
                    </button>
                    <button
                      onClick={() => setActiveTab('stats')}
                      className={`px-2 py-0.5 rounded ${
                        activeTab === 'stats'
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      status.sh
                    </button>
                  </div>
                </div>

                {/* Window Body */}
                <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto min-h-[300px]">
                  {activeTab === 'profile' && (
                    <div className="space-y-1">
                      <p className="text-slate-500">// Personal developer manifesto & configuration</p>
                      <p className="text-blue-300">const <span className="text-amber-300">engineer</span> = &#123;</p>
                      <p className="pl-4 text-slate-300">name: <span className="text-emerald-400">"{profile.name}"</span>,</p>
                      <p className="pl-4 text-slate-300">college: <span className="text-emerald-400">"{profile.college}"</span>,</p>
                      <p className="pl-4 text-slate-300">nativePlace: <span className="text-emerald-400">"Theni, Tamil Nadu"</span>,</p>
                      <p className="pl-4 text-slate-300">degree: <span className="text-emerald-400">"B.E. Computer Science & Engg"</span>,</p>
                      <p className="pl-4 text-slate-300">cgpa: <span className="text-amber-400">"{profile.cgpa}"</span>,</p>
                      <p className="pl-4 text-slate-300">skills: [</p>
                      <p className="pl-8 text-sky-300">"Python", "HTML5", "CSS3",</p>
                      <p className="pl-8 text-sky-300">"JavaScript", "React.js",</p>
                      <p className="pl-8 text-sky-300">"Full Stack Web Development",</p>
                      <p className="pl-8 text-sky-300">"AI Tools & Prompt Engineering",</p>
                      <p className="pl-8 text-sky-300">"Git & GitHub", "MySQL"</p>
                      <p className="pl-4 text-slate-300">],</p>
                      <p className="pl-4 text-slate-300">openToOpportunities: <span className="text-cyan-400">true</span></p>
                      <p className="text-blue-300">&#125;;</p>
                      <p className="text-slate-500 pt-2">// Ready for engineering interviews & technical rounds</p>
                    </div>
                  )}

                  {activeTab === 'system' && (
                    <div className="space-y-1 text-slate-300">
                      <p className="text-slate-500">-- Relational Database Engine Definition (MySQL)</p>
                      <p className="text-cyan-400">CREATE TABLE <span className="text-amber-300">portfolio_projects</span> (</p>
                      <p className="pl-4">id INT PRIMARY KEY AUTO_INCREMENT,</p>
                      <p className="pl-4">title VARCHAR(150) NOT NULL,</p>
                      <p className="pl-4">slug VARCHAR(150) UNIQUE NOT NULL,</p>
                      <p className="pl-4">category ENUM('fullstack', 'systems', 'ai_tools') NOT NULL,</p>
                      <p className="pl-4">technologies JSON NOT NULL,</p>
                      <p className="pl-4">architecture_highlights TEXT,</p>
                      <p className="pl-4">stars INT DEFAULT 0,</p>
                      <p className="pl-4">created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</p>
                      <p className="text-cyan-400">) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;</p>
                      <p className="pt-2 text-slate-500">-- Performance indexing</p>
                      <p className="text-indigo-400">CREATE INDEX idx_proj_category ON portfolio_projects(category);</p>
                    </div>
                  )}

                  {activeTab === 'stats' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>System Health: All Services Operational</span>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 space-y-1 text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Runtime:</span>
                          <span className="text-blue-400">Node.js 22 + TypeScript</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">REST Server:</span>
                          <span className="text-blue-400">Express 4.21 (Clean Router)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Database Layer:</span>
                          <span className="text-emerald-400">MySQL Prepared Statements</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Security:</span>
                          <span className="text-cyan-400">SHA-256 HMAC & Param SQL</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-[11px] pt-1">
                        $ curl -X GET /api/health <span className="text-emerald-400">200 OK</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Terminal Footer */}
                <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>UTF-8</span>
                    <span>•</span>
                    <span>TypeScript 5.x</span>
                  </div>
                  <span>Ln 14, Col 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/30 transition-all hover:-translate-y-1 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-blue-400 transition-colors font-mono">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
