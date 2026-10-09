"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

const seasons = [
  {
    season: "Fall 2025",
    winners: [
      { rank: 1, school: "Alliance Academy for Innovation",  name: "Subha Sundaram",                               business: "HEPA Official" },
      { rank: 2, school: "Central Forsyth High School",      name: "Hussain Syed & Anubhav Nagammanavar",          business: "Scale Up" },
      { rank: 3, school: "Denmark High School",              name: "Spencer Arnold",                               business: "Posts on Post" },
      { rank: 4, school: "East Forsyth High School",         name: "Alexander Pearson",                            business: "The Precision Lawncare" },
      { rank: 5, school: "Lambert High School",              name: "Yunus Shabandri & Yusuf Shabandri",            business: "Holim" },
      { rank: 6, school: "North Forsyth High School",        name: "Ali Fairchild",                                business: "Nails By Ali" },
      { rank: 7, school: "South Forsyth High School",        name: "Pranavanth Kasinaboyina",                      business: "WorldLynk" },
      { rank: 8, school: "West Forsyth High School",         name: "Joseph Bray Holcomb",                          business: "High School Firewood" },
    ],
  },
];

export default function WinnersPage() {
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

        {/* Header */}
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
              <motion.p variants={{ hidden: { opacity: 0, y: 14, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65 } } }} className="eyebrow">
                Hall of Fame
              </motion.p>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 22, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } } }} className="hero-title mt-6">
                Past<br /><span className="italic">Winners.</span>
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 14, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65 } } }} className="hero-copy mt-7">
                Every winner started with an idea. Here are the students who turned theirs into something real.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Winners by season */}
        {seasons.map(({ season, winners }) => (
          <section key={season} className="section-rule">
            <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
              <Reveal className="mb-12">
                <motion.p variants={fadeUp} className="eyebrow">{season}</motion.p>
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
            </div>
          </section>
        ))}

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
