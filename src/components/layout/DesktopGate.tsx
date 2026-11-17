import React, { useState, useEffect } from 'react';
import { Smartphone, Heart } from 'lucide-react';

interface DesktopGateProps {
  children: React.ReactNode;
}

export const DesktopGate: React.FC<DesktopGateProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <div className="min-h-screen bg-[#07030d] text-rose-100 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Desktop Helper Banner (Displayed exclusively on wide desktop screens) */}
      {isDesktop && (
        <aside aria-label="Device reminder" className="w-full bg-gradient-to-r from-burgundy-950/90 via-black/90 to-burgundy-950/90 border-b border-rose-500/20 py-2 px-4 text-center text-xs text-rose-300 font-serif flex items-center justify-center gap-2 z-50">
          <Smartphone className="w-3.5 h-3.5 text-champagne-300 animate-pulse" />
          <span>Mobile Experience Preview • Centered 430px Frame • For the most magical romantic experience, open on smartphone</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </aside>
      )}

      {/* Centered Mobile App Experience */}
      <div className="w-full flex justify-center flex-1">
        {children}
      </div>
    </div>
  );
};
