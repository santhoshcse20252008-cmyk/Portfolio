import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, type ProjectItem } from './projectFilter.ts';

const mockProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'DisQueue: Distributed Task Queue',
    slug: 'disqueue',
    summary: 'Background job worker system',
    description: 'Uses Redis and MySQL for atomic queue locking',
    category: 'systems',
    technologies: ['Node.js', 'Express', 'MySQL', 'Redis'],
    github_url: 'https://github.com/example/disqueue',
    live_url: 'https://demo.example.com',
    featured: true,
    stars: 35,
    architecture_highlights: 'Heartbeat worker lease mechanism',
    metrics: '2500 tasks/sec',
  },
  {
    id: 2,
    title: 'FinTrack: Wealth & Expense Analytics',
    slug: 'fintrack',
    summary: 'Full stack ledger tracker',
    description: 'Personal financial dashboard with React and Chart.js',
    category: 'fullstack',
    technologies: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    github_url: 'https://github.com/example/fintrack',
    live_url: 'https://demo.example.com',
    featured: true,
    stars: 42,
    architecture_highlights: 'Composite indexes on transactions',
    metrics: '40ms query execution',
  },
];

test('filterProjects filters by tech stack keyword case-insensitively', () => {
  const redisResults = filterProjects(mockProjects, 'all', 'redis');
  assert.equal(redisResults.length, 1);
  assert.equal(redisResults[0].id, 1);

  const reactResults = filterProjects(mockProjects, 'all', 'REACT');
  assert.equal(reactResults.length, 1);
  assert.equal(reactResults[0].id, 2);

  const mysqlResults = filterProjects(mockProjects, 'all', 'mysql');
  assert.equal(mysqlResults.length, 2);
});

test('filterProjects filters by project title and summary keywords', () => {
  const queueResults = filterProjects(mockProjects, 'all', 'queue');
  assert.equal(queueResults.length, 1);
  assert.equal(queueResults[0].id, 1);

  const ledgerResults = filterProjects(mockProjects, 'all', 'ledger');
  assert.equal(ledgerResults.length, 1);
  assert.equal(ledgerResults[0].id, 2);
});

test('filterProjects respects category filter combined with search query', () => {
  const systemsMysql = filterProjects(mockProjects, 'systems', 'mysql');
  assert.equal(systemsMysql.length, 1);
  assert.equal(systemsMysql[0].id, 1);

  const systemsReact = filterProjects(mockProjects, 'systems', 'react');
  assert.equal(systemsReact.length, 0);
});

test('filterProjects returns empty list when query does not match', () => {
  const noMatch = filterProjects(mockProjects, 'all', 'blockchain');
  assert.equal(noMatch.length, 0);
});
