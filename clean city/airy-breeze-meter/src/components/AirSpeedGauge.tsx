import { useEffect, useState } from 'react';

interface AirSpeedGaugeProps {
  speed: number;
  maxSpeed?: number;
}

export const AirSpeedGauge = ({ speed, maxSpeed = 200 }: AirSpeedGaugeProps) => {
  const [displaySpeed, setDisplaySpeed] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplaySpeed(speed);
    }, 100);
    return () => clearTimeout(timer);
  }, [speed]);

  // Calculate needle rotation (gauge shows 0-270 degrees)
  const needleRotation = (displaySpeed / maxSpeed) * 270 - 135;
  
  // Generate tick marks
  const tickMarks = Array.from({ length: 21 }, (_, i) => {
    const value = (i * maxSpeed) / 20;
    const angle = (i * 270) / 20 - 135;
    const isMainTick = i % 4 === 0;
    
    return (
      <g key={i}>
        <line
          x1="45%"
          y1="50%"
          x2={isMainTick ? "40%" : "42%"}
          y2="50%"
          stroke="currentColor"
          strokeWidth={isMainTick ? "2" : "1"}
          className="text-muted-foreground"
          transform={`rotate(${angle} 50 50)`}
        />
        {isMainTick && (
          <text
            x="35%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs text-muted-foreground font-mono"
            transform={`rotate(${angle} 50 50) rotate(-${angle} 35 50)`}
          >
            {Math.round(value)}
          </text>
        )}
      </g>
    );
  });

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-gauge-center/20 blur-xl animate-pulse" />
      
      {/* Main gauge container */}
      <div className="relative w-full h-full bg-gauge-bg border-2 border-gauge-border rounded-full shadow-2xl overflow-hidden">
        {/* Gradient background */}
        <div 
          className="absolute inset-4 rounded-full opacity-30"
          style={{
            background: 'var(--gradient-radial)'
          }}
        />
        
        {/* SVG gauge */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Speed zones background arcs */}
          <path
            d="M 25 75 A 25 25 0 0 1 75 25"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            opacity="0.3"
            className="drop-shadow-sm"
          />
          <path
            d="M 75 25 A 25 25 0 0 1 85 50"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="8"
            opacity="0.3"
            className="drop-shadow-sm"
          />
          <path
            d="M 85 50 A 25 25 0 0 1 75 75"
            fill="none"
            stroke="hsl(var(--destructive))"
            strokeWidth="8"
            opacity="0.3"
            className="drop-shadow-sm"
          />
          
          {/* Tick marks and numbers */}
          {tickMarks}
          
          {/* Center dot */}
          <circle
            cx="50"
            cy="50"
            r="3"
            fill="hsl(var(--gauge-center))"
            className="drop-shadow-lg"
          />
          
          {/* Needle */}
          <line
            x1="50"
            y1="50"
            x2="20"
            y2="50"
            stroke="hsl(var(--gauge-needle))"
            strokeWidth="3"
            strokeLinecap="round"
            className="drop-shadow-lg transition-all duration-[1200ms] ease-out"
            style={{
              transform: `rotate(${needleRotation}deg)`,
              transformOrigin: '50% 50%',
              filter: 'drop-shadow(0 0 8px hsl(var(--gauge-needle)))'
            }}
          />
        </svg>
        
        {/* Center label */}
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-xs text-muted-foreground font-mono">AIRSPEED</div>
          <div className="text-xs text-muted-foreground font-mono">KNOTS</div>
        </div>
      </div>
    </div>
  );
};