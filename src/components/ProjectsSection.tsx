import React, { useState, useMemo } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Star,
  Search,
  Filter,
  X,
  Sparkles,
  Layers,
  ArrowUpRight,
  Info,
  Code2,
  Tag,
} from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { filterProjects } from '../utils/projectFilter.ts';

interface ProjectsProps {
  projects: Project[];
  onStar: (id: number) => void;
}

export const ProjectsSection: React.FC<ProjectsProps> = ({ projects, onStar }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Full Stack', value: 'fullstack' },
    { label: 'Distributed Systems', value: 'systems' },
    { label: 'AI & Engineering Tools', value: 'ai_tools' },
    { label: 'Mobile / Web', value: 'mobile_web' },
  ];

  // Popular tech stacks extracted for quick 1-click filter pills
  const popularTechStacks = [
    'React',
    'Node.js',
    'Express',
    'MySQL',
    'Redis',
    'TypeScript',
    'Docker',
    'WebSockets',
  ];

  const filteredProjects = useMemo(() => {
    return filterProjects(projects, selectedCategory, searchQuery);
  }, [projects, selectedCategory, searchQuery]);

  const handleTechPillClick = (tech: string) => {
    if (searchQuery.toLowerCase() === tech.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(tech);
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03 // FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Software Engineering Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Production-ready web applications, distributed backend services, and algorithmic tools engineered with strong typing and relational data modeling.
          </p>
        </div>

        {/* Dedicated Interactive Search & Filter Controls */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-4">
          
          {/* Main Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-blue-400" />
            </div>

            <input
              type="text"
              aria-label="Search projects by keyword or tech stack"
              placeholder="Search projects by keywords, system architecture, or tech stack (e.g. React, MySQL, Redis, Docker)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 text-sm sm:text-base bg-slate-950 text-slate-100 placeholder:text-slate-500 rounded-xl border border-slate-700/80 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />

            {/* Clear search button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search query"
              >
                <div className="p-1 rounded-full bg-slate-800 hover:bg-slate-700">
                  <X className="w-4 h-4" />
                </div>
              </button>
            )}
          </div>

          {/* Quick Tech Stack Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px] mr-1">
              <Tag className="w-3 h-3 text-blue-400" />
              <span>Quick Tech Filters:</span>
            </span>

            {popularTechStacks.map(tech => {
              const isActive = searchQuery.toLowerCase() === tech.toLowerCase();
              return (
                <button
                  key={tech}
                  onClick={() => handleTechPillClick(tech)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30 border border-blue-500'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {tech}
                </button>
              );
            })}

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] font-mono text-blue-400 hover:underline ml-auto cursor-pointer"
              >
                Reset Search
              </button>
            )}
          </div>

          {/* Category Tabs & Result Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Live Matches Counter */}
            <div className="text-xs font-mono text-slate-400 shrink-0">
              Showing <span className="font-bold text-white">{filteredProjects.length}</span> of {projects.length} projects
              {searchQuery && (
                <span className="text-blue-400 ml-1">
                  for "{searchQuery}"
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <Filter className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              No projects match your search query <span className="text-blue-400">"{searchQuery}"</span> under {selectedCategory === 'all' ? 'all categories' : selectedCategory}. Try another keyword or reset the filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <span>Clear All Search Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10 p-6 overflow-hidden"
              >
                {/* Featured Badge Glow */}
                {project.featured && (
                  <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow-sm">
                    Featured
                  </div>
                )}

                <div>
                  {/* Category tag & Star button */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase font-semibold text-blue-400">
                      {project.category.replace('_', ' ')}
                    </span>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onStar(project.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-amber-300 bg-amber-950/40 border border-amber-800/40 hover:bg-amber-900/50 transition-colors cursor-pointer"
                      title="Star this project"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{project.stars}</span>
                    </button>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1 mb-2">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {project.summary}
                  </p>

                  {/* Metrics Badge */}
                  {project.metrics && (
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-4 text-[11px] font-mono text-emerald-400 line-clamp-1">
                      ⚡ {project.metrics}
                    </div>
                  )}

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech, i) => {
                      const isMatched = searchQuery && tech.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <span
                          key={i}
                          onClick={e => {
                            e.stopPropagation();
                            handleTechPillClick(tech);
                          }}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono border cursor-pointer transition-colors ${
                            isMatched
                              ? 'bg-blue-600/30 text-blue-300 border-blue-500 font-semibold'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Action Links & Modal Trigger */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Deep Dive</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="GitHub Repository"
                        aria-label="View source code on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors"
                        title="Live Demonstration"
                        aria-label="Open live project preview"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStar={id => {
            onStar(id);
            if (selectedProject && selectedProject.id === id) {
              setSelectedProject({
                ...selectedProject,
                stars: selectedProject.stars + 1,
              });
            }
          }}
        />
      </div>
    </section>
  );
};
