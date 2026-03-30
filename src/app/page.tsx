export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32">
      <h1
        className="text-6xl tracking-[0.3em] text-grid-text sm:text-8xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        GRID
      </h1>
      <p className="mt-4 text-lg text-grid-text-secondary">
        Formula 1 Hub — Temporada 2026
      </p>
    </div>
  );
}
