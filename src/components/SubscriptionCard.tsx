import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface SubscriptionCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  onSubscribe: () => void;
  isCurrentPlan?: boolean;
}

export const SubscriptionCard = ({ 
  title, 
  description, 
  price, 
  features, 
  isPopular, 
  onSubscribe,
  isCurrentPlan 
}: SubscriptionCardProps) => {
  return (
    <Card className={`relative transition-all duration-300 hover:scale-105 ${
      isPopular ? 'border-primary shadow-lg' : ''
    } ${isCurrentPlan ? 'border-green-500 bg-green-50/30' : ''}`}>
      {isPopular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
          Most Popular
        </Badge>
      )}
      {isCurrentPlan && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500">
          Current Plan
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onSubscribe}
          className="w-full"
          variant={isPopular ? "default" : "outline"}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : "Subscribe Now"}
        </Button>
      </CardContent>
    </Card>
  );
};