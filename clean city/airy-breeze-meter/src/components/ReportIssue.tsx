import { useState } from 'react';
import { Camera, MapPin, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const issueTypes = [
  { value: 'pothole', label: 'Pothole', icon: '🕳️' },
  { value: 'garbage', label: 'Garbage Collection', icon: '🗑️' },
  { value: 'streetlight', label: 'Street Light', icon: '💡' },
  { value: 'drainage', label: 'Drainage Issue', icon: '🌊' },
  { value: 'other', label: 'Other', icon: '⚠️' },
];

export function ReportIssue() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    photo: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Issue Reported Successfully! 🎉",
        description: "Your complaint has been submitted. Tracking ID: #CMP-2024-001",
      });
      setFormData({ type: '', description: '', location: '', photo: null });
      setIsLoading(false);
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ 
            ...formData, 
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
          });
          toast({
            title: "Location Captured",
            description: "Your current location has been added to the report.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto civic-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl gradient-text">Report a Civic Issue</CardTitle>
        <p className="text-muted-foreground">Help make your city better by reporting issues</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Type */}
          <div className="space-y-2">
            <Label htmlFor="issue-type">Issue Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of the issue..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter location or coordinates"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={getCurrentLocation}
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photo Evidence</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {formData.photo ? (
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-success" />
                  </div>
                  <p className="text-sm text-success font-medium">{formData.photo.name}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, photo: null })}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('photo-upload')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!formData.type || !formData.description || !formData.location || isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}