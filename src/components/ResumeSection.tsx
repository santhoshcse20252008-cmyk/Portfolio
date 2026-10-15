import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  ExternalLink,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
} from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface ResumeProps {
  profile: Profile;
}

export const ResumeSection: React.FC<ResumeProps> = ({ profile }) => {
  const [activeResumeTab, setActiveResumeTab] = useState<'preview' | 'text'>('preview');

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40">
              <FileText className="w-3.5 h-3.5" />
              <span>07 // CURRICULUM VITAE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Resume & Career Summary
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              An ATS-optimized curriculum vitae outlining engineering competencies, practical project delivery, and academic record.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
              title="Download or Print PDF Resume"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Request Custom CV</span>
            </a>
          </div>
        </div>

        {/* Clean Printable Resume Sheet */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 max-w-4xl mx-auto">
          
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {profile.name}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-blue-400 mt-0.5">
                {profile.title} | {profile.headline}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {profile.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {profile.location}
              </span>
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-blue-400" />
                <span>github.com/santhoshcse20252008-cmyk</span>
              </a>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>linkedin.com/in/santhosh-s-85b051403</span>
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-blue-400 tracking-wider">
              1. Education
            </h4>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex justify-between items-start">
                <span className="font-bold text-white text-sm">
                  Bachelor of Engineering (B.E.) in Computer Science & Engineering
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  CGPA: {profile.cgpa}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {profile.college} (Batch 2025 - 2029 | 2nd Year)
              </p>
              <p className="text-xs text-slate-300 pt-1">
                Relevant Coursework: Python Programming, Web Development, React.js, MySQL Database Systems, Data Structures & Algorithms, AI Tools, Git & GitHub.
              </p>
            </div>
          </div>

          {/* Core Technical Skills */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-blue-400 tracking-wider">
              2. Technical Competencies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">Programming Languages:</span>
                <p className="text-slate-400 font-mono">Python, JavaScript (ES6+), HTML5, CSS3, SQL</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">Frontend & Web Development:</span>
                <p className="text-slate-400 font-mono">React.js, Web Development, HTML5, CSS3, Responsive Design</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">Backend & Full Stack:</span>
                <p className="text-slate-400 font-mono">Full Stack Development, Node.js, Express.js, REST APIs, MySQL</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200">AI Tools & Version Control:</span>
                <p className="text-slate-400 font-mono">AI Tools, Prompt Engineering, Git and GitHub, VS Code</p>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-blue-400 tracking-wider">
              3. Highlighted Engineering Projects
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-white text-sm">
                    DisQueue: Distributed Task Queue & Worker Engine
                  </span>
                  <span className="text-[11px] font-mono text-blue-400">Node.js, Express, MySQL, Redis</span>
                </div>
                <p className="text-slate-300">
                  Engineered distributed asynchronous job queue with dead-letter queue retries, exponential backoff, and worker heartbeats. Processed 2,500+ tasks/sec with zero task loss during crash simulation tests.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-white text-sm">
                    FinTrack: Real-Time Personal Wealth & Expense Analytics
                  </span>
                  <span className="text-[11px] font-mono text-blue-400">React, Node.js, Express, MySQL</span>
                </div>
                <p className="text-slate-300">
                  Built double-entry financial ledger application with normalized MySQL tables, composite indexing on monthly transaction queries, and automated recurring expense prediction.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications & Honors */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-blue-400 tracking-wider">
              4. Certifications & Achievements
            </h4>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
              <p className="text-slate-300">
                • <strong className="text-white">AWS Certified Cloud Practitioner</strong> (CLF-C02) - Amazon Web Services
              </p>
              <p className="text-slate-300">
                • <strong className="text-white">Meta Front-End Developer Professional Certificate</strong> - Meta (Coursera)
              </p>
              <p className="text-slate-300">
                • <strong className="text-white">Smart India Hackathon (SIH) Participant</strong> - Ministry of Education & AICTE (National Level)
              </p>
              <p className="text-slate-300">
                • <strong className="text-white">LeetCode Knight</strong> - 550+ algorithmic problems solved (Rating: 1894, Top 8% Globally)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
