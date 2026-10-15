import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { EducationSection } from './components/EducationSection.tsx';
import { CertificationsSection } from './components/CertificationsSection.tsx';
import { AchievementsSection } from './components/AchievementsSection.tsx';
import { ResumeSection } from './components/ResumeSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminModal } from './components/AdminModal.tsx';
import { api } from './services/api.ts';
import {
  Profile,
  Skill,
  Project,
  Education,
  Certification,
  Achievement,
  DatabaseStatus,
} from './types/portfolio.ts';
import { Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | undefined>(undefined);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const fetchData = useCallback(async () => {
    try {
      const [profData, skillsData, projData, eduData, certData, achData, healthData] =
        await Promise.all([
          api.getProfile(),
          api.getSkills(),
          api.getProjects(),
          api.getEducation(),
          api.getCertifications(),
          api.getAchievements(),
          api.getHealth(),
        ]);

      setProfile(profData);
      setSkills(skillsData);
      setProjects(projData);
      setEducation(eduData);
      setCertifications(certData);
      setAchievements(achData);
      setDbStatus(healthData.database);
      setError(null);
    } catch (err: any) {
      console.error('Failed to load portfolio data:', err);
      setError('Could not connect to the backend API. Ensure the server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Track active section for navbar indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'skills',
        'projects',
        'education',
        'certifications',
        'achievements',
        'resume',
        'contact',
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStarProject = async (id: number) => {
    try {
      const newStars = await api.starProject(id);
      setProjects(prev =>
        prev.map(p => (p.id === id ? { ...p, stars: newStars } : p))
      );
    } catch (e) {
      console.error('Failed to star project:', e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-200">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <div className="font-mono text-sm tracking-wide text-slate-400">
          Initializing Portfolio & Database Schema...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-200">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Backend Service Connection Error</h1>
        <p className="text-slate-400 text-sm max-w-md mb-6">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            fetchData();
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-sm transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        dbStatus={dbStatus}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} onStar={handleStarProject} />
        <EducationSection education={education} />
        <CertificationsSection certifications={certifications} />
        <AchievementsSection achievements={achievements} />
        <ResumeSection profile={profile} />
        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Admin Content Management Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onRefreshData={fetchData}
        dbStatus={dbStatus}
      />
    </div>
  );
}
