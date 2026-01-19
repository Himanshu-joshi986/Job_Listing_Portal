import React from "react";
import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { HeroScene } from "../3d/HeroScene";
import { FeatureCard } from "../components/FeatureCard";
import { TestimonialSlider } from "../components/TestimonialSlider";
import { SectionHeading } from "../components/SectionHeading";
import { TESTIMONIALS } from "../data/testimonials";

function Icon({ children }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-90"
    >
      {children}
    </svg>
  );
}

export function LandingPage() {
  const features = [
    {
      title: "Glassmorphism UI",
      description:
        "Premium glass cards, neon highlights, and crisp typography—made for modern SaaS vibes.",
      icon: (
        <Icon>
          <path
            d="M7 7h10v10H7V7Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M4 10V6a2 2 0 0 1 2-2h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </Icon>
      ),
    },
    {
      title: "Motion-first UX",
      description:
        "Smooth transitions and micro-interactions powered by Framer Motion—subtle, not noisy.",
      icon: (
        <Icon>
          <path
            d="M4 14c2.5-4 5.5-4 8 0s5.5 4 8 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </Icon>
      ),
    },
    {
      title: "3D Hero Visuals",
      description:
        "Tasteful 3D accents with React Three Fiber for an elevated first impression.",
      icon: (
        <Icon>
          <path
            d="M12 3l8 5-8 5-8-5 8-5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M4 13l8 5 8-5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </Icon>
      ),
    },
  ];

  return (
    <PageShell>
      <section className="container-app">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
              Premium UI • Frontend Only • Dummy Data
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
              Find your next role with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                neon clarity
              </span>
              .
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
              A modern job portal interface with glass cards, silky motion, and a
              3D hero—built for a premium, dashboard-first experience.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/jobs" className="btn-primary">
                Find Jobs
              </Link>
              <Link to="/dashboard/employer" className="btn-ghost">
                Post Jobs
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="chip">Dark theme: #0b0b0f</span>
              <span className="chip">Neon gradients</span>
              <span className="chip">Reusable components</span>
            </div>
          </div>

          <div className="relative">
            <HeroScene />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Avg. Time to Apply
                </div>
                <div className="mt-2 text-2xl font-extrabold">38s</div>
                <div className="mt-1 text-xs text-white/55">
                  Fast, clean UI flow
                </div>
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Listings
                </div>
                <div className="mt-2 text-2xl font-extrabold">1,240+</div>
                <div className="mt-1 text-xs text-white/55">
                  Dummy dataset demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app mt-16">
        <SectionHeading
          eyebrow="Why it feels premium"
          title="Glass cards + neon gradients + motion"
          subtitle="A complete UI system designed to look like a real product from day one—responsive and reusable."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <FeatureCard
              key={f.title}
              title={f.title}
              description={f.description}
              icon={f.icon}
            />
          ))}
        </div>
      </section>

      <section className="container-app mt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="glass rounded-3xl p-7 md:p-9">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Built for both sides
            </div>
            <div className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
              Seeker + Employer dashboards
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Toggle between a job seeker flow (profile, saved jobs, applied jobs)
              and an employer flow (create listings, manage posts, stats).
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard/seeker" className="btn-ghost">
                Explore Seeker
              </Link>
              <Link to="/dashboard/employer" className="btn-primary">
                Explore Employer
              </Link>
            </div>
          </div>

          <TestimonialSlider items={TESTIMONIALS} />
        </div>
      </section>
    </PageShell>
  );
}

