import { ArrowRight, ChevronRight, Globe2, KeyRound, Lock, Network, ShieldCheck, Sparkles, Zap, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '@/components/brand';
import { ConnectionVisual } from '@/components/connection-visual';
import { SiteNav } from '@/components/site-nav';

const features = [
  {
    icon: Zap,
    eyebrow: '01 / DPI Bypass',
    title: 'DPI Bypass Motoru',
    body: 'Özel motorumuz derin paket incelemesini aşar. İnternet sağlayıcının hız kısıtlamasını engeller ve protokol analizine karşı koyar.',
    className: 'md:col-span-7',
  },
  {
    icon: Network,
    eyebrow: '02 / Split tunneling',
    title: 'Akıllı Tünelleme',
    body: 'Domain bazlı trafik ayırma ile oyun trafiği DPI bypass üzerinden doğrudan bağlanır; sosyal medya VPN tünelinden geçer. Daha düşük gecikme ve bandwidth tasarrufu sağlar.',
    className: 'md:col-span-5',
  },
  {
    icon: ShieldCheck,
    eyebrow: '03 / Privacy',
    title: 'Gizlilik',
    body: 'Log tutulmaz. Activity kaydı saklanmaz. İnternette ne yaptığını bilen tek kişi sen ol.',
    className: 'md:col-span-5',
  },
  {
    icon: Lock,
    eyebrow: '04 / Performance',
    title: 'Hızdan ödün verme.',
    body: 'Akıllı yönlendirme, gereksiz trafiği tünelden uzak tutarak bağlantını hızlı ve akıcı bırakır.',
    className: 'md:col-span-7',
  },
];

export default function Home() {
  const [downloadUrl, setDownloadUrl] = useState(
    'https://github.com/egoland96-source/knots-connect-desktop/releases/download/v1.1.1/Knots-Connect-Setup-1.1.1.exe'
  );
  const [versionTag, setVersionTag] = useState('v1.1.1');

  useEffect(() => {
    fetch('https://api.github.com/repos/egoland96-source/knots-connect-desktop/releases/latest')
      .then((res) => res.json())
      .then((data) => {
        const exeAsset = data.assets?.find((asset: { name: string }) => asset.name.endsWith('.exe'));
        if (exeAsset) {
          setDownloadUrl(exeAsset.browser_download_url);
          setVersionTag(data.tag_name);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="noise-overlay min-h-[100dvh] overflow-hidden bg-[#0a0a0f] text-[#f1f0eb]">
      <SiteNav />
      <main>
        <section className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          {/* Central neon radial glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(60%_55%_at_50%_28%,rgba(99,102,241,0.22),rgba(147,51,234,0.12)_45%,transparent_75%)]" />
          <div className="pointer-events-none absolute -left-48 top-10 h-[580px] w-[580px] rounded-full bg-[#2f7cf6]/[0.06] blur-3xl" />
          <div className="relative grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            <div>
              <h1 className="bg-gradient-to-br from-white to-[#c7d2fe] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                Sınırsız ve Özgür İnternet Deneyimi
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#a5b4fc]/90">
                Knots Connect ile DPI engellerini aşın, bağlantınızı sıfır log ve maksimum performans ile güvenceye alın.
              </p>

              {/* İndirme Butonu */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3.5 rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300/70 hover:shadow-blue-500/40 active:translate-y-0"
                >
                  <Download className="h-6 w-6 text-sky-200" />
                  <div className="flex flex-col text-left">
                    <span className="text-base font-bold leading-tight">Windows için İndir</span>
                    <span className="text-sm font-medium leading-tight text-blue-100/90">Sürüm {versionTag} · 64-bit</span>
                  </div>
                </a>
              </div>
            </div>

            <ConnectionVisual />
          </div>
        </section>
      </main>
    </div>
  );
}