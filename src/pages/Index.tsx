
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Mic, FileText, BarChart3, Users, Award, ArrowRight, CheckCircle, Star, Play, Eye, Target, Menu, X } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStartInterview = async () => {
    setIsStarting(true);
    toast.success("Initializing advanced interview preparation...");
    setTimeout(() => {
      navigate("/dashboard");
      setIsStarting(false);
    }, 1500);
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms analyze your responses for grammar, fluency, and confidence"
    },
    {
      icon: <Mic className="h-8 w-8 text-green-600" />,
      title: "Voice & Text Input",
      description: "Practice with both voice recordings and text responses for maximum flexibility"
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Resume Analysis",
      description: "Upload your resume to generate personalized interview questions"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Detailed Feedback",
      description: "Comprehensive reports with actionable insights and improvement tips"
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "HR & Technical",
      description: "Practice both behavioral and technical interview scenarios"
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-600" />,
      title: "Progress Tracking",
      description: "Monitor your improvement over time with detailed analytics"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      comment: "INTELLI-PREP helped me land my dream job! The AI feedback was incredibly accurate.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager at Meta",
      comment: "The personalized questions based on my resume were spot-on. Highly recommend!",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Data Scientist at Netflix",
      comment: "The confidence analysis feature really helped me improve my presentation skills.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                INTELLI-PREP
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" onClick={() => navigate("/how-it-works")}>
                How It Works
              </Button>
              <Button variant="ghost" onClick={() => navigate("/pricing")}>
                Pricing
              </Button>
              <Button variant="ghost" onClick={() => navigate("/faq")}>
                FAQ
              </Button>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Sign Up
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col space-y-2">
                <Button variant="ghost" onClick={() => navigate("/how-it-works")} className="justify-start">
                  How It Works
                </Button>
                <Button variant="ghost" onClick={() => navigate("/pricing")} className="justify-start">
                  Pricing
                </Button>
                <Button variant="ghost" onClick={() => navigate("/faq")} className="justify-start">
                  FAQ
                </Button>
                <Button variant="ghost" onClick={() => navigate("/login")} className="justify-start">
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 justify-start">
                  Sign Up
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
            Next-Generation AI Interview Preparation
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Master Interviews with Advanced AI Analysis
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience cutting-edge interview preparation with real-time voice analysis, facial expression recognition, 
            and comprehensive performance metrics. Get personalized feedback that adapts to your unique style.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={handleStartInterview}
              disabled={isStarting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3 h-auto"
            >
              {isStarting ? (
                "Initializing AI..."
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/upload")}
              className="text-lg px-8 py-3 h-auto border-2"
            >
              <FileText className="mr-2 h-5 w-5" />
              Upload Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Advanced AI-Powered Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the next generation of interview preparation with cutting-edge AI technology that analyzes every aspect of your performance.
            </p>
          </div>
          
          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* New Advanced Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <Eye className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-2">Real-time Analysis</h3>
                <p className="text-blue-100">Live feedback on eye contact, posture, and confidence levels during your interview.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-600 to-blue-600 text-white">
              <CardContent className="p-6">
                <Brain className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-2">Advanced Scoring</h3>
                <p className="text-green-100">Multi-dimensional analysis of verbal and non-verbal communication patterns.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <CardContent className="p-6">
                <Target className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
                <p className="text-purple-100">Comprehensive dashboard with progress analytics and improvement suggestions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Success Stories</h3>
            <p className="text-gray-600">See how INTELLI-PREP has helped professionals land their dream jobs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50 border-0">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of professionals who have improved their interview skills with INTELLI-PREP
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={handleStartInterview}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 h-auto"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">INTELLI-PREP</span>
              </div>
              <p className="text-gray-400 mb-4">
                Advanced AI-powered interview preparation platform helping professionals land their dream jobs.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white" onClick={() => navigate("/how-it-works")}>How It Works</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white" onClick={() => navigate("/pricing")}>Pricing</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white" onClick={() => navigate("/dashboard")}>Dashboard</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white" onClick={() => navigate("/faq")}>FAQ</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Contact Us</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Support</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 INTELLI-PREP. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Privacy Policy</Button>
              <Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Terms of Service</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
