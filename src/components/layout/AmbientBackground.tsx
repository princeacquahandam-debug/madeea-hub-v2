// Ambient animated backdrop — soft drifting colour blobs behind the whole app.
// Fixed at z-0; the app shell sits above it (z-1). Colours come from CSS
// variables (--cool1/2/3, --ambient-base) so it re-tints per theme.
const BLOBS: React.CSSProperties[] = [
  { top: "-18%", left: "-10%", width: "70%", height: "75%", background: "radial-gradient(closest-side, rgba(var(--cool1),0.85), rgba(var(--cool1),0) 70%)", filter: "blur(64px)", animation: "driftA 26s ease-in-out infinite" },
  { top: "8%", left: "26%", width: "60%", height: "62%", background: "radial-gradient(closest-side, rgba(var(--cool2),0.7), rgba(var(--cool2),0) 70%)", filter: "blur(66px)", animation: "driftB 34s ease-in-out infinite", animationDelay: "-6s" },
  { bottom: "-14%", left: "6%", width: "66%", height: "70%", background: "radial-gradient(closest-side, rgba(255,190,120,0.9), rgba(255,170,96,0.35) 55%, rgba(255,160,90,0) 75%)", filter: "blur(60px)", animation: "glowPulse 22s ease-in-out infinite" },
  { bottom: "-6%", left: "18%", width: "40%", height: "44%", background: "radial-gradient(closest-side, rgba(253,88,17,0.5), rgba(253,120,50,0) 68%)", filter: "blur(58px)", animation: "glowPulse 18s ease-in-out infinite", animationDelay: "-4s" },
  { top: "22%", right: "-16%", width: "52%", height: "64%", background: "radial-gradient(closest-side, rgba(255,148,92,0.4), rgba(255,148,92,0) 70%)", filter: "blur(70px)", animation: "driftC 30s ease-in-out infinite", animationDelay: "-10s" },
  { bottom: "-20%", right: "-8%", width: "58%", height: "56%", background: "radial-gradient(closest-side, rgba(var(--cool3),0.55), rgba(var(--cool3),0) 72%)", filter: "blur(66px)", animation: "driftB 38s ease-in-out infinite", animationDelay: "-14s" },
];

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      {BLOBS.map((style, i) => (
        <div key={i} className="blob" style={style} />
      ))}
    </div>
  );
}
