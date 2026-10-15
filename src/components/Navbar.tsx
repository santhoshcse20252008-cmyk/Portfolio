import React, { useState, useEffect } from 'react';
import {
  Code,
  Terminal,
  Menu,
  X,
  Lock,
  ExternalLink,
  Database,
  User,
  Sparkles,
} from 'lucide-react';
import { DatabaseStatus } from '../types/portfolio.ts';

interface NavbarProps {
  onOpenAdmin: () => void;
  dbStatus?: DatabaseStatus;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, dbStatus, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-slate-100 hover:text-blue-400 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5 text-blue-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight flex items-center gap-1.5">
                Santhosh S
                <span className="text-blue-400 font-mono text-sm">.dev</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-1 tracking-wider uppercase">
                The Kavery Engg College
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/60 rounded-full px-3 py-1.5 shadow-inner">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-blue-600 shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            {/* DB engine badge */}
            <div
              title={
                dbStatus?.mode === 'mysql'
                  ? 'Connected to MySQL Database'
                  : 'Running with Embedded Persistent Storage'
              }
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900/80 border border-slate-800 text-slate-400"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px]">
                {dbStatus?.mode === 'mysql' ? 'MySQL Live' : 'DB Ready'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white border border-slate-700/60 transition-all cursor-pointer"
              title="Open Admin Content Management"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin</span>
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/25 transition-all hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4 text-blue-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Contact Me
              </a>
              <div className="flex items-center justify-between text-xs text-slate-400 px-2 py-1 font-mono">
                <span>Database: {dbStatus?.mode === 'mysql' ? 'MySQL Live' : 'Embedded DB'}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
