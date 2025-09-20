import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin, Calendar, User } from 'lucide-react';

interface Issue {
  id: string;
  type: string;
  status: 'pending' | 'in-progress' | 'resolved';
  description: string;
  location: string;
  reportedBy: string;
  reportedAt: string;
  photo?: string;
}

interface IssueCardProps {
  issue: Issue;
}

const statusConfig = {
  'pending': { color: 'bg-warning text-warning-foreground', label: 'Pending' },
  'in-progress': { color: 'bg-info text-info-foreground', label: 'In Progress' },
  'resolved': { color: 'bg-success text-success-foreground', label: 'Resolved' },
};

const typeIcons = {
  'pothole': '🕳️',
  'garbage': '🗑️',
  'streetlight': '💡',
  'drainage': '🌊',
  'other': '⚠️',
};

export function IssueCard({ issue }: IssueCardProps) {
  const statusInfo = statusConfig[issue.status];
  const typeIcon = typeIcons[issue.type as keyof typeof typeIcons] || '⚠️';

  return (
    <Card className="civic-card hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeIcon}</span>
            <div>
              <h3 className="font-semibold capitalize">{issue.type.replace('-', ' ')}</h3>
              <p className="text-sm text-muted-foreground">ID: {issue.id}</p>
            </div>
          </div>
          <Badge className={statusInfo.color}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {issue.photo && (
          <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
            <img 
              src={issue.photo} 
              alt="Issue evidence" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <p className="text-sm text-foreground">{issue.description}</p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Reported by {issue.reportedBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(issue.reportedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}