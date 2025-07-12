
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Check, Star, Home, Shield, CreditCard } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "$9",
      yearlyPrice: "$7",
      period: "month",
      description: "Perfect for getting started",
      features: [
        "5 mock interviews per month",
        "Basic AI feedback",
        "Performance tracking",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      yearlyPrice: "$15",
      period: "month",
      description: "Best for serious job seekers",
      features: [
        "Unlimited mock interviews",
        "Advanced AI analysis",
        "Real-time voice feedback",
        "Facial expression analysis",
        "Custom question generation",
        "Priority support",
        "Progress analytics"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      yearlyPrice: "$39",
      period: "month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Custom branding",
        "API access",
        "Advanced reporting",
        "Dedicated support",
        "Custom integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upgrade your interview preparation with advanced features
          </p>
          
          {/* Monthly/Yearly Toggle Placeholder */}
          <div className="flex items-center justify-center mb-8">
            <span className="text-sm text-gray-600">Save 20% with yearly billing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 border rounded-lg transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-blue-500 bg-blue-50 scale-105"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Save with yearly: {plan.yearlyPrice}/{plan.period}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Elements */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              SSL Secured
            </div>
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-1" />
              Stripe Supported
            </div>
            <span>✓ No setup fees</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
