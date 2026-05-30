import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 w-full">
      
      {/* Left Side: Logo + Menu */}
      <div className="flex items-center gap-8 md:gap-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="text-4xl font-bold tracking-[4px] text-white">TSUKIBASE</div>
          <div className="text-red-500 text-xs tracking-[3px] -mt-1">月基地</div>
        </div>

        {/* Menu Links - Now on the LEFT */}
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-red-400 transition-colors">BASE STATUS</a>
          <a href="#" className="hover:text-red-400 transition-colors">EARTH VIEW</a>
          <a href="#" className="hover:text-red-400 transition-colors">LOG</a>
          <a href="https://www.lunararray.com" className="hover:text-red-400 transition-colors">LUNARARRAY</a>
        </div>
      </div>

      {/* Right side empty for now (can add language switch or login later) */}
      <div></div>
    </nav>
  );
}
