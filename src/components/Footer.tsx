import React from 'react';
import {
  Terminal,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Heart,
  Database,
  Code2,
} from 'lucide-react';
import { Profile } from '../types/portfolio.ts';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Terminal className="w-5 h-5 text-blue-100" />
            </div>
            <div>
              <span className="font-bold text-white text-base">
                {profile.name}
              </span>
              <p className="text-xs text-slate-400 font-mono">
                Computer Science & Engineering Graduate Portfolio
              </p>
            </div>
          </div>

          {/* Social and Quick Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub Profile"
                title="GitHub: santhoshcse20252008-cmyk"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                aria-label="LinkedIn Profile"
                title="LinkedIn: Santhosh S"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                aria-label="Email Me"
                title={`Email: ${profile.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={profile.leetcode_url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                aria-label="LeetCode Profile"
                title="LeetCode Profile"
              >
                <Code2 className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#education" className="hover:text-white transition-colors">Education</a>
              <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
              <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
              <a href="#resume" className="hover:text-white transition-colors">Resume</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom row: Credits and notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} {profile.name}. Designed & Built from scratch.
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Powered by React 19, Express & MySQL</span>
            <span>•</span>
            <span className="text-emerald-400">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
