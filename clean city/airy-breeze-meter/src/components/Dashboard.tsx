import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from './StatsCard';
import { IssueCard } from './IssueCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Search, Filter } from 'lucide-react';

const mockIssues = [
  {
    id: 'CMP-2024-001',
    type: 'pothole',
    status: 'pending' as const,
    description: 'Large pothole on Main Street causing traffic issues. Water accumulates during rain.',
    location: 'Main Street, Block A',
    reportedBy: 'John Doe',
    reportedAt: '2024-01-15',
    photo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
  },
  {
    id: 'CMP-2024-002',
    type: 'streetlight',
    status: 'in-progress' as const,
    description: 'Street light not working for the past week. Area becomes very dark at night.',
    location: 'Park Avenue, Near City Mall',
    reportedBy: 'Sarah Smith',
    reportedAt: '2024-01-14',
  },
  {
    id: 'CMP-2024-003',
    type: 'garbage',
    status: 'resolved' as const,
    description: 'Garbage not collected for 3 days. Starting to smell bad.',
    location: 'Green Valley, Sector 12',
    reportedBy: 'Mike Johnson',
    reportedAt: '2024-01-13',
  },
];

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesType = typeFilter === 'all' || issue.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: mockIssues.length,
    pending: mockIssues.filter(i => i.status === 'pending').length,
    inProgress: mockIssues.filter(i => i.status === 'in-progress').length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Issues"
          value={stats.total}
          description="All reported issues"
          icon={TrendingUp}
          trend={{ value: 12, label: 'from last month' }}
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          description="Awaiting action"
          icon={Clock}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          description="Being resolved"
          icon={AlertTriangle}
        />
        <StatsCard
          title="Resolved"
          value={stats.resolved}
          description="Successfully fixed"
          icon={CheckCircle}
          trend={{ value: 8, label: 'this week' }}
        />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pothole">Pothole</SelectItem>
            <SelectItem value="garbage">Garbage</SelectItem>
            <SelectItem value="streetlight">Street Light</SelectItem>
            <SelectItem value="drainage">Drainage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Issues Grid */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="space-y-4">
          <div className="space-y-4">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="civic-card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{issue.id}</h3>
                      <Badge className={
                        issue.status === 'resolved' ? 'bg-success text-success-foreground' :
                        issue.status === 'in-progress' ? 'bg-info text-info-foreground' :
                        'bg-warning text-warning-foreground'
                      }>
                        {issue.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                    <p className="text-xs text-muted-foreground">{issue.location} • {issue.reportedBy}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(issue.reportedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No issues found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}