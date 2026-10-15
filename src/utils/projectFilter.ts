export interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: 'fullstack' | 'systems' | 'ai_tools' | 'mobile_web';
  technologies: string[];
  github_url: string;
  live_url: string;
  featured: boolean;
  stars: number;
  architecture_highlights?: string;
  metrics?: string;
}

export type ProjectCategoryFilter = 'all' | 'fullstack' | 'systems' | 'ai_tools' | 'mobile_web';

/**
 * Pure function to filter projects by category and text query (matching title, summary, description, tech stack, and architecture)
 */
export function filterProjects<T extends ProjectItem>(
  projects: T[],
  category: ProjectCategoryFilter,
  query: string
): T[] {
  const trimmed = query.trim().toLowerCase();
  return projects.filter(project => {
    const matchesCategory = category === 'all' || project.category === category;
    if (!matchesCategory) return false;
    if (!trimmed) return true;

    const inTitle = project.title.toLowerCase().includes(trimmed);
    const inSummary = project.summary.toLowerCase().includes(trimmed);
    const inDescription = project.description.toLowerCase().includes(trimmed);
    const inTech = project.technologies.some(tech => tech.toLowerCase().includes(trimmed));
    const inArchitecture = (project.architecture_highlights || '').toLowerCase().includes(trimmed);
    const inMetrics = (project.metrics || '').toLowerCase().includes(trimmed);

    return inTitle || inSummary || inDescription || inTech || inArchitecture || inMetrics;
  });
}
