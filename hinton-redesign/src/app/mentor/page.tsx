"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Building2, Award } from "lucide-react";
import ReelCounter from "../components/ReelCounter";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const education = [
  "BBA — Accounting, Georgia State University (Top 2% of Class)",
  "MBA — Massachusetts Institute of Technology",
  "Unlimited Electrical Licenses in Many States",
];

const board = [
  { role: "Director", org: "Southern States Bank", ticker: "NASDAQ: SSBK" },
  { role: "Board Member", org: "Governor Brian Kemp's Electric Mobility Innovation Board", ticker: null },
  { role: "Advisory Board", org: "TempAlert — from founding through acquisition by Digi", ticker: "NASDAQ: DGII" },
];

export default function MentorPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">

      {/* Minimal nav */}
      <nav className="site-nav fixed inset-x-0 top-0 z-50" aria-label="Primary navigation">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="logo" aria-label="Hinton YEA home">
            <Image src="/Logo.avif" alt="Hinton YEA" width={120} height={40} className="h-10 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-link flex items-center gap-2 text-sm">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="pt-[76px]">

        {/* Hero — full-width name + image */}
        <section className="relative overflow-hidden border-b border-[var(--line)]">
          <div className="mx-auto grid max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_420px] lg:items-end lg:gap-16 lg:px-12 lg:py-32">

            {/* Text side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="order-2 lg:order-1"
            >
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } } }}
                className="eyebrow"
              >
                Meet your mentor
              </motion.p>
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 24, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85 } } }}
                className="hero-title mt-6"
              >
                Jonathan<br /><em>Hinton.</em>
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } } }}
                className="mt-6 text-[var(--muted)] text-lg leading-relaxed max-w-xl"
              >
                Serial entrepreneur. $1B+ in revenue built. Youth Entrepreneur of the Year — Georgia.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-3"
              >
                <span className="mentor-tag">RavenVolt → NYSE: ABM ($310M)</span>
                <span className="mentor-tag">Polarworx</span>
                <span className="mentor-tag">MIT MBA</span>
                <span className="mentor-tag">Youth Entrepreneur of the Year</span>
              </motion.div>
            </motion.div>

            {/* Photo side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="order-1 mb-10 lg:order-2 lg:mb-0"
            >
              <div className="mentor-hero-photo">
                <Image
                  src="/Hinton2.avif"
                  alt="Jonathan Hinton"
                  width={420}
                  height={520}
                  className="h-full w-full object-cover object-top"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* Stats bar — directly below hero */}
        <section className="mentor-stats-bar">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
            {[
              { reel: "$1B+",   label: "Revenue Generated" },
              { reel: "3",      label: "Startups Acquired (NYSE)" },
              { reel: "$310M",  label: "RavenVolt Exit" },
              { reel: "2",      label: "Active Ventures" },
            ].map(({ reel, label }, i) => (
              <div key={label} className="mentor-stat">
                <div className="mentor-stat-value">
                  <ReelCounter value={reel} delay={i * 120} />
                </div>
                <p className="mentor-stat-label">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Passionate About Entrepreneurship */}
        <section className="section-rule">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:grid lg:grid-cols-[.38fr_.62fr] lg:gap-20 lg:px-12 lg:py-36">
            <Reveal>
              <motion.p variants={fadeUp} className="eyebrow">Passionate About Entrepreneurship</motion.p>
              <motion.div variants={fadeUp} className="mt-6 h-px w-12 bg-[var(--orange)]" />
            </Reveal>
            <Reveal className="mt-10 lg:mt-0">
              <motion.p variants={fadeUp} className="reading-copy">
                My big breakthrough came when I was in high school. That year, I was fortunate enough to be named &apos;Youth Entrepreneur of the Year&apos; for Georgia, along with the adult winner Jeff Arnold, founder of WebMD. This achievement inspired me to further pursue my entrepreneurial ambitions, and since then I have gone on to help build several successful businesses.
              </motion.p>
              <motion.p variants={fadeUp} className="reading-copy mt-6">
                I have spent my entire professional life dedicated to creating startups. Out of the last three startups I have founded or co-founded, all of them have been bought by renowned companies listed on the New York Stock Exchange. In total, these businesses have produced over one billion dollars in revenue! My last venture, RavenVolt, was purchased by (NYSE: ABM) for $310 million and is currently the fastest growing microgrid company in the entire United States. My most recent startup, Polarworx, is a fast-growing national company focused on HVAC and Refrigeration services.
              </motion.p>
              <motion.p variants={fadeUp} className="reading-copy mt-6">
                As a high school student, this goes to show that with sufficient hard work and dedication you can achieve incredible results and make a tangible difference in your community.
              </motion.p>
            </Reveal>
          </div>
        </section>

        {/* Education & Board — two columns */}
        <section className="section-rule">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:grid lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-36">

            {/* Education */}
            <Reveal>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <GraduationCap size={20} className="text-[var(--orange)]" />
                <p className="eyebrow">Education</p>
              </motion.div>
              <ul className="space-y-4">
                {education.map((item) => (
                  <motion.li variants={fadeUp} key={item} className="mentor-credential">
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            {/* Board */}
            <Reveal className="mt-14 lg:mt-0">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <Building2 size={20} className="text-[var(--orange)]" />
                <p className="eyebrow">Board of Directors</p>
              </motion.div>
              <ul className="space-y-5">
                {board.map(({ role, org, ticker }) => (
                  <motion.li variants={fadeUp} key={org} className="mentor-board-item">
                    <p className="mentor-board-role">{role}</p>
                    <p className="mentor-board-org">{org}</p>
                    {ticker && <p className="mentor-board-ticker">{ticker}</p>}
                  </motion.li>
                ))}
              </ul>
            </Reveal>

          </div>
        </section>

        {/* CTA */}
        <section className="competition">
          <div className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 sm:py-28 lg:px-12 lg:py-36">
            <Reveal>
              <motion.div variants={fadeUp} className="flex justify-center mb-6">
                <Award size={36} className="text-[var(--orange)]" />
              </motion.div>
              <motion.p variants={fadeUp} className="eyebrow eyebrow-light">Ready to start?</motion.p>
              <motion.h2 variants={fadeUp} className="competition-title mx-auto mt-6 max-w-2xl">
                Apply for the Hinton Youth Entrepreneurship Award and turn your idea into a business.
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/#contact" className="button button-light">Apply Now</Link>
                <Link href="/" className="button" style={{ border: "1px solid rgba(255,255,255,.2)", color: "white" }}>Back to Home</Link>
              </motion.div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-8 text-sm text-[var(--muted)] sm:px-8 lg:px-12">
          <span>© 2025 Hinton YEA</span>
          <Link href="/" className="text-link">Back to Home</Link>
        </div>
      </footer>
    </div>
  );
}
