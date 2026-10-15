import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { db } from './src/server/db.ts';
import {
  validateContactSubmission,
  createSlug,
  verifyPassword,
  sanitizeString,
} from './src/server/validation.ts';

// In-memory admin session storage (tokens -> expiry)
const activeAdminTokens = new Map<string, number>();

function generateToken(): string {
  return 'adm_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication token required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  const expiresAt = activeAdminTokens.get(token);

  if (!expiresAt || expiresAt < Date.now()) {
    if (expiresAt) activeAdminTokens.delete(token);
    res.status(401).json({ success: false, error: 'Session expired or invalid. Please sign in again.' });
    return;
  }

  // Extend token expiry (4 hours)
  activeAdminTokens.set(token, Date.now() + 4 * 60 * 60 * 1000);
  next();
}

export async function createServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Parsers & Security Middlewares
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // Request logger
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
  });

  // -------------------------------------------------------------
  // REST API Routes
  // -------------------------------------------------------------

  // Health check & Database Status
  app.get('/api/health', (req, res) => {
    const status = db.getStatus();
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: status,
    });
  });

  // Auth: Login
  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ success: false, error: 'Username and password are required' });
      return;
    }

    const admin = await db.getAdminUser(username);
    if (!admin) {
      res.status(401).json({ success: false, error: 'Invalid username or password' });
      return;
    }

    const isMatch = verifyPassword(password, admin.password_hash);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid username or password' });
      return;
    }

    const token = generateToken();
    activeAdminTokens.set(token, Date.now() + 4 * 60 * 60 * 1000); // 4 hours

    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });
  });

  // Auth: Verify current token
  app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, authenticated: false });
      return;
    }
    const token = authHeader.split(' ')[1];
    const expiresAt = activeAdminTokens.get(token);
    if (!expiresAt || expiresAt < Date.now()) {
      res.status(401).json({ success: false, authenticated: false });
      return;
    }
    res.json({ success: true, authenticated: true, role: 'admin' });
  });

  // Auth: Logout
  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      activeAdminTokens.delete(token);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Profile: Read
  app.get('/api/profile', async (req, res) => {
    try {
      const profile = await db.getProfile();
      res.json({ success: true, data: profile });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to fetch profile' });
    }
  });

  // Profile: Update (Admin only)
  app.put('/api/profile', requireAdminAuth, async (req, res) => {
    try {
      const updated = await db.updateProfile(req.body);
      res.json({ success: true, data: updated, message: 'Profile updated successfully' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to update profile' });
    }
  });

  // Skills: Read
  app.get('/api/skills', async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const skills = await db.getSkills(category);
      res.json({ success: true, data: skills });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to fetch skills' });
    }
  });

  // Skills: Add (Admin only)
  app.post('/api/skills', requireAdminAuth, async (req, res) => {
    try {
      const { name, category, proficiency, level, icon, description, tags } = req.body;
      if (!name || !category || proficiency === undefined) {
        res.status(400).json({ success: false, error: 'Name, category, and proficiency are required.' });
        return;
      }
      const newSkill = await db.addSkill({
        name: sanitizeString(name),
        category,
        proficiency: Math.min(100, Math.max(0, Number(proficiency))),
        level: level || 'Intermediate',
        icon: icon || 'Code',
        description: sanitizeString(description || ''),
        tags: Array.isArray(tags) ? tags.map(t => sanitizeString(t)) : [],
        sort_order: 0,
      });
      res.status(201).json({ success: true, data: newSkill, message: 'Skill added successfully' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to create skill' });
    }
  });

  // Skills: Delete (Admin only)
  app.delete('/api/skills/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const deleted = await db.deleteSkill(id);
      if (!deleted) {
        res.status(404).json({ success: false, error: 'Skill not found' });
        return;
      }
      res.json({ success: true, message: 'Skill deleted successfully' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to delete skill' });
    }
  });

  // Projects: Read
  app.get('/api/projects', async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const projects = await db.getProjects(category);
      res.json({ success: true, data: projects });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
  });

  // Projects: Read single
  app.get('/api/projects/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      const project = await db.getProjectById(id);
      if (!project) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
      }
      res.json({ success: true, data: project });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to fetch project' });
    }
  });

  // Projects: Create (Admin only)
  app.post('/api/projects', requireAdminAuth, async (req, res) => {
    try {
      const { title, summary, description, category, technologies, github_url, live_url, featured, architecture_highlights, metrics } = req.body;
      if (!title || !summary || !description) {
        res.status(400).json({ success: false, error: 'Title, summary, and description are required.' });
        return;
      }

      const slug = createSlug(title) + '-' + Math.random().toString(36).substring(2, 6);
      const newProject = await db.addProject({
        title: sanitizeString(title),
        slug,
        summary: sanitizeString(summary),
        description: sanitizeString(description),
        category: category || 'fullstack',
        technologies: Array.isArray(technologies) ? technologies.map(t => sanitizeString(t)) : ['TypeScript'],
        github_url: sanitizeString(github_url || ''),
        live_url: sanitizeString(live_url || ''),
        featured: Boolean(featured),
        stars: 0,
        architecture_highlights: sanitizeString(architecture_highlights || ''),
        metrics: sanitizeString(metrics || ''),
      });

      res.status(201).json({ success: true, data: newProject, message: 'Project created successfully' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to create project' });
    }
  });

  // Projects: Update (Admin only)
  app.put('/api/projects/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updated = await db.updateProject(id, req.body);
      if (!updated) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
      }
      res.json({ success: true, data: updated, message: 'Project updated successfully' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to update project' });
    }
  });

  // Projects: Delete (Admin only)
  app.delete('/api/projects/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const deleted = await db.deleteProject(id);
      if (!deleted) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
      }
      res.json({ success: true, message: 'Project deleted successfully' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to delete project' });
    }
  });

  // Projects: Interactive Star
  app.post('/api/projects/:id/star', async (req, res) => {
    try {
      const id = Number(req.params.id);
      const newStars = await db.starProject(id);
      if (newStars === null) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
      }
      res.json({ success: true, stars: newStars });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to star project' });
    }
  });

  // Education: Read
  app.get('/api/education', async (req, res) => {
    try {
      const edu = await db.getEducation();
      res.json({ success: true, data: edu });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to fetch education' });
    }
  });

  // Certifications: Read
  app.get('/api/certifications', async (req, res) => {
    try {
      const certs = await db.getCertifications();
      res.json({ success: true, data: certs });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to fetch certifications' });
    }
  });

  // Achievements: Read
  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = await db.getAchievements();
      res.json({ success: true, data: achievements });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to fetch achievements' });
    }
  });

  // Contact Form: Submit (Public with validation)
  app.post('/api/contact', async (req, res) => {
    try {
      const validation = validateContactSubmission(req.body);
      if (!validation.isValid || !validation.sanitizedData) {
        res.status(400).json({
          success: false,
          error: 'Validation failed. Please review the highlighted form errors.',
          details: validation.errors,
        });
        return;
      }

      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';

      const savedMessage = await db.addContactMessage({
        ...validation.sanitizedData,
        ip_address: clientIp,
      });

      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
        data: {
          id: savedMessage.id,
          createdAt: savedMessage.created_at,
        },
      });
    } catch (e) {
      console.error('Contact submission error:', e);
      res.status(500).json({ success: false, error: 'An unexpected error occurred while saving your message.' });
    }
  });

  // Contact Messages: List (Admin only)
  app.get('/api/contact', requireAdminAuth, async (req, res) => {
    try {
      const messages = await db.getContactMessages();
      res.json({ success: true, data: messages });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to fetch contact messages' });
    }
  });

  // Contact Messages: Update status (Admin only)
  app.patch('/api/contact/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      if (!['unread', 'read', 'replied', 'archived'].includes(status)) {
        res.status(400).json({ success: false, error: 'Invalid message status' });
        return;
      }
      const updated = await db.updateContactMessageStatus(id, status);
      if (!updated) {
        res.status(404).json({ success: false, error: 'Message not found' });
        return;
      }
      res.json({ success: true, message: 'Message status updated' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to update message' });
    }
  });

  // Contact Messages: Delete (Admin only)
  app.delete('/api/contact/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const deleted = await db.deleteContactMessage(id);
      if (!deleted) {
        res.status(404).json({ success: false, error: 'Message not found' });
        return;
      }
      res.json({ success: true, message: 'Message deleted' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to delete message' });
    }
  });

  // Admin: Reset / Re-seed sample data
  app.post('/api/admin/reset', requireAdminAuth, async (req, res) => {
    try {
      await db.resetDefaults();
      res.json({ success: true, message: 'Portfolio data reset to default seed state' });
    } catch (e) {
      res.status(500).json({ success: false, error: 'Failed to reset portfolio data' });
    }
  });

  // -------------------------------------------------------------
  // Frontend Serving (Vite in Dev, Dist static files in Prod)
  // -------------------------------------------------------------
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Application build not found. Please run npm run build.');
      }
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Portfolio Full-Stack Application listening on http://0.0.0.0:${PORT}`);
  });

  return server;
}

// Auto-run when executed directly via tsx/node
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('server.ts')) {
  createServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
