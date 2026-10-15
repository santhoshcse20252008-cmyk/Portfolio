import React from 'react';
import {
  X,
  ExternalLink,
  Github,
  Star,
  CheckCircle2,
  Database,
  Cpu,
  Layers,
  Activity,
  Code,
} from 'lucide-react';
import { Project } from '../types/portfolio.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onStar: (id: number) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onStar }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-blue-950/80 text-blue-400 border border-blue-800/60 uppercase">
              {project.category.replace('_', ' ')}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/60">
                Featured Engineering Showcase
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-3">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={() => onStar(project.id)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-amber-300 bg-amber-950/40 border border-amber-800/40 hover:bg-amber-900/40 transition-colors cursor-pointer"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{project.stars} Stars</span>
          </button>
        </div>

        {/* Full In-Depth Narrative */}
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Project Overview & Engineering Rationale</span>
          </h3>
          <p>{project.description}</p>
        </div>

        {/* Architecture Highlights & Implementation Details */}
        {project.architecture_highlights && (
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>System Architecture & Concurrency Notes</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              {project.architecture_highlights}
            </p>
          </div>
        )}

        {/* Verified Metrics */}
        {project.metrics && (
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>Performance Benchmarks & Key Results</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-mono">
              {project.metrics}
            </p>
          </div>
        )}

        {/* Tech Stack Breakdown */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Technologies & Frameworks Utilized:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800 border border-slate-700 text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Slug: {project.slug}</span>
          <span>Parametrized MySQL queries</span>
        </div>
      </div>
    </div>
  );
};
