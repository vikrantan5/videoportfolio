export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="4" y="10" width="56" height="44" rx="10" fill="none" stroke="#C6FF3D" strokeWidth="4" />
      <path d="M4 22h56" stroke="#C6FF3D" strokeWidth="4" />
      <path d="M14 10l8 12M30 10l8 12M46 10l8 12" stroke="#C6FF3D" strokeWidth="4" />
      <path d="M27 30l16 9-16 9z" fill="#C6FF3D" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5" data-testid="site-logo">
      <LogoMark className="h-8 w-8" />
      {!compact && (
        <span className="font-syne text-lg font-extrabold uppercase tracking-tight text-zinc-100">
          Fact<span className="text-lime">Definer</span>
        </span>
      )}
    </span>
  );
}
