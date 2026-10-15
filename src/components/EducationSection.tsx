import React from 'react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  CheckCircle,
} from 'lucide-react';
import { Education } from '../types/portfolio.ts';

interface EducationProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationProps> = ({ education }) => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>04 // ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Academic Honors
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Formal undergraduate training in Computer Science and Engineering, foundational mathematics, and algorithmic problem solving.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-8">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800/90 shadow-xl space-y-6 relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400" />

              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {item.degree}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                      {item.grade}
                    </span>
                  </div>
                  <p className="text-base font-semibold text-blue-400">
                    {item.department}
                  </p>
                  <p className="text-sm text-slate-300">
                    {item.institution}
                  </p>
                </div>

                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs font-mono text-slate-400 shrink-0">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.start_year} – {item.end_year}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Coursework Tags */}
              {item.courses && item.courses.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>Key Core Coursework & Theoretical Foundations:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 text-slate-300 border border-slate-800/80 hover:border-slate-700 transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights & Honors */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Academic Highlights & Leadership:</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {item.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
