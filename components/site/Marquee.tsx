import { cn } from '@/lib/utils';

export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-white/[0.06] bg-panel/40 py-4 select-none',
        className
      )}
      aria-hidden="true"
    >
      <div className={cn('flex w-max items-center gap-8 whitespace-nowrap', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-syne text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">{item}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-lime/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
