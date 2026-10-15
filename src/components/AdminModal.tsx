import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LogOut,
  Mail,
  FolderGit2,
  Database,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Shield,
  RefreshCw,
  KeyRound,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { api, authStorage } from '../services/api.ts';
import { ContactMessage, Project, DatabaseStatus } from '../types/portfolio.ts';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData: () => void;
  dbStatus?: DatabaseStatus;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onRefreshData,
  dbStatus,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'system'>('messages');

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // New Project Form
  const [newProject, setNewProject] = useState({
    title: '',
    summary: '',
    description: '',
    category: 'fullstack' as Project['category'],
    technologies: 'React, Node.js, Express, MySQL',
    github_url: '',
    live_url: '',
    metrics: '',
    architecture_highlights: '',
    featured: false,
  });
  const [projectSaving, setProjectSaving] = useState(false);
  const [projectSuccess, setProjectSuccess] = useState<string | null>(null);

  // Check initial authentication
  useEffect(() => {
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const checkAuth = async () => {
    const valid = await api.verifyAuth();
    setIsAuthenticated(valid);
    if (valid) {
      loadMessages();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await api.login(username, password);
      setIsAuthenticated(true);
      loadMessages();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    }
  };

  const handleLogout = async () => {
    await api.logout();
    setIsAuthenticated(false);
  };

  const loadMessages = async () => {
    setLoadingMessages(true);
    try {
      const list = await api.getContactMessages();
      setMessages(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleStatusChange = async (id: number, status: ContactMessage['status']) => {
    try {
      await api.updateMessageStatus(id, status);
      setMessages(prev => prev.map(m => (m.id === id ? { ...m, status } : m)));
    } catch (e) {
      alert('Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (e) {
      alert('Failed to delete message');
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectSaving(true);
    setProjectSuccess(null);
    try {
      await api.createProject({
        title: newProject.title,
        slug: newProject.title.toLowerCase().replace(/\s+/g, '-'),
        summary: newProject.summary,
        description: newProject.description,
        category: newProject.category,
        technologies: newProject.technologies.split(',').map(s => s.trim()).filter(Boolean),
        github_url: newProject.github_url,
        live_url: newProject.live_url,
        featured: newProject.featured,
        stars: 0,
        architecture_highlights: newProject.architecture_highlights,
        metrics: newProject.metrics,
      });
      setProjectSuccess('Project created and stored in database successfully!');
      setNewProject({
        title: '',
        summary: '',
        description: '',
        category: 'fullstack',
        technologies: 'React, Node.js, Express, MySQL',
        github_url: '',
        live_url: '',
        metrics: '',
        architecture_highlights: '',
        featured: false,
      });
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to create project');
    } finally {
      setProjectSaving(false);
    }
  };

  const handleResetData = async () => {
    if (!confirm('Reset all portfolio data, projects, and contact messages to default initial seed?')) {
      return;
    }
    try {
      await api.resetDatabase();
      alert('Database successfully reset to initial seed state.');
      onRefreshData();
      loadMessages();
    } catch (e) {
      alert('Failed to reset database');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close admin modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 pr-12">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Portfolio Administration</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                  Protected
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Manage contact submissions, CRUD operations, and database state
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-rose-400 bg-slate-800 hover:bg-slate-800/80 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        {/* Not Authenticated -> Login Form */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-8 space-y-6">
            
            {/* Demo Notice Banner */}
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <KeyRound className="w-4 h-4" />
                <span>Admin Authentication Notice</span>
              </div>
              <p>
                Default credentials for evaluation:
              </p>
              <div className="font-mono bg-slate-950/80 p-2 rounded border border-slate-800 text-slate-200">
                Username: <strong className="text-blue-400">admin</strong> <br />
                Password: <strong className="text-blue-400">admin123</strong>
              </div>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Admin Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/25 transition-all"
              >
                Sign In to Admin Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => {
                  setActiveTab('messages');
                  loadMessages();
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Submissions ({messages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Add New Project</span>
              </button>

              <button
                onClick={() => setActiveTab('system')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'system'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Database & Deployment</span>
              </button>
            </div>

            {/* TAB 1: Messages Inbox */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Showing submissions stored in database</span>
                  <button
                    onClick={loadMessages}
                    className="inline-flex items-center gap-1 hover:text-blue-400"
                  >
                    <RefreshCw className="w-3 h-3" /> Refresh
                  </button>
                </div>

                {loadingMessages ? (
                  <p className="text-xs text-slate-400 py-6 text-center">Loading submissions...</p>
                ) : messages.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                    No contact submissions recorded yet. Use the contact form to submit a test message!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-xl border transition-colors ${
                          msg.status === 'unread'
                            ? 'bg-slate-950 border-blue-500/40 shadow-sm'
                            : 'bg-slate-950/50 border-slate-800'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{msg.name}</span>
                            <span className="text-xs font-mono text-slate-400">
                              &lt;{msg.email}&gt;
                            </span>
                            {msg.status === 'unread' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600 text-white">
                                New
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-500">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                              title="Delete submission"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs font-semibold text-blue-400 mb-1">
                          Subject: {msg.subject}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 mb-3 whitespace-pre-line">
                          {msg.message}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-[11px]">Mark status:</span>
                            {(['unread', 'read', 'replied'] as const).map(s => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(msg.id, s)}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                                  msg.status === s
                                    ? 'bg-blue-600 text-white font-bold'
                                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>

                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                              msg.subject
                            )}`}
                            className="text-xs font-semibold text-blue-400 hover:underline"
                          >
                            Reply via Email →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Create Project */}
            {activeTab === 'projects' && (
              <form onSubmit={handleCreateProject} className="space-y-4">
                {projectSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
                    {projectSuccess}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Project Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Distributed Consensus Engine"
                      value={newProject.title}
                      onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-xs border border-slate-800 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Category *</label>
                    <select
                      value={newProject.category}
                      onChange={e =>
                        setNewProject({ ...newProject, category: e.target.value as any })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-xs border border-slate-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="fullstack">Full Stack</option>
                      <option value="systems">Distributed Systems</option>
                      <option value="ai_tools">AI & Engineering Tools</option>
                      <option value="mobile_web">Mobile / Web</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Summary *</label>
                  <input
                    type="text"
                    placeholder="Brief 1-sentence synopsis"
                    value={newProject.summary}
                    onChange={e => setNewProject({ ...newProject, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-xs border border-slate-800 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Full Description & Engineering Breakdown *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Details about motivation, architecture, data flow, and trade-offs..."
                    value={newProject.description}
                    onChange={e =>
                      setNewProject({ ...newProject, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-xs border border-slate-800 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="Node.js, Express, MySQL, Docker"
                      value={newProject.technologies}
                      onChange={e =>
                        setNewProject({ ...newProject, technologies: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-xs border border-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Key Metric / Result
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5,000 req/sec at <10ms latency"
                      value={newProject.metrics}
                      onChange={e => setNewProject({ ...newProject, metrics: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-xs border border-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">GitHub URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={newProject.github_url}
                      onChange={e =>
                        setNewProject({ ...newProject, github_url: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-xs border border-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Live Demo URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newProject.live_url}
                      onChange={e =>
                        setNewProject({ ...newProject, live_url: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-xs border border-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="feat-chk"
                    checked={newProject.featured}
                    onChange={e =>
                      setNewProject({ ...newProject, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-800"
                  />
                  <label htmlFor="feat-chk" className="text-xs text-slate-300">
                    Feature this project on hero section
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={projectSaving}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  {projectSaving ? 'Saving Project to Database...' : 'Save & Publish Project'}
                </button>
              </form>
            )}

            {/* TAB 3: Database & System */}
            {activeTab === 'system' && (
              <div className="space-y-5 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    <span>Database Architecture Status</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 font-mono">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">Current Storage Engine:</span> <br />
                      <strong className="text-emerald-400">
                        {dbStatus?.mode === 'mysql' ? 'MySQL Database Pool' : 'Embedded Transactional Engine'}
                      </strong>
                    </div>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">MySQL Connection String:</span> <br />
                      <strong className="text-blue-300">
                        {dbStatus?.hasExternalMySQL ? 'Configured (Active)' : 'Not Configured (Auto-Fallback)'}
                      </strong>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed">
                    To connect this applet to an external production MySQL instance (e.g. Amazon RDS, Railway, PlanetScale, or local mysqld), define these variables in your environment or <code className="text-blue-300">.env</code>:
                  </p>

                  <pre className="p-3 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                    MYSQL_HOST=localhost{'\n'}
                    MYSQL_PORT=3306{'\n'}
                    MYSQL_USER=portfolio_user{'\n'}
                    MYSQL_PASSWORD=your_secure_password{'\n'}
                    MYSQL_DATABASE=portfolio_db
                  </pre>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 space-y-2">
                  <h4 className="font-bold text-rose-300 text-sm">
                    Re-seed Baseline Demo Data
                  </h4>
                  <p className="text-slate-400">
                    If you created test records and want to return to the pristine portfolio baseline:
                  </p>
                  <button
                    onClick={handleResetData}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-200 bg-rose-900/60 hover:bg-rose-800 border border-rose-700/60 transition-colors cursor-pointer"
                  >
                    Reset All Data to Default Seed
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
