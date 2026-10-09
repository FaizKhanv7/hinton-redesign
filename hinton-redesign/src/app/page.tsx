"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import ReelCounter from "./components/ReelCounter";

const curriculum = [
  { title: "Testing Your Idea", items: ["What kind of market do you have?", "Who's Your Target Customer?", "How will you acquire the customer?", "How big is the opportunity (TAM)?", "Sizing Your Competition"] },
  { title: "Money Matters", items: ["Estimating Capital Costs", "How can you raise capital?", "What about profits? Basics of a P&L", "Deep Dive into Unit Economics", "How to Scale for Growth"] },
  { title: "Nuts and Bolts of Getting Going", items: ["Incorporation and Entities Overview", "Bank Accounts - the dos and don'ts of comingling funds", "Insurance - why it's needed and common policies", "Accounting Systems", "Taxes - various types, who pays & why?"] },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger} className={className}>{children}</motion.div>;
}

// Each word is its own component so hooks are called at the top level of a component
function Word({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [Math.max(0, start - 0.05), end], [0.15, 1]);
  const color = useTransform(progress, [Math.max(0, start - 0.05), end], ["#9a9a94", "#171715"]);
  return <motion.span style={{ opacity, color }}>{word} </motion.span>;
}

function ScrollHighlight() {
  const container = useRef<HTMLDivElement>(null);
  // Tall container creates scroll room; sticky inner stays fixed while words highlight
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const linkOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  const text = "If you like learning new things, taking risks, and mastering the process of turning your ideas into profitable businesses, then you could definitely call yourself an entrepreneur. It's all about creating something from nothing and having the drive and motivation to see it through. Being an entrepreneur isn't just having a cool idea, but building on that idea to develop a business people will want or need.";
  const words = text.split(" ");

  return (
    <div ref={container} id="entrepreneur" className="scroll-highlight-outer">
      <div className="scroll-highlight-sticky">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="eyebrow mb-8">What does it mean to be an entrepreneur?</p>
          <p className="scroll-highlight-text" aria-label={text}>
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                start={i / words.length}
                end={(i + 1) / words.length}
              />
            ))}
          </p>
          <motion.a style={{ opacity: linkOpacity }} href="#mentor" className="text-link mt-10 inline-flex">
            Learn More <ArrowRight size={14} />
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nav = [["Home", "#home"], ["Competition / Apply", "/apply"], ["Past Winners", "/winners"], ["Curriculum", "#curriculum"], ["Advisors", "#mentor"]];
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!event.currentTarget.checkValidity()) { event.currentTarget.reportValidity(); return; } setSubmitted(true); event.currentTarget.reset(); };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">

      {/* Navigation */}
      <nav className="site-nav fixed inset-x-0 top-0 z-50" aria-label="Primary navigation">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#home" className="logo" aria-label="Hinton YEA home">
            <Image src="/Logo.avif" alt="Hinton YEA" width={120} height={40} className="h-10 w-auto object-contain" />
          </a>
          <div className="hidden items-center gap-7 sm:flex">
            {nav.map(([label, href]) => <a key={label} href={href} className="nav-link">{label}</a>)}
            <a href="#contact" className="button button-dark">Apply</a>
          </div>
          <button className="menu-button flex sm:hidden" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="sr-only">Toggle menu</span><span /><span />
          </button>
        </div>
        {menuOpen && (
          <div id="mobile-navigation" className="border-t border-[var(--line)] bg-[var(--paper)] px-5 py-5 sm:hidden">
            <div className="flex flex-col gap-4">
              {nav.map(([label, href]) => <a key={label} href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a>)}
              <a href="#contact" className="button button-dark mt-1 w-fit" onClick={() => setMenuOpen(false)}>Apply</a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero */}
        <section id="home" className="relative isolate overflow-hidden pt-[76px]">
          <div className="mx-auto flex min-h-[min(760px,calc(100vh-20px))] max-w-[1440px] flex-col items-center justify-end px-5 pb-16 pt-24 text-center sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-4xl">
              <motion.p variants={{ hidden: { opacity: 0, y: 16, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } } }} className="eyebrow">
                Hinton Youth Entrepreneurship Award
              </motion.p>
              <motion.h1 className="hero-title mt-7" variants={stagger}>
                {["Start", "something"].map((w, i) => (
                  <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: "easeOut" } } }} className="inline-block mr-[0.18em]">{w}</motion.span>
                ))}
                <br />
                {["that", "matters."].map((w, i) => (
                  <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: "easeOut" } } }} className="inline-block mr-[0.18em] italic">{w}</motion.span>
                ))}
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 16, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } } }} className="hero-copy mx-auto mt-8">
                For high school students ready to turn an idea into a business.
              </motion.p>
            </motion.div>
            <a href="#entrepreneur" aria-label="Scroll down" className="hero-chevron mt-14 mb-2">
              <ChevronDown size={32} strokeWidth={1.5} />
            </a>
          </div>
        </section>

        {/* Scroll-highlight entrepreneur section */}
        <ScrollHighlight />

        {/* Mentor */}
        <section id="mentor" className="bg-[var(--wash)]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-12 lg:py-36">
            <Reveal className="mentor-photo">
              <motion.div variants={fadeUp} className="photo-frame">
                <Image src="/Hinton.avif" alt="Jonathan Hinton" width={560} height={680} className="h-full w-full object-cover grayscale rounded-2xl" />
              </motion.div>
            </Reveal>
            <Reveal>
              <motion.p variants={fadeUp} className="eyebrow">Meet your mentor</motion.p>
              <motion.h2 variants={fadeUp} className="display-title mt-6">Jonathan Hinton</motion.h2>
              <motion.p variants={fadeUp} className="reading-copy mt-7">When I was in fifth grade, I found myself in the principal&apos;s office for running a &apos;money box&apos; enterprise out of my desk. Every morning, I would take money from my lunch allowance and invest it in supplies from the school bookstore - things like pencils with logos of my favorite baseball team printed on them. I would then resell these items throughout the day to make a profit. This entrepreneurial streak continued into middle school, where I earned pocket money by trading comic books with classmates at the gym before classes began. ...</motion.p>
              <motion.a variants={fadeUp} href="/mentor" className="text-link mt-8">Read More <ArrowRight size={14} /></motion.a>
            </Reveal>
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="section-rule">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
            <Reveal className="max-w-2xl">
              <motion.p variants={fadeUp} className="eyebrow">Curriculum</motion.p>
              <motion.h2 variants={fadeUp} className="display-title mt-6">What we teach High school entrepreneurs</motion.h2>
            </Reveal>
            <Reveal className="mt-12 grid gap-4 lg:grid-cols-3">
              {curriculum.map((card, index) => (
                <motion.article variants={fadeUp} whileHover={{ y: -6 }} transition={{ duration: 0.22 }} className="curriculum-card" key={card.title}>
                  <p className="card-number">0{index + 1}</p>
                  <h3>{card.title}</h3>
                  <ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </motion.article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Competition */}
        <section id="competition" className="competition">
          <div className="mx-auto max-w-[1440px] px-5 py-24 text-center sm:px-8 sm:py-32 lg:px-12 lg:py-40">
            <Reveal>
              <motion.p variants={fadeUp} className="eyebrow eyebrow-light">We finish our teaching with an annual competition.</motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <div className="prize"><ReelCounter value="$10,000" /></div>
              </motion.div>
              <motion.p variants={fadeUp} className="competition-title mx-auto mt-6">The Hinton Youth Entrepreneurship Award is a $10,000 cash prize given to the high school entrepreneur with the best business.</motion.p>
              <motion.a variants={fadeUp} href="#contact" className="button button-light mt-10 mx-auto">Apply Now <ArrowUpRight size={16} /></motion.a>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section-rule">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.7fr_1.3fr] lg:gap-20 lg:px-12 lg:py-36">
            <Reveal>
              <motion.p variants={fadeUp} className="eyebrow">Get in touch</motion.p>
              <motion.h2 variants={fadeUp} className="display-title mt-6">Contact</motion.h2>
              <motion.a variants={fadeUp} className="text-link mt-7" href="mailto:support@hintonyea.com">support@hintonyea.com</motion.a>
            </Reveal>
            <Reveal>
              <motion.form variants={fadeUp} onSubmit={submit} className="contact-form" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label>First name<input required name="first-name" autoComplete="given-name" /></label>
                  <label>Last name<input required name="last-name" autoComplete="family-name" /></label>
                </div>
                <label>Email<input required name="email" type="email" autoComplete="email" /></label>
                <label>Write a message<textarea required name="message" rows={5} /></label>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="button button-accent" type="submit">Submit</button>
                  {submitted && <p className="form-success" role="status">Thanks for submitting!</p>}
                </div>
              </motion.form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-8 text-sm text-[var(--muted)] sm:px-8 lg:px-12">
          <span>© 2025 Hinton YEA</span>
          <a href="#home" className="text-link">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
