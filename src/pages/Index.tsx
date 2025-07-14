import { ThemeToggle } from "@/components/ThemeToggle";
import { FeedbackPopup } from "@/components/FeedbackPopup";
import { HeroSection } from "@/components/HeroSection";
import { BentoGrid } from "@/components/BentoGrid";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Target, BarChart3, Users, Star, CheckCircle, ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "This platform helped me land my dream job! The AI feedback was incredibly detailed and actionable.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager at Meta",
      content: "The mock interviews felt so real. I gained confidence and improved my storytelling skills significantly.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer at Apple",
      content: "Amazing tool for interview prep. The personalized feedback helped me identify and fix my weaknesses.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Mock Interviews",
      description: "Practice with our advanced AI that adapts to your industry and role, providing realistic interview scenarios."
    },
    {
      icon: Target,
      title: "Personalized Feedback",
      description: "Get detailed analysis of your responses, body language, and speech patterns with actionable improvement tips."
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your improvement over time with comprehensive analytics and performance insights."
    },
    {
      icon: Users,
      title: "Industry-Specific Practice",
      description: "Access tailored questions for tech, finance, healthcare, and other major industries."
    }
  ];

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">InterviewAce</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button variant="coral" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-background border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.href);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex space-x-2 px-3 py-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                    Sign In
                  </Button>
                  <Button variant="coral" size="sm" onClick={() => navigate("/signup")}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="pt-16">

        {/* Hero Section */}
        <HeroSection />

        {/* Bento Grid Dashboard Preview */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Your Personal Interview Coach
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience our intuitive dashboard designed to nurture your growth and track your progress.
              </p>
            </div>
            <BentoGrid />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform provides all the tools and insights you need to excel in any interview.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 neumorphic"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Loved by Job Seekers Worldwide
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands who've transformed their interview skills and landed their dream jobs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="p-6 glass-card rounded-xl hover:shadow-lg transition-all duration-300 neumorphic"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful candidates who've used our platform to land their dream jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-4 text-lg font-semibold rounded-xl"
                onClick={() => navigate("/signup")}
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-4 text-lg rounded-xl border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => navigate("/pricing")}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted/50 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Brain className="h-8 w-8 text-primary mr-2" />
                  <span className="text-xl font-bold text-foreground">InterviewAce</span>
                </div>
                <p className="text-muted-foreground">
                  Empowering job seekers with AI-powered interview practice and feedback.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Product</h3>
                <div className="space-y-2">
                  <button onClick={() => navigate("/how-it-works")} className="block text-muted-foreground hover:text-primary transition-colors">
                    How It Works
                  </button>
                  <button onClick={() => navigate("/pricing")} className="block text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </button>
                  <button onClick={() => navigate("/faq")} className="block text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Support</h3>
                <div className="space-y-2">
                  <button onClick={() => navigate("/contact")} className="block text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </button>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-muted-foreground">
                © 2024 InterviewAce. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <FeedbackPopup />
    </div>
  );
};

export default Index;
