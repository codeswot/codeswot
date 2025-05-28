"use client"

import React, { useState, useEffect } from 'react';

interface ScreenNavigationCueProps {
  hoveredItemIndex: number | null;
  activeNavItem: number | null;
}

const CUE_DISPLAY_DURATION = 1500; // milliseconds (e.g., 1.5 seconds)

const ScreenNavigationCue: React.FC<ScreenNavigationCueProps> = ({ hoveredItemIndex, activeNavItem }) => {
  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState<string | null>(null);

  useEffect(() => {
    let currentText: string | null = null;
    if (hoveredItemIndex !== null) {
      currentText = `#${hoveredItemIndex}`;
    } else if (activeNavItem !== null) {
      currentText = `${activeNavItem}`;
    }

    if (currentText) {
      setDisplayText(currentText);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, CUE_DISPLAY_DURATION);

      return () => clearTimeout(timer);
    } else {
      setVisible(false); // Hide if no relevant props are set
    }
  }, [hoveredItemIndex, activeNavItem]);

  if (!visible || displayText === null) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-3 py-1.5 bg-[#1a2332] text-[#64FFDA] text-sm font-mono rounded-md shadow-lg border border-[#64FFDA]/50 transition-opacity duration-200 ease-in-out pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {displayText}
    </div>
  );
};

export default ScreenNavigationCue;
