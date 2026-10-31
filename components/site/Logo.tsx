export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. The Frame: Tilted slightly for editorial feel */}
      <g transform="rotate(-6 32 32)">
        
        {/* Asymmetric clapper body */}
        <path
          d="M10 24 L50 16 L54 44 L14 52 Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Diagonal Clapper Hinge Line */}
        <path
          d="M12 28 L52 20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Angled Clapper Teeth */}
        <path
          d="M17 26 L21 18 M25 24.5 L29 16.5 M33 23 L37 15 M41 21.5 L45 13.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* The Play Button - Offset */}
        <path
          d="M28 33 L39 38.5 L28 44 Z"
          fill="currentColor"
          transform="rotate(4 33.5 38.5)"
        />
      </g>

      {/* 2. The Signature "Cut" Slash - Using the exact yellow from your screenshot */}
      <path
        d="M46 12 L58 52"
        stroke="#D4FF32" /* <--- THE EXACT YELLOW */
        strokeWidth="3"
        strokeLinecap="round"
      />
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
