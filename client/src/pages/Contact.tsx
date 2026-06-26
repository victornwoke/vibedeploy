// VibeDeploy Contact / Book Audit Page
// Design: Dark DevOps Command Centre

import { useState } from "react";
import { useForm } from "@formspree/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import {
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Shield,
  Clock,
  MessageSquare,
} from "lucide-react";

const SERVICES_OPTIONS = [
  { value: "audit", label: "£99 — Production Readiness Audit" },
  { value: "fix", label: "£500 — Production Launch Fix" },
  { value: "mvp", label: "£1,500+ — Full MVP Production Setup" },
  { value: "care", label: "£500–£1k/mo — DevOps Care Plan" },
  { value: "unsure", label: "Not sure yet — I need guidance" },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  appUrl: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    appUrl: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const mailtoBody = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\nApp URL: ${form.appUrl}\n\nMessage:\n${form.message}`
  );
  // Use the designated recipient for MVP static flow
  const RECIPIENT_EMAIL = "victornwoke147@outlook.com";
  const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=VibeDeploy%20Enquiry&body=${mailtoBody}`;

  // Formspree integration: read public form ID or full endpoint from environment
  const rawFormspree = import.meta.env.VITE_FORMSPREE_CONTACT_FORM_ID as string | undefined;
  // Accept either 'xojoebyg' or full 'https://formspree.io/f/xojoebyg'
  const formspreeId = rawFormspree
    ? rawFormspree.includes("/f/")
      ? rawFormspree.split("/f/").pop() || rawFormspree
      : rawFormspree
    : undefined;

  // Always call the hook with a string - pass empty string if missing
  const [state, formspreeSubmit] = useForm(formspreeId ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // If Formspree ID not configured, fallback to mailto behaviour
    if (!formspreeId) {
      window.location.href = mailtoLink;
      return;
    }

    // Submit to Formspree using the hook-provided submit handler
    // The hook expects the React form event to be forwarded
    await formspreeSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  }

  return (
    <div style={{ backgroundColor: "var(--vd-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "var(--vd-bg)" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: form */}
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "rgba(124, 58, 237, 0.12)",
                    border: "1px solid rgba(124, 58, 237, 0.25)",
                    color: "#A855F7",
                  }}
                >
                  Book a Service
                </div>
                <h1
                  className="font-bold mb-3"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--vd-heading)" }}
                >
                  Let's get your app production-ready.
                </h1>
                <p className="mb-8 leading-relaxed" style={{ color: "var(--vd-muted)", fontSize: "0.9375rem" }}>
                  Fill in the details below and click "Send Message" to open your email client with a prefilled message.
                  Victor will respond within 24 hours on business days.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
                        style={{ color: "var(--vd-faint)" }}
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                        style={{
                          background: "var(--vd-button-bg)",
                          border: "1px solid var(--vd-border)",
                          color: "var(--vd-heading)",
                        }}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
                        style={{ color: "var(--vd-faint)" }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                        style={{
                          background: "var(--vd-button-bg)",
                          border: "1px solid var(--vd-border)",
                          color: "var(--vd-heading)",
                        }}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
                      style={{ color: "var(--vd-faint)" }}
                    >
                      Service Interested In *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] appearance-none"
                      style={{
                        background: "var(--vd-button-bg)",
                        border: "1px solid var(--vd-border)",
                        color: form.subject ? "var(--vd-heading)" : "var(--vd-faint)",
                      }}
                    >
                      <option value="" disabled style={{ background: "#1E1B4B", color: "var(--vd-heading)" }}>
                        Select a service...
                      </option>
                      {SERVICES_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.label} style={{ background: "#1E1B4B", color: "var(--vd-heading)" }}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* App URL */}
                  <div>
                    <label
                      htmlFor="appUrl"
                      className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
                      style={{ color: "var(--vd-faint)" }}
                    >
                      Your App URL (Optional)
                    </label>
                    <input
                      id="appUrl"
                      name="appUrl"
                      type="url"
                      value={form.appUrl}
                      onChange={handleChange}
                      placeholder="https://myapp.com"
                      className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      style={{
                        background: "var(--vd-button-bg)",
                        border: "1px solid var(--vd-border)",
                        color: "var(--vd-heading)",
                      }}
                      autoComplete="url"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
                      style={{ color: "var(--vd-faint)" }}
                    >
                      Tell Victor About Your App *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What did you build? What AI tool did you use? What are you most worried about?"
                      className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] resize-none"
                      style={{
                        background: "var(--vd-button-bg)",
                        border: "1px solid var(--vd-border)",
                        color: "var(--vd-heading)",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      !form.name || !form.email || !form.subject || !form.message || !formspreeId
                    }
                    className="w-full px-6 py-3.5 text-sm font-semibold text-white rounded-xl btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Send Message
                    <ArrowRight size={15} className="inline ml-2" />
                  </button>

                  <p className="text-xs text-center" style={{ color: "var(--vd-faint)" }}>
                    {formspreeId ? (
                      "This form is submitted via Formspree. No form data is stored by VibeDeploy."
                    ) : (
                      <>
                        Contact form is not connected yet. Please email me directly at{' '}
                        <a href="mailto:victornwoke147@outlook.com" style={{ color: "#A855F7" }}>
                          victornwoke147@outlook.com
                        </a>
                        .
                      </>
                    )}
                  </p>

                  {state?.succeeded && (
                    <p className="text-sm text-center" style={{ color: "#34D399" }}>
                      Thanks — your message has been sent. I’ll get back to you as soon as possible.
                    </p>
                  )}

                  {state?.errors ? (
                    <p className="text-sm text-center" style={{ color: "#FB7185" }}>
                      Something went wrong. Please email me directly at{' '}
                      <a href="mailto:victornwoke147@outlook.com" style={{ color: "#A855F7" }}>
                        victornwoke147@outlook.com
                      </a>
                      .
                    </p>
                  ) : null}
                </form>
              </div>

              {/* Right: contact info + trust */}
              <div className="space-y-6">
                {/* Direct contact */}
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: "var(--vd-panel)",
                    border: "1px solid var(--vd-border)",
                  }}
                >
                  <h2 className="font-bold mb-4" style={{ color: "var(--vd-heading)", fontSize: "1rem" }}>
                    Or reach out directly
                  </h2>
                  <div className="space-y-3">
                    <p className="text-sm mb-2" style={{ color: "var(--vd-muted)" }}>
                      For audits, deployment support, or DevSecOps help, email me directly:
                    </p>
                    <a
                      href="mailto:victornwoke147@outlook.com"
                      className="flex items-center gap-3 text-sm transition-colors group"
                      style={{ color: "var(--vd-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vd-heading)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--vd-muted)")}
                    >
                      <Mail size={15} style={{ color: "#A855F7" }} />
                      victornwoke147@outlook.com
                    </a>
                    <a
                      href="https://linkedin.com/in/victornwoke"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm transition-colors"
                      style={{ color: "var(--vd-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vd-heading)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--vd-muted)")}
                    >
                      <Linkedin size={15} style={{ color: "#A855F7" }} />
                      linkedin.com/in/victornwoke
                      <ExternalLink size={11} style={{ opacity: 0.5 }} />
                    </a>
                    <a
                      href="https://github.com/victornwoke"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm transition-colors"
                      style={{ color: "var(--vd-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vd-heading)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--vd-muted)")}
                    >
                      <Github size={15} style={{ color: "#A855F7" }} />
                      github.com/victornwoke
                      <ExternalLink size={11} style={{ opacity: 0.5 }} />
                    </a>
                  </div>
                </div>

                {/* Response time */}
                <div
                  className="p-5 rounded-xl flex items-start gap-3"
                  style={{
                    background: "rgba(6, 182, 212, 0.08)",
                    border: "1px solid rgba(6, 182, 212, 0.2)",
                  }}
                >
                  <Clock size={16} style={{ color: "#06B6D4", marginTop: "1px", flexShrink: 0 }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--vd-text)" }}>
                      Response within 24 hours
                    </p>
                    <p className="text-sm" style={{ color: "var(--vd-muted)" }}>
                      Victor responds to all enquiries on business days. For urgent issues, mention it in your message.
                    </p>
                  </div>
                </div>

                {/* Privacy note */}
                <div
                  className="p-5 rounded-xl flex items-start gap-3"
                  style={{
                    background: "rgba(16, 185, 129, 0.06)",
                    border: "1px solid rgba(16, 185, 129, 0.15)",
                  }}
                >
                  <Shield size={16} style={{ color: "#10B981", marginTop: "1px", flexShrink: 0 }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--vd-text)" }}>
                      No GitHub access required
                    </p>
                    <p className="text-sm" style={{ color: "var(--vd-muted)" }}>
                      Victor will never ask for credentials or repository access without your explicit consent. All work is agreed in advance.
                    </p>
                  </div>
                </div>

                {/* Haven't taken checker yet */}
                <div
                  className="p-5 rounded-xl"
                  style={{
                    background: "rgba(124, 58, 237, 0.08)",
                    border: "1px solid rgba(124, 58, 237, 0.2)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare size={16} style={{ color: "#A855F7", marginTop: "1px", flexShrink: 0 }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "var(--vd-text)" }}>
                        Haven't taken the checker yet?
                      </p>
                      <p className="text-sm mb-3" style={{ color: "var(--vd-muted)" }}>
                        Take the free 5-minute assessment first. Your score report will help Victor understand your specific gaps before your first call.
                      </p>
                      <Link
                        href="/checker"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold"
                        style={{ color: "#A855F7" }}
                      >
                        Take the Free Checker
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}