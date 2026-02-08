const ChocolateDrip = () => {
  return (
    <div className="w-full overflow-hidden leading-none -mt-1 relative z-10">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
      >
        <path
          d="M0,0 L0,40 Q60,80 120,40 Q150,20 180,40 Q210,60 240,40 Q300,0 360,40 Q390,55 420,40 Q480,10 540,40 Q570,60 600,40 Q660,0 720,40 Q780,75 840,40 Q870,20 900,40 Q960,70 1020,40 Q1050,25 1080,40 Q1140,65 1200,40 Q1260,10 1320,40 Q1380,55 1440,40 L1440,0 Z"
          className="chocolate-drip-path"
        />
        {/* Drip drops */}
        <ellipse cx="180" cy="62" rx="5" ry="8" className="chocolate-drip-drop animate-drip-1" />
        <ellipse cx="540" cy="58" rx="4" ry="7" className="chocolate-drip-drop animate-drip-2" />
        <ellipse cx="900" cy="65" rx="5" ry="9" className="chocolate-drip-drop animate-drip-3" />
        <ellipse cx="1260" cy="55" rx="4" ry="6" className="chocolate-drip-drop animate-drip-4" />
      </svg>
    </div>
  );
};

export default ChocolateDrip;
