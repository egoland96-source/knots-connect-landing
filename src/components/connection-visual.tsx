import { Network, ShieldCheck, Zap } from 'lucide-react';

export function ConnectionVisual() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Semi-transparent glow card behind the visual */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_0_80px_-20px_rgba(99,102,241,0.45)] backdrop-blur-sm" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.28),rgba(147,51,234,0.12)_55%,transparent_75%)] blur-3xl" />
      <div className="relative w-full max-w-lg p-6">
        {/* Outer ring */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-10 rounded-full border border-white/5" />
          <div className="absolute inset-20 rounded-full border border-white/5" />

          {/* Center node */}
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/40">
            <Network className="h-12 w-12 text-white" />
          </div>

          {/* Orbiting nodes */}
          <div className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
            <Zap className="h-7 w-7 text-sky-400" />
          </div>
          <div className="absolute bottom-0 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
            <ShieldCheck className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="absolute left-0 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
            <Network className="h-7 w-7 text-blue-400" />
          </div>
          <div className="absolute right-0 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
            <ShieldCheck className="h-7 w-7 text-indigo-400" />
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
