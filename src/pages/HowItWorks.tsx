
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, User, MessageSquare, BarChart3, ArrowRight, Home } from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Sign up and create your personalized interview preparation profile with your career goals and experience level",
      icon: <User className="h-8 w-8 text-blue-600" />
    },
    {
      step: 2,
      title: "Choose Domain & Level",
      description: "Select your interview type and difficulty level based on your experience and target role",
      icon: <Brain className="h-8 w-8 text-green-600" />
    },
    {
      step: 3,
      title: "Practice Mock Interviews",
      description: "Engage with AI-powered interviews tailored to your selected domain and receive real-time feedback",
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />
    },
    {
      step: 4,
      title: "Receive AI Feedback",
      description: "Get comprehensive performance analysis and actionable improvement suggestions for your next interview",
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b" role="banner">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
            aria-label="Go back to home page"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How INTELLI-PREP Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your interview skills in 4 simple steps with our comprehensive AI-powered platform
          </p>
        </div>

        <section aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="sr-only">Interview preparation steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full w-16 h-16 flex items-center justify-center">
                    <div aria-hidden="true">{step.icon}</div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm" aria-label={`Step ${step.step}`}>
                    {step.step}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="text-center space-y-4">
          <Button
            size="lg"
            onClick={() => navigate("/interview")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3 h-auto"
            aria-label="Start your first interview practice session"
          >
            Start Interview Practice
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
          <div className="text-sm text-gray-600">
            <Button
              variant="link"
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-700"
              aria-label="Sign up for free trial"
            >
              Sign Up for Free Trial
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
