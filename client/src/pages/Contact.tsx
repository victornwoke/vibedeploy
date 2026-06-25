// VibeDeploy Contact / Book Audit Page
// Design: Dark DevOps Command Centre

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import {
  CheckCircle2,
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
  service: string;
  appUrl: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    service: "",
    appUrl: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission (no backend — mailto fallback)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  }

  const mailtoBody = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nApp URL: ${form.appUrl}\n\nMessage:\n${form.message}`
  );
  const mailtoLink = `mailto:hello@victornwoke.com?subject=VibeDeploy%20Enquiry&body=${mailtoBody}`;

  return (
    <div style={{ backgroundColor: "#0F0F1A", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#0F0F1A" }}>
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
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "white" }}
                >
                  Let's get your app production-ready.
                </h1>
                <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem" }}>
                  Fill in the form and Victor will respond within 24 hours. Not sure which service you need? Select "Not sure yet" and describe your situation.
                </p>

                {submitted ? (
                  <div
                    className="p-8 rounded-2xl text-center"
                    style={{
                      background: "rgba(16, 185, 129, 0.08)",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                    }}
                  >
                    <CheckCircle2 size={40} style={{ color: "#10B981", margin: "0 auto 16px" }} />
                    <h2 className="font-bold mb-2" style={{ color: "white", fontSize: "1.25rem" }}>
                      Message received!
                    </h2>
                    <p className="mb-4" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9375rem" }}>
                      Victor will be in touch within 24 hours. In the meantime, you can also reach out directly.
                    </p>
                    <a
                      href={mailtoLink}
                      className="inline-flex items-center gap-2 text-sm font-medium"
                      style={{ color: "#10B981" }}
                    >
                      <Mail size={14} />
                      hello@victornwoke.com
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
                          style={{ color: "rgba(255,255,255,0.4)" }}
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
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "white",
                          }}
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
                          style={{ color: "rgba(255,255,255,0.4)" }}
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
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "white",
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
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        Service Interested In *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] appearance-none"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: form.service ? "white" : "rgba(255,255,255,0.35)",
                        }}
                      >
                        <option value="" disabled style={{ background: "#1E1B4B", color: "white" }}>
                          Select a service...
                        </option>
                        {SERVICES_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} style={{ background: "#1E1B4B", color: "white" }}>
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
                        style={{ color: "rgba(255,255,255,0.4)" }}
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
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                        }}
                        autoComplete="url"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
                        style={{ color: "rgba(255,255,255,0.4)" }}
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
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || !form.name || !form.email || !form.service || !form.message}
                      className="w-full px-6 py-3.5 text-sm font-semibold text-white rounded-xl btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      {!submitting && <ArrowRight size={15} className="inline ml-2" />}
                    </button>

                    <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                      Victor responds within 24 hours on business days.
                    </p>
                  </form>
                )}
              </div>

              {/* Right: contact info + trust */}
              <div className="space-y-6">
                {/* Direct contact */}
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: "rgba(30, 27, 75, 0.4)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <h2 className="font-bold mb-4" style={{ color: "white", fontSize: "1rem" }}>
                    Or reach out directly
                  </h2>
                  <div className="space-y-3">
                    <a
                      href="mailto:hello@victornwoke.com"
                      className="flex items-center gap-3 text-sm transition-colors group"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                    >
                      <Mail size={15} style={{ color: "#A855F7" }} />
                      hello@victornwoke.com
                    </a>
                    <a
                      href="https://linkedin.com/in/victornwoke"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
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
                      style={{ color: "rgba(255,255,255,0.6)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
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
                    <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                      Response within 24 hours
                    </p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
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
                    <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                      No GitHub access required
                    </p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
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
                      <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                        Haven't taken the checker yet?
                      </p>
                      <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
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
