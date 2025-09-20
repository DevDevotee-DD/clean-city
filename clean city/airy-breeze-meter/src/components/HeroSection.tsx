import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Zap } from 'lucide-react';

interface HeroSectionProps {
  onReportClick: () => void;
}

export function HeroSection({ onReportClick }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-info/5 to-success/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-info/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-success/10 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-slide-in-up">
            <span className="gradient-text">Clean City</span>
            <br />
            <span className="text-foreground">Civic Reporter</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            Empowering citizens to report civic issues and creating transparent governance for a better tomorrow
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              onClick={onReportClick}
              className="group hover-lift"
            >
              Report an Issue
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover-lift"
            >
              View Dashboard
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-fade-in-scale" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Reporting</h3>
              <p className="text-muted-foreground text-sm">
                Your reports are securely stored and tracked with complete privacy protection
              </p>
            </div>

            <div className="text-center animate-fade-in-scale" style={{ animationDelay: '0.8s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-info/10 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-info" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-muted-foreground text-sm">
                Real-time notifications and quick action from relevant authorities
              </p>
            </div>

            <div className="text-center animate-fade-in-scale" style={{ animationDelay: '1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
              <p className="text-muted-foreground text-sm">
                Built by the community, for the community to create lasting change
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}