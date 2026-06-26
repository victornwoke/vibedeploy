// VibeDeploy Footer — Dark with links, social icons, portfolio reference

import { Link } from "wouter";
import { Github, Linkedin, ExternalLink, Shield } from "lucide-react";

const PRODUCT_LINKS = [
  { href: "/", label: "Home" },
  { href: "/checker", label: "Checker" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--vd-footer-bg)", borderTop: "1px solid var(--vd-border)" }}
      role="contentinfo"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/images/vibedeploy-logo.png"
                alt="VibeDeploy"
                className="w-7 h-7 object-contain"
              />
              <span className="font-bold text-base tracking-tight">
                <span className="gradient-text">Vibe</span>
                <span className="text-[var(--vd-heading)]">Deploy</span>
              </span>
            </Link>
            <p style={{ color: "var(--vd-muted)", fontSize: "0.875rem", lineHeight: "1.6" }}>
              Production readiness for the AI app era.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/victornwoke"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md transition-colors"
                style={{ color: "var(--vd-faint)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vd-heading)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--vd-faint)")}
                aria-label="Victor Nwoke on GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com/in/victornwoke"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md transition-colors"
                style={{ color: "var(--vd-faint)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vd-heading)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--vd-faint)")}
                aria-label="Victor Nwoke on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "var(--vd-faint)" }}
            >
              Product
            </h3>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--vd-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vd-heading)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--vd-muted)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio + Security note */}
          <div className="space-y-6">
            <div>
              <h3
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "var(--vd-faint)" }}
              >
                Built By
              </h3>
              <a
                href="https://victornwoke.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors group"
                style={{ color: "var(--vd-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vd-heading)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--vd-muted)")}
              >
                <span>Victor Nwoke | Cloud & DevOps Engineer</span>
                <ExternalLink size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="mt-2 text-xs" style={{ color: "var(--vd-faint)" }}>
                victornwoke.com
              </p>
            </div>

            {/* Security note */}
            <div
              className="flex items-start gap-2.5 p-3 rounded-lg"
              style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
            >
              <Shield size={14} style={{ color: "#10B981", marginTop: "1px", flexShrink: 0 }} />
              <p className="text-xs" style={{ color: "var(--vd-muted)", lineHeight: "1.5" }}>
                No account required. No GitHub access needed. All scoring runs client-side.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--vd-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--vd-faint)" }}>
            © 2026 VibeDeploy. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--vd-faint)" }}>
            Report results are based on self-reported answers and do not constitute a professional security audit.
          </p>
        </div>
      </div>
    </footer>
  );
}
