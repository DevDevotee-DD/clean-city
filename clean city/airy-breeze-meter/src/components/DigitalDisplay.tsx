interface DigitalDisplayProps {
  speed: number;
  unit?: string;
}

export const DigitalDisplay = ({ speed, unit = "knots" }: DigitalDisplayProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-2 font-mono tracking-wider">
          {speed.toFixed(1)}
        </div>
        <div className="text-sm text-muted-foreground uppercase tracking-wide">
          {unit}
        </div>
        <div className="mt-4 h-1 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-accent to-destructive transition-all duration-1000 ease-out"
            style={{ width: `${Math.min((speed / 200) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};