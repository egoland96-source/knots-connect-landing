import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from './brand';
import { Download, Menu, X } from 'lucide-react';

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 lg:px-8">
        <Brand />

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-[#94a3b8] transition hover:text-white">
            Özellikler
          </a>
          <a href="#download" className="text-sm text-[#94a3b8] transition hover:text-white">
            İndir
          </a>
          <a
            href="https://github.com/egoland96-source/knots-connect-desktop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#94a3b8] transition hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://github.com/egoland96-source/knots-connect-desktop/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            İndir
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile menu */}
        {open && (
          <div className="absolute left-0 right-0 top-16 mx-5 rounded-xl border border-white/10 bg-[#0a0a0f]/95 p-4 backdrop-blur md:hidden">
            <div className="flex flex-col gap-3">
              <a href="#features" className="text-sm text-[#94a3b8] transition hover:text-white">
                Özellikler
              </a>
              <a href="#download" className="text-sm text-[#94a3b8] transition hover:text-white">
                İndir
              </a>
              <a
                href="https://github.com/egoland96-source/knots-connect-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#94a3b8] transition hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default SiteNav;
