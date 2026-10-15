import React, { useState } from 'react';
import {
  Award,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Sparkles,
  Eye,
  X,
} from 'lucide-react';
import { Certification } from '../types/portfolio.ts';

interface CertificationsProps {
  certifications: Certification[];
}

export const CertificationsSection: React.FC<CertificationsProps> = ({ certifications }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certifications" className="py-20 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>05 // CREDENTIALS & LICENSES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry Certifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Formal professional certifications validating expertise in cloud architectures, modern frontend engineering, and object-oriented programming.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map(cert => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-slate-700 transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                {/* Issuer Badge & Date */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-blue-950/70 text-blue-400 border border-blue-800/60">
                    {cert.issuer}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{cert.issue_date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                  {cert.title}
                </h3>

                {/* Credential ID */}
                {cert.credential_id && (
                  <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-400">
                    <span>ID: {cert.credential_id}</span>
                    <button
                      onClick={() => handleCopy(cert.credential_id)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy Credential ID"
                    >
                      {copiedId === cert.credential_id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                {/* Covered Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cert.skills_covered.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setPreviewCert(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>View Certificate</span>
                </button>

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Simulation Modal */}
        {previewCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
              
              <button
                onClick={() => setPreviewCert(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close certificate preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-slate-700 text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />
                
                <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40">
                  <ShieldCheck className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    Certificate of Competency
                  </p>
                  <h3 className="text-2xl font-extrabold text-white">
                    {previewCert.title}
                  </h3>
                  <p className="text-sm font-semibold text-blue-400">
                    Issued by {previewCert.issuer}
                  </p>
                </div>

                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  This formally certifies that Santhosh Kumar has demonstrated proficiency in the curriculum and passed all technical examinations.
                </p>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Issued: {previewCert.issue_date}</span>
                  <span>ID: {previewCert.credential_id}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setPreviewCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
