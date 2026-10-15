import React, { useState, useMemo } from 'react';
import {
  Code2,
  Search,
  Filter,
  CheckCircle2,
  Layers,
  Terminal,
  Cpu,
  Database,
  Globe,
  Server,
  Zap,
} from 'lucide-react';
import { Skill, SkillCategory } from '../types/portfolio.ts';

interface SkillsProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: string; value: SkillCategory; icon: React.ReactNode }[] = [
    { label: 'All Skills', value: 'all', icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'Languages', value: 'languages', icon: <Code2 className="w-3.5 h-3.5" /> },
    { label: 'Frontend', value: 'frontend', icon: <Globe className="w-3.5 h-3.5" /> },
    { label: 'Backend', value: 'backend', icon: <Server className="w-3.5 h-3.5" /> },
    { label: 'Databases', value: 'database', icon: <Database className="w-3.5 h-3.5" /> },
    { label: 'DevOps & Tools', value: 'devops_tools', icon: <Terminal className="w-3.5 h-3.5" /> },
    { label: 'Core CS', value: 'core_cs', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  const getLevelBadgeClass = (level: Skill['level']) => {
    switch (level) {
      case 'Expert':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
      case 'Advanced':
        return 'text-blue-400 bg-blue-950/60 border-blue-800/60';
      default:
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60';
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40">
              <Code2 className="w-3.5 h-3.5" />
              <span>02 // TECHNICAL PROFICIENCY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills, Frameworks & Tooling
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              An inventory of programming languages, frontend/backend technologies, database engines, and core computer science fundamentals.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills by keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-900/90 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 scrollbar-none mb-8 border-b border-slate-800/60">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/80'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {isSelected && (
                  <span className="ml-1 px-1.5 py-0.2 bg-blue-500/50 rounded-full text-[10px]">
                    {filteredSkills.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        {filteredSkills.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No skills match "{searchQuery}"</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-blue-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map(skill => (
              <div
                key={skill.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/95 transition-all hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400 capitalize">
                        {skill.category.replace('_', ' ')}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getLevelBadgeClass(
                        skill.level
                      )}`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div>
                  {/* Proficiency Bar */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Competence</span>
                      <span className="text-blue-400 font-semibold">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                    {skill.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
