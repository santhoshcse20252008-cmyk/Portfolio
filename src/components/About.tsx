import React from 'react';
import {
  GraduationCap,
  Layers,
  Cpu,
  Database,
  Target,
  Sparkles,
  Award,
  CheckCircle,
  Compass,
  Code,
} from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface AboutProps {
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      title: 'Full-Stack & Systems Architecture',
      desc: 'Specialized in bridging user interfaces with high-throughput backend services. Comfortable with React state flows, Express routing, and worker concurrency.',
    },
    {
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      title: 'Relational Database Rigor',
      desc: 'Deep understanding of MySQL and PostgreSQL: normalization, transactions (ACID), B+ tree indexing strategies, and query plan profiling.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: 'Core Computer Science Foundations',
      desc: 'Solid grasp of Data Structures & Algorithms, memory models, process scheduling, TCP/IP networking, and object-oriented design patterns.',
    },
    {
      icon: <Target className="w-5 h-5 text-emerald-400" />,
      title: 'Engineering Craft & Reliability',
      desc: 'Committed to write clean, strongly typed TypeScript, unit tests, self-documenting APIs, and automated CI/CD deployment pipelines.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40">
            <Compass className="w-3.5 h-3.5" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering with Passion & Precision
          </h2>
          <p className="text-slate-400 text-base max-w-3xl">
            A comprehensive look at my academic background, technical trajectory, core values, and what drives my pursuit of software craftsmanship.
          </p>
        </div>

        {/* Top Grid: Bio Narrative & Academic Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Detailed Story */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a second-year Computer Science and Engineering undergraduate (Batch 2025 - 2029) at The Kavery Engineering College, Mecheri, Salem, originally from Theni, Tamil Nadu. I am passionate about crafting modern, resilient full-stack web applications and solving real-world challenges through elegant software engineering.
            </p>
            <p>
              My technical expertise spans Python programming, modern React.js component architecture, responsive HTML5/CSS3 and JavaScript, relational database design with MySQL, Express.js REST APIs, AI tools, and version control using Git and GitHub. I am also an active Smart India Hackathon (SIH) participant.
            </p>
            <p>
              Whether I am designing clean relational database schemas, integrating interactive frontend interfaces with fluid animations, or exploring cutting-edge AI developer tools, I approach every project with dedication, technical discipline, and high attention to detail.
            </p>

            {/* Quick check highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {[
                'Full-Stack Web Development (React & Node/Express)',
                'Python Programming & Problem Solving',
                'Relational Database Modeling with MySQL',
                'Smart India Hackathon (SIH) Participant',
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Academic & Personal Specs Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/90 shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Academic Profile</h3>
                  <p className="text-xs text-slate-400">Computer Science & Engineering</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">College</span>
                  <span className="font-semibold text-white text-right max-w-[240px] truncate">{profile.college}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Degree</span>
                  <span className="font-semibold text-slate-200">B.E. Computer Science & Engg</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Academic Standing</span>
                  <span className="font-bold text-emerald-400 font-mono">CGPA {profile.cgpa}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Batch & Year</span>
                  <span className="font-semibold text-slate-200">2025 - 2029 (2nd Year)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Native Place</span>
                  <span className="font-semibold text-slate-200">Theni, Tamil Nadu</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Core Stack</span>
                  <span className="font-semibold text-blue-300">Python, React, Full Stack, AI Tools</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Availability</span>
                  <span className="font-semibold text-emerald-400">Open for Opportunities</span>
                </div>
              </div>

              {/* Career Goal Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/40 border border-blue-800/40 text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-blue-300">
                  <Target className="w-3.5 h-3.5" />
                  <span>Immediate Career Goal</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Seeking a high-impact Software Engineering / Full-Stack Developer role where I can contribute to mission-critical backend systems and deliver exceptional product experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: 4 Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all hover:-translate-y-1 group"
            >
              <div className="p-2.5 w-fit rounded-xl bg-slate-800/70 border border-slate-700/60 mb-4 group-hover:scale-105 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-base text-white mb-2 group-hover:text-blue-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
