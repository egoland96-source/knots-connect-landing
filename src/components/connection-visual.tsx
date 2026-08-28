import { Network, ShieldCheck, Zap } from 'lucide-react';

export function ConnectionVisual() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#2f7cf6]/10 blur-3xl" />
      <div className="relative w-full max-w-md">
        {/* Outer ring */}
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-white/5" />
          <div className="absolute inset-16 rounded-full border border-white/5" />

          {/* Center node */}
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
            <Network className="h-10 w-10 text-white" />
          </div>

          {/* Orbiting nodes */}
          <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
            <Zap className="h-6 w-6 text-sky-400" />
          </div>
          <div className="absolute bottom-0 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
            <Network className="h-6 w-6 text-blue-400" />
          </div>
          <div className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
            <ShieldCheck className="h-6 w-6 text-indigo-400" />
          </div>

          {/* Connecting lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
            <line x1="50" y1="0" x2="50" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="50" y1="100" x2="50" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="50" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="100" y1="50" x2="50" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ConnectionVisual;
