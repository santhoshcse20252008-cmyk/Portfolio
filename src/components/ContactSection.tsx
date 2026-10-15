import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Sparkles,
  Loader2,
  Github,
  Linkedin,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Profile } from '../types/portfolio.ts';

interface ContactProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Client validation
  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Subject is required (min 3 characters).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.submitContact(formData);
      setSubmitSuccess(
        `Thank you, ${formData.name}! Your message has been saved in the database (Ref #${response.data?.id || 'OK'}). I will reply via ${formData.email} shortly.`
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFieldErrors({});
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit contact message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>08 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Have an open software engineering role, internship opportunity, technical inquiry, or collaborative project? Send a message directly to my inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Details & Availability */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white">Direct Channels</h3>
              
              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-600/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Email Address</div>
                    <div className="text-slate-200 font-medium group-hover:text-blue-400 transition-colors break-all">
                      {profile.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="p-2.5 rounded-lg bg-emerald-600/10 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Phone / WhatsApp</div>
                    <div className="text-slate-200 font-medium">{profile.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="p-2.5 rounded-lg bg-amber-600/10 text-amber-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Location & Relocation</div>
                    <div className="text-slate-200 font-medium">{profile.location}</div>
                  </div>
                </div>

                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-600 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-slate-800 text-slate-200 group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-mono">GitHub Profile</div>
                    <div className="text-slate-200 font-medium group-hover:text-blue-400 transition-colors truncate">
                      santhoshcse20252008-cmyk
                    </div>
                  </div>
                </a>

                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-600/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-mono">LinkedIn Profile</div>
                    <div className="text-slate-200 font-medium group-hover:text-blue-400 transition-colors truncate">
                      Santhosh S
                    </div>
                  </div>
                </a>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono">
                  <Clock className="w-4 h-4" />
                  <span>Standard Response Time: &lt; 24 Hours</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Every submission is securely validated on the Express backend and persisted in MySQL.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative">
              
              {/* Success Notification */}
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/50 border border-emerald-700/60 text-emerald-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{submitSuccess}</div>
                </div>
              )}

              {/* Error Notification */}
              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/50 border border-rose-700/60 text-rose-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{submitError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={e => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border focus:outline-none transition-colors ${
                        fieldErrors.name
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-rose-400">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={e => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border focus:outline-none transition-colors ${
                        fieldErrors.email
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-400">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-300">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Software Engineer Opportunity / Internship"
                    value={formData.subject}
                    onChange={e => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (fieldErrors.subject) setFieldErrors({ ...fieldErrors, subject: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border focus:outline-none transition-colors ${
                      fieldErrors.subject
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {fieldErrors.subject && (
                    <p className="text-[11px] text-rose-400">{fieldErrors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Describe your project, team opportunity, or discussion points..."
                    value={formData.message}
                    onChange={e => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border focus:outline-none transition-colors resize-y ${
                      fieldErrors.message
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="text-[11px] text-rose-400">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating & Storing in Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
