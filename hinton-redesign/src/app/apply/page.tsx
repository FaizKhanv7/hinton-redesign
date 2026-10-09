"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, MapPin, FileText, ExternalLink, Mail, Trophy } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

const winners = [
  { rank: 1, school: "Alliance Academy for Innovation",  name: "Subha Sundaram",                               business: "HEPA Official" },
  { rank: 2, school: "Central Forsyth High School",      name: "Hussain Syed & Anubhav Nagammanavar",          business: "Scale Up" },
  { rank: 3, school: "Denmark High School",              name: "Spencer Arnold",                               business: "Posts on Post" },
  { rank: 4, school: "East Forsyth High School",         name: "Alexander Pearson",                            business: "The Precision Lawncare" },
  { rank: 5, school: "Lambert High School",              name: "Yunus Shabandri & Yusuf Shabandri",            business: "Holim" },
  { rank: 6, school: "North Forsyth High School",        name: "Ali Fairchild",                                business: "Nails By Ali" },
  { rank: 7, school: "South Forsyth High School",        name: "Pranavanth Kasinaboyina",                      business: "WorldLynk" },
  { rank: 8, school: "West Forsyth High School",         name: "Joseph Bray Holcomb",                          business: "High School Firewood" },
];

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">

      {/* Nav */}
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

        {/* Page header */}
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <motion.p variants={{ hidden: { opacity: 0, y: 14, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65 } } }} className="eyebrow">
                Competition / Apply
              </motion.p>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 22, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } } }} className="hero-title mt-6">
                Apply now.
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 14, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65 } } }} className="hero-copy mt-7">
                Applications are open. Submit yours before the deadline and take your shot at $10,000.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Key dates */}
        <section className="section-rule">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <Reveal className="grid gap-4 sm:grid-cols-3">
              <motion.div variants={fadeUp} className="apply-date-card">
                <Calendar size={18} className="text-[var(--orange)] mb-3" />
                <p className="apply-date-label">Application Deadline</p>
                <p className="apply-date-value">Friday, October 9, 2026</p>
                <p className="apply-date-sub">12 PM ET (noon)</p>
              </motion.div>
              <motion.div variants={fadeUp} className="apply-date-card">
                <Trophy size={18} className="text-[var(--orange)] mb-3" />
                <p className="apply-date-label">Winners Announced</p>
                <p className="apply-date-value">Friday, October 30, 2026</p>
                <p className="apply-date-sub">In person at winner's school</p>
              </motion.div>
              <motion.div variants={fadeUp} className="apply-date-card">
                <MapPin size={18} className="text-[var(--orange)] mb-3" />
                <p className="apply-date-label">Eligibility</p>
                <p className="apply-date-value">Forsyth County</p>
                <p className="apply-date-sub">One winner per high school</p>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* Application steps */}
        <section className="section-rule">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:grid lg:grid-cols-[.38fr_.62fr] lg:gap-20 lg:px-12 lg:py-36">
            <Reveal>
              <motion.p variants={fadeUp} className="eyebrow">How to Apply</motion.p>
              <motion.div variants={fadeUp} className="mt-6 h-px w-12 bg-[var(--orange)]" />
            </Reveal>
            <Reveal className="mt-10 lg:mt-0 space-y-10">

              {/* Step 1 — Waiver */}
              <motion.div variants={fadeUp} className="apply-step">
                <div className="apply-step-num">01</div>
                <div>
                  <p className="apply-step-title">Download &amp; sign the legal waiver</p>
                  <p className="reading-copy !text-base mt-2">
                    If you are under 18, a parent or legal guardian must sign. Scan the signed copy to PDF — you will upload it with your application.
                  </p>
                  <a
                    href="https://www.hintonyea.com/_files/ugd/bc33fd_8ed66a566ac0475dbfe36cd8812ed4cf.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link mt-4 inline-flex"
                  >
                    <FileText size={14} />
                    Hinton YEA — Publicity Release &amp; Liability Waiver
                    <ExternalLink size={12} className="opacity-50" />
                  </a>
                </div>
              </motion.div>

              {/* Step 2 — Application */}
              <motion.div variants={fadeUp} className="apply-step">
                <div className="apply-step-num">02</div>
                <div>
                  <p className="apply-step-title">Complete the application</p>
                  <p className="reading-copy !text-base mt-2">
                    Click below to open the official Hinton YEA application form. Have your signed waiver PDF ready to attach before you begin.
                  </p>
                  <a
                    href="https://www.hintonyea.com/application"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-accent mt-5 inline-flex"
                  >
                    Start Application <ArrowRight size={15} />
                  </a>
                </div>
              </motion.div>

              {/* Step 3 — Questions */}
              <motion.div variants={fadeUp} className="apply-step">
                <div className="apply-step-num">03</div>
                <div>
                  <p className="apply-step-title">Questions?</p>
                  <p className="reading-copy !text-base mt-2">
                    Reach out and we'll get back to you as soon as possible.
                  </p>
                  <a href="mailto:support@hintonyea.com" className="text-link mt-4 inline-flex">
                    <Mail size={14} />
                    support@hintonyea.com
                  </a>
                </div>
              </motion.div>

            </Reveal>
          </div>
        </section>

        {/* Fall 2025 winners */}
        <section className="bg-[var(--wash)] border-t border-[var(--line)]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
            <Reveal className="mb-12">
              <motion.p variants={fadeUp} className="eyebrow">Fall 2025</motion.p>
              <motion.h2 variants={fadeUp} className="display-title mt-4">Winners</motion.h2>
            </Reveal>
            <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {winners.map(({ rank, school, name, business }) => (
                <motion.div key={rank} variants={fadeUp} className="winner-card">
                  <p className="winner-rank">{rank < 10 ? `0${rank}` : rank}</p>
                  <p className="winner-school">{school}</p>
                  <p className="winner-name">{name}</p>
                  <p className="winner-business">{business}</p>
                </motion.div>
              ))}
            </Reveal>
            <Reveal className="mt-12">
              <motion.div variants={fadeUp}>
                <Link href="/winners" className="button button-dark inline-flex">
                  View All Winners <ArrowRight size={15} />
                </Link>
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
