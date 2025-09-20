import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  maxSpeed?: number;
}

export const SpeedControl = ({ speed, onSpeedChange, maxSpeed = 200 }: SpeedControlProps) => {
  const presetSpeeds = [
    { label: 'Calm', value: 0 },
    { label: 'Light Breeze', value: 8 },
    { label: 'Moderate', value: 20 },
    { label: 'Strong', value: 35 },
    { label: 'Gale', value: 50 },
    { label: 'Hurricane', value: 100 },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Speed Control</h3>
      
      {/* Slider */}
      <div className="mb-6">
        <div className="mb-2 text-sm text-muted-foreground">
          Adjust Speed: {speed.toFixed(1)} knots
        </div>
        <Slider
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0])}
          max={maxSpeed}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Preset buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {presetSpeeds.map((preset) => (
          <Button
            key={preset.label}
            variant={Math.abs(speed - preset.value) < 1 ? "default" : "secondary"}
            size="sm"
            onClick={() => onSpeedChange(preset.value)}
            className="text-xs"
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
};