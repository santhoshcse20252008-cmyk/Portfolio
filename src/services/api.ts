import {
  Profile,
  Skill,
  Project,
  Education,
  Certification,
  Achievement,
  ContactMessage,
  DatabaseStatus,
} from '../types/portfolio.ts';

const TOKEN_KEY = 'portfolio_admin_token';

export const authStorage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
};

function getAuthHeaders(): HeadersInit {
  const token = authStorage.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const api = {
  // Health & Database
  async getHealth(): Promise<{ status: string; database: DatabaseStatus }> {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Failed to fetch health status');
    return res.json();
  },

  // Profile
  async getProfile(): Promise<Profile> {
    const res = await fetch('/api/profile');
    const json = await res.json();
    return json.data;
  },

  async updateProfile(data: Partial<Profile>): Promise<Profile> {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update profile');
    return json.data;
  },

  // Skills
  async getSkills(category?: string): Promise<Skill[]> {
    const url = category && category !== 'all' ? `/api/skills?category=${category}` : '/api/skills';
    const res = await fetch(url);
    const json = await res.json();
    return json.data || [];
  },

  async addSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(skill),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to add skill');
    return json.data;
  },

  async deleteSkill(id: number): Promise<void> {
    const res = await fetch(`/api/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Failed to delete skill');
    }
  },

  // Projects
  async getProjects(category?: string): Promise<Project[]> {
    const url = category && category !== 'all' ? `/api/projects?category=${category}` : '/api/projects';
    const res = await fetch(url);
    const json = await res.json();
    return json.data || [];
  },

  async getProject(id: number): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch project');
    return json.data;
  },

  async starProject(id: number): Promise<number> {
    const res = await fetch(`/api/projects/${id}/star`, { method: 'POST' });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to star project');
    return json.stars;
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create project');
    return json.data;
  },

  async updateProject(id: number, data: Partial<Project>): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update project');
    return json.data;
  },

  async deleteProject(id: number): Promise<void> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Failed to delete project');
    }
  },

  // Education, Certifications, Achievements
  async getEducation(): Promise<Education[]> {
    const res = await fetch('/api/education');
    const json = await res.json();
    return json.data || [];
  },

  async getCertifications(): Promise<Certification[]> {
    const res = await fetch('/api/certifications');
    const json = await res.json();
    return json.data || [];
  },

  async getAchievements(): Promise<Achievement[]> {
    const res = await fetch('/api/achievements');
    const json = await res.json();
    return json.data || [];
  },

  // Contact
  async submitContact(data: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string; data?: { id: number; createdAt: string } }> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const errorMsg = json.details ? Object.values(json.details).join(' ') : json.error || 'Submission failed';
      throw new Error(errorMsg);
    }
    return json;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    const res = await fetch('/api/contact', {
      headers: getAuthHeaders(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch messages');
    return json.data || [];
  },

  async updateMessageStatus(id: number, status: 'unread' | 'read' | 'replied' | 'archived'): Promise<void> {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Failed to update message status');
    }
  },

  async deleteMessage(id: number): Promise<void> {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Failed to delete message');
    }
  },

  // Admin Auth
  async login(username: string, password: string): Promise<{ success: boolean; token: string; user: { username: string; role: string } }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Invalid credentials');
    authStorage.setToken(json.token);
    return json;
  },

  async verifyAuth(): Promise<boolean> {
    const token = authStorage.getToken();
    if (!token) return false;
    try {
      const res = await fetch('/api/auth/me', { headers: getAuthHeaders() });
      const json = await res.json();
      return json.authenticated === true;
    } catch {
      return false;
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: getAuthHeaders(),
      });
    } finally {
      authStorage.clearToken();
    }
  },

  // Reset database to initial seed
  async resetDatabase(): Promise<void> {
    const res = await fetch('/api/admin/reset', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Failed to reset database');
    }
  },
};
