interface SpeedCategoryProps {
  speed: number;
}

export const SpeedCategory = ({ speed }: SpeedCategoryProps) => {
  const getCategory = (speed: number) => {
    if (speed < 1) return { name: "Calm", color: "text-muted-foreground", description: "No air movement" };
    if (speed < 7) return { name: "Light Air", color: "text-primary", description: "Smoke drifts" };
    if (speed < 13) return { name: "Light Breeze", color: "text-primary", description: "Leaves rustle" };
    if (speed < 19) return { name: "Gentle Breeze", color: "text-primary", description: "Leaves move constantly" };
    if (speed < 25) return { name: "Moderate Breeze", color: "text-accent", description: "Small branches move" };
    if (speed < 32) return { name: "Fresh Breeze", color: "text-accent", description: "Small trees sway" };
    if (speed < 39) return { name: "Strong Breeze", color: "text-accent", description: "Large branches move" };
    if (speed < 47) return { name: "Near Gale", color: "text-destructive", description: "Whole trees move" };
    if (speed < 55) return { name: "Gale", color: "text-destructive", description: "Twigs break off" };
    if (speed < 64) return { name: "Strong Gale", color: "text-destructive", description: "Slight structural damage" };
    if (speed < 73) return { name: "Storm", color: "text-destructive", description: "Trees uprooted" };
    return { name: "Hurricane", color: "text-destructive", description: "Widespread damage" };
  };

  const category = getCategory(speed);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-3">Wind Condition</h3>
      <div className={`text-2xl font-bold ${category.color} mb-2`}>
        {category.name}
      </div>
      <div className="text-sm text-muted-foreground">
        {category.description}
      </div>
      
      {/* Visual indicator */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-6 rounded-full transition-all duration-500 ${
                i < Math.ceil(speed / 20) 
                  ? category.color.replace('text-', 'bg-').replace('destructive', 'destructive').replace('accent', 'accent').replace('primary', 'primary').replace('muted-foreground', 'muted')
                  : 'bg-border'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          Intensity
        </span>
      </div>
    </div>
  );
};