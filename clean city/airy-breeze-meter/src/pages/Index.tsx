import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroSection } from '@/components/HeroSection';
import { ReportIssue } from '@/components/ReportIssue';
import { Dashboard } from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { FileText, BarChart3, Home } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CC</span>
              </div>
              <span className="font-bold text-xl">Clean City</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('home')}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button
                variant={activeTab === 'report' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('report')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Report
              </Button>
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="mt-0">
            <HeroSection onReportClick={() => setActiveTab('report')} />
            
            {/* Features Section */}
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Simple steps to report civic issues and track their resolution
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                      1
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Report Issue</h3>
                    <p className="text-muted-foreground text-sm">
                      Take a photo, add location, and describe the civic issue you want to report
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-info rounded-full flex items-center justify-center text-info-foreground font-bold text-xl">
                      2
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Authority Review</h3>
                    <p className="text-muted-foreground text-sm">
                      Relevant authorities receive notification and prioritize the issue for resolution
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-success rounded-full flex items-center justify-center text-success-foreground font-bold text-xl">
                      3
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                    <p className="text-muted-foreground text-sm">
                      Monitor the status of your report and receive updates until resolution
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">1,247</div>
                    <div className="text-muted-foreground">Issues Reported</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-success mb-2">1,089</div>
                    <div className="text-muted-foreground">Issues Resolved</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-info mb-2">158</div>
                    <div className="text-muted-foreground">In Progress</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-warning mb-2">87%</div>
                    <div className="text-muted-foreground">Resolution Rate</div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="report" className="mt-0">
            <div className="py-12">
              <div className="container mx-auto px-4">
                <ReportIssue />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="mt-0">
            <div className="py-12">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Authority Dashboard</h1>
                  <p className="text-muted-foreground">Monitor and manage all civic issues reported by citizens</p>
                </div>
                <Dashboard />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">CC</span>
                </div>
                <span className="font-bold text-xl">Clean City</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making cities cleaner and better through citizen participation and transparent governance.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <div><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></div>
                <div><a href="#" className="text-muted-foreground hover:text-foreground">How It Works</a></div>
                <div><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <div className="space-y-2 text-sm">
                <div><a href="#" className="text-muted-foreground hover:text-foreground">Contact Us</a></div>
                <div><a href="#" className="text-muted-foreground hover:text-foreground">FAQs</a></div>
                <div><a href="#" className="text-muted-foreground hover:text-foreground">Guidelines</a></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Connect</h3>
              <div className="space-y-2 text-sm">
                <div><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></div>
                <div><a href="#" className="text-muted-foreground hover:text-foreground">Facebook</a></div>
                <div><a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Clean City. All rights reserved. Building better communities together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;