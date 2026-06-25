// VibeDeploy About Page — Founder bio and credentials
// Design: Dark DevOps Command Centre

import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle2, ExternalLink, Cloud, Shield, Server } from "lucide-react";

const CREDENTIALS = [
  { icon: Cloud, label: "Microsoft Azure", detail: "Cloud infrastructure and DevOps" },
  { icon: Server, label: "Amazon Web Services", detail: "EC2, ECS, RDS, S3, Lambda" },
  { icon: Cloud, label: "Google Cloud Platform", detail: "GKE, Cloud Run, Cloud SQL" },
  { icon: Shield, label: "CI/CD Pipelines", detail: "GitHub Actions, Azure DevOps, Jenkins" },
  { icon: Server, label: "Infrastructure as Code", detail: "Terraform, Bicep, CloudFormation" },
  { icon: Shield, label: "Container Orchestration", detail: "Docker, Kubernetes, Helm" },
];

const WHY_VIBEDEPLOY = [
  "AI coding tools like Lovable, Bolt, and Cursor are genuinely impressive. They can build a working application in hours that would have taken a developer weeks.",
  "But there's a consistent gap between 'working demo' and 'production-ready application'. That gap is almost always in the same places: secrets management, CI/CD, monitoring, backups, and environment separation.",
  "Most founders building with AI tools don't have a DevOps background. They don't know what they don't know. VibeDeploy exists to make that knowledge accessible — starting with a free, honest assessment of where you stand.",
  "The checker is free because the goal is to help founders understand their risk before something goes wrong. The paid services exist for founders who want Victor to fix those risks directly.",
];

export default function About() {
  return (
    <div style={{ backgroundColor: "#0F0F1A", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#0F0F1A" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "rgba(124, 58, 237, 0.12)",
                    border: "1px solid rgba(124, 58, 237, 0.25)",
                    color: "#A855F7",
                  }}
                >
                  About VibeDeploy
                </div>
                <h1
                  className="font-bold mb-4"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}
                >
                  Built by someone who has seen what breaks in production.
                </h1>
                <p className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem" }}>
                  VibeDeploy was created by Victor Nwoke — a Cloud and DevOps engineer with hands-on experience building and maintaining infrastructure on Azure, AWS, and GCP.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/checker"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-lg btn-primary"
                  >
                    Try the Free Checker
                    <ArrowRight size={15} />
                  </Link>
                  <a
                    href="https://victornwoke.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Victor's Portfolio
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Founder photo */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div
                    className="absolute -inset-4 rounded-3xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(6, 182, 212, 0.15))",
                      filter: "blur(20px)",
                    }}
                    aria-hidden="true"
                  />
                  <img
                    src="/manus-storage/vibedeploy-founder_516681ca.jpg"
                    alt="Victor Nwoke — Cloud and DevOps Engineer, founder of VibeDeploy"
                    className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl object-cover"
                    style={{ border: "2px solid rgba(124, 58, 237, 0.3)" }}
                  />
                  <div
                    className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{
                      background: "rgba(30, 27, 75, 0.95)",
                      border: "1px solid rgba(124, 58, 237, 0.3)",
                      color: "#A855F7",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Victor Nwoke
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why VibeDeploy */}
        <section className="py-16" style={{ backgroundColor: "#0a0a14" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-bold mb-6" style={{ color: "white", fontSize: "1.75rem" }}>
                  Why VibeDeploy exists
                </h2>
                <div className="space-y-4">
                  {WHY_VIBEDEPLOY.map((para, i) => (
                    <p key={i} className="leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9375rem" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Credentials */}
              <div>
                <h2 className="font-bold mb-6" style={{ color: "white", fontSize: "1.75rem" }}>
                  Technical credentials
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CREDENTIALS.map((cred) => (
                    <div
                      key={cred.label}
                      className="p-4 rounded-xl flex items-start gap-3"
                      style={{
                        background: "rgba(30, 27, 75, 0.4)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(124, 58, 237, 0.15)" }}
                      >
                        <cred.icon size={15} style={{ color: "#A855F7" }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                          {cred.label}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {cred.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 p-5 rounded-xl"
                  style={{
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: "#10B981", marginTop: "1px", flexShrink: 0 }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                        Real-world production experience
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Victor has built and maintained production infrastructure for SaaS products, fintech applications, and enterprise systems. The VibeDeploy scoring model is based on patterns observed across real codebases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ backgroundColor: "#0F0F1A" }}>
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-bold mb-4" style={{ color: "white", fontSize: "1.75rem" }}>
              Ready to see where your app stands?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              The checker is free, takes 5 minutes, and gives you an honest picture of your production readiness.
            </p>
            <Link
              href="/checker"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white rounded-xl btn-primary"
            >
              Check My App Now — It's Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
