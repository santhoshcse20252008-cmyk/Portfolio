import React from 'react';
import {
  Trophy,
  Award,
  Calendar,
  ExternalLink,
  Code2,
  GitPullRequest,
  CheckCircle2,
  Medal,
} from 'lucide-react';
import { Achievement } from '../types/portfolio.ts';

interface AchievementsProps {
  achievements: Achievement[];
}

export const AchievementsSection: React.FC<AchievementsProps> = ({ achievements }) => {
  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'hackathon':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'competitive_coding':
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'academic':
        return <Medal className="w-5 h-5 text-emerald-400" />;
      case 'opensource':
        return <GitPullRequest className="w-5 h-5 text-purple-400" />;
      default:
        return <Award className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40">
            <Trophy className="w-3.5 h-3.5" />
            <span>06 // HONORS & RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Achievements & Competitions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            National hackathon titles, competitive programming rankings, and technical symposium awards demonstrating grit and technical execution.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon, Rank Badge & Date */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 group-hover:scale-105 transition-transform">
                    {getCategoryIcon(ach.category)}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {ach.rank_badge && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/70 text-amber-300 border border-amber-800/60 shadow-sm">
                        {ach.rank_badge}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{ach.achievement_date}</span>
                    </div>
                  </div>
                </div>

                {/* Organization & Title */}
                <div className="mb-2">
                  <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
                    {ach.organization}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors mt-0.5">
                    {ach.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {ach.description}
                </p>
              </div>

              {/* Footer link */}
              {ach.proof_link && ach.proof_link !== '#' && (
                <div className="pt-3 border-t border-slate-800/80 flex justify-end">
                  <a
                    href={ach.proof_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>View Recognition / Verification</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
