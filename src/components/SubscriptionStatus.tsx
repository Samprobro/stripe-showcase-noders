import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, RefreshCw } from "lucide-react";

interface SubscriptionStatusProps {
  email: string;
  subscribed: boolean;
  subscriptionTier?: string;
  subscriptionEnd?: string;
  onRefresh: () => void;
  onManageSubscription: () => void;
  isLoading?: boolean;
}

export const SubscriptionStatus = ({
  email,
  subscribed,
  subscriptionTier,
  subscriptionEnd,
  onRefresh,
  onManageSubscription,
  isLoading
}: SubscriptionStatusProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Status
            </CardTitle>
            <CardDescription>Managing subscription for {email}</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant={subscribed ? "default" : "secondary"}>
              {subscribed ? "Active" : "Inactive"}
            </Badge>
          </div>
          
          {subscriptionTier && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Plan:</span>
              <Badge variant="outline">{subscriptionTier}</Badge>
            </div>
          )}
        </div>
        
        {subscriptionEnd && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Renews on {formatDate(subscriptionEnd)}</span>
          </div>
        )}
        
        {subscribed && (
          <Button 
            variant="outline" 
            onClick={onManageSubscription}
            className="w-full"
          >
            Manage Subscription
          </Button>
        )}
      </CardContent>
    </Card>
  );
};