import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      
      {/* HERO BACKGROUND */}
      <Image
        src="/hero-bg.jpg"
        alt="Tsukibase Lunar Base"
        fill
        className="object-cover"
        priority
        quality={95}
      />

      {/* Subtle space vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-10" />

      {/* NAVIGATION */}
      <Navbar />

      {/* SMALLER WELCOME PANEL - LEFT SIDE */}
      <div className="absolute left-6 md:left-12 top-[24%] z-40 max-w-[380px]">
        <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-7 shadow-2xl">
          
          <h1 className="text-4xl md:text-5xl font-light leading-none mb-3 tracking-tight">
            ようこそ、月基地へ
          </h1>
          
          <p className="text-lg md:text-xl mb-1">Welcome to Tsukibase • Lunar Observation Post</p>
          
          <p className="text-sm opacity-75 mb-7 leading-relaxed">
            Monitoring Japan from the Sea of Tranquility.<br />
            Live feed active. 384,400 km away.
          </p>
          
          <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 py-5 text-lg font-medium tracking-widest rounded-2xl hover:brightness-110 active:scale-95 transition-all">
            ENTER BASE　入基地
          </button>
        </div>
      </div>

      {/* FOOTER STATS */}
      <footer className="absolute bottom-6 left-6 right-6 z-50 flex justify-between text-[10px] font-mono uppercase tracking-widest opacity-60">
        <div>LUNAR CYCLE: WAXING GIBBOUS</div>
        <div>FEED: 08:42 JST | TEMP: -173°C | SOLAR ARRAY: 97%</div>
      </footer>
    </main>
  );
}
