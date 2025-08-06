import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { useSubscription } from "@/hooks/useSubscription";

const SUBSCRIPTION_PLANS = [
  {
    title: "Basic",
    description: "Perfect for getting started",
    price: "$9.99",
    priceAmount: 999,
    features: [
      "Up to 10 projects",
      "Basic support",
      "Core features",
      "Mobile app access"
    ]
  },
  {
    title: "Premium", 
    description: "Most popular for growing businesses",
    price: "$19.99",
    priceAmount: 1999,
    features: [
      "Unlimited projects",
      "Priority support", 
      "Advanced features",
      "Team collaboration",
      "Analytics dashboard",
      "API access"
    ],
    isPopular: true
  },
  {
    title: "Enterprise",
    description: "For large organizations",
    price: "$49.99", 
    priceAmount: 4999,
    features: [
      "Everything in Premium",
      "Custom integrations",
      "Dedicated support",
      "SSO authentication",
      "Advanced security",
      "Custom contracts"
    ]
  }
];

const Index = () => {
  const [email, setEmail] = useState('');
  const { subscriptionData, isLoading, checkSubscription, createCheckout, openCustomerPortal } = useSubscription();

  useEffect(() => {
    if (email) {
      checkSubscription(email);
    }
  }, [email, checkSubscription]);

  const handleSubscribe = (priceAmount: number) => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    createCheckout(email, priceAmount);
  };

  const getCurrentPlan = () => {
    if (!subscriptionData.subscribed) return null;
    return subscriptionData.subscription_tier;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Subscription Plan</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start with our flexible pricing plans designed to grow with your business
            </p>
            
            {/* Email Input */}
            <div className="max-w-md mx-auto mb-8">
              <Label htmlFor="email" className="text-base font-medium">
                Enter your email to get started
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          {/* Subscription Status */}
          {email && (
            <SubscriptionStatus
              email={email}
              subscribed={subscriptionData.subscribed}
              subscriptionTier={subscriptionData.subscription_tier}
              subscriptionEnd={subscriptionData.subscription_end}
              onRefresh={() => checkSubscription(email)}
              onManageSubscription={() => openCustomerPortal(email)}
              isLoading={isLoading}
            />
          )}

          {/* Subscription Plans */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {SUBSCRIPTION_PLANS.map((plan, index) => (
              <SubscriptionCard
                key={index}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                isPopular={plan.isPopular}
                isCurrentPlan={getCurrentPlan() === plan.title}
                onSubscribe={() => handleSubscribe(plan.priceAmount)}
              />
            ))}
          </div>
          
          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>All plans include a 30-day money-back guarantee</p>
            <p className="mt-2">Powered by Stripe for secure payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
