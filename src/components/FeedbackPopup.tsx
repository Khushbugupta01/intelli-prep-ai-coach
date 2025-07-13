
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { X, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

export const FeedbackPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenFeedback = localStorage.getItem('hasSeenFeedback');
      if (!hasSeenFeedback) {
        setIsOpen(true);
      }
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (!rating && !feedback.trim()) {
      toast.error('Please provide a rating or feedback');
      return;
    }

    console.log('Feedback submitted:', { rating, feedback });
    toast.success('Thank you for your feedback!');
    
    localStorage.setItem('hasSeenFeedback', 'true');
    setIsOpen(false);
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenFeedback', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Quick Feedback
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            How's your experience with INTELLI-PREP so far?
          </p>
          
          <div className="flex gap-2">
            <Button
              variant={rating === 'positive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRating('positive')}
              className="flex-1"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Good
            </Button>
            <Button
              variant={rating === 'negative' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRating('negative')}
              className="flex-1"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              Needs Work
            </Button>
          </div>
          
          <Textarea
            placeholder="Any specific feedback? (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[80px]"
          />
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Skip
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
