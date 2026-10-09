"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface ReelCounterProps {
  /** The full display string e.g. "$10,000" or "$1B+" or "3" */
  value: string;
  className?: string;
  /** Delay before the reel starts (ms) */
  delay?: number;
}

/**
 * Spinning digit reel counter.
 * Non-digit characters ($ , + B M) are rendered as plain text;
 * each digit gets its own reel column that spins then settles.
 */
export default function ReelCounter({ value, className = "", delay = 0 }: ReelCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.6 });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!active || triggered) return;
    const t = setTimeout(() => setTriggered(true), delay);
    return () => clearTimeout(t);
  }, [active, triggered, delay]);

  // Split into tokens: each char is either a digit or a literal
  const tokens = value.split("").map((ch) => ({
    ch,
    isDigit: /\d/.test(ch),
  }));

  // Give each digit column a stable index for stagger
  let digitIndex = 0;

  return (
    <div ref={ref} className={`t-reel ${className}`} aria-label={value}>
      {tokens.map((token, i) => {
        if (!token.isDigit) {
          return (
            <span key={i} className="t-reel-literal">
              {token.ch}
            </span>
          );
        }
        const target = parseInt(token.ch, 10);
        const colIndex = digitIndex++;
        return (
          <ReelColumn
            key={i}
            target={target}
            colIndex={colIndex}
            triggered={triggered}
          />
        );
      })}

      {/* Hidden SVG filter for vertical-only motion blur per column */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {Array.from({ length: 10 }).map((_, ci) => (
            <filter key={ci} id={`reel-blur-${ci}`} x="0" y="-50%" width="100%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation={`0 0`} result="blur" ref={(el) => {
                // store ref on the filter element so ReelColumn can animate it
                if (el) {
                  (el as SVGElement & { _colIndex?: number })._colIndex = ci;
                }
              }} />
            </filter>
          ))}
        </defs>
      </svg>
    </div>
  );
}

function ReelColumn({
  target,
  colIndex,
  triggered,
}: {
  target: number;
  colIndex: number;
  triggered: boolean;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFEGaussianBlurElement | null>(null);
  const rafRef = useRef<number>(0);

  // Each column gets a unique filter id
  const filterId = `reel-blur-col-${colIndex}`;

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || !triggered) return;

    const cellPx = 1; // strip is built in em units via CSS var, but we translate in %
    const spins = 2; // extra full rotations before settling
    const totalCells = spins * 10 + target;
    const staggerMs = colIndex * 90;
    const durMs = 1400;

    // Delay this column by stagger
    const timeout = setTimeout(() => {
      // Apply CSS transition
      strip.style.transition = `transform ${durMs}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      strip.style.transform = `translateY(calc(-${totalCells} * var(--reel-cell)))`;

      // Animate vertical blur from peak → 0 over the duration
      const blurEl = strip.closest(".t-reel-col")?.querySelector("feGaussianBlur");
      if (blurEl) {
        const startTime = performance.now();
        const peakBlur = 3;
        const animateBlur = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / durMs, 1);
          const currentBlur = peakBlur * (1 - t);
          blurEl.setAttribute("stdDeviation", `0 ${currentBlur.toFixed(2)}`);
          if (t < 1) rafRef.current = requestAnimationFrame(animateBlur);
        };
        rafRef.current = requestAnimationFrame(animateBlur);
      }
    }, staggerMs);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, target, colIndex]);

  const digits = Array.from({ length: 30 }, (_, i) => i % 10); // 3 full cycles of 0-9

  return (
    <div className="t-reel-col">
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <filter id={filterId} x="0" y="-100%" width="100%" height="300%">
            <feGaussianBlur ref={filterRef} in="SourceGraphic" stdDeviation="0 0" />
          </filter>
        </defs>
      </svg>
      <div
        ref={stripRef}
        className="t-reel-strip"
        style={{ filter: `url(#${filterId})` }}
      >
        {digits.map((d, i) => (
          <div key={i} className="t-reel-digit">
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
