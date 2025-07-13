
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { Search, Home, X } from "lucide-react";

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How does the AI feedback system work?",
      answer: "Our AI analyzes your voice patterns, facial expressions, and response content to provide comprehensive feedback on communication skills, confidence levels, and technical accuracy. The system uses advanced machine learning models trained on thousands of successful interviews.",
      category: "AI & Technology"
    },
    {
      question: "What types of interviews can I practice?",
      answer: "You can practice both technical and HR interviews across various domains including software engineering, product management, data science, marketing, finance, consulting, and more. We offer industry-specific question banks.",
      category: "Features"
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we use enterprise-grade encryption and follow strict data privacy protocols. Your interview recordings and personal data are never shared with third parties. All data is encrypted in transit and at rest.",
      category: "Privacy & Security"
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time through your account settings. There are no cancellation fees or long-term commitments. Your access will continue until the end of your billing period.",
      category: "Billing"
    },
    {
      question: "How many interviews can I take per month?",
      answer: "It depends on your plan. Starter includes 5 interviews, Pro offers unlimited interviews, and Enterprise includes team management features with custom limits based on your organization's needs.",
      category: "Plans & Pricing"
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, all plans come with a 14-day free trial. No credit card required to start. You'll have full access to all features during the trial period.",
      category: "Plans & Pricing"
    },
    {
      question: "What devices are supported?",
      answer: "INTELLI-PREP works on all modern browsers and devices including desktop, laptop, tablet, and mobile phones. We recommend Chrome, Firefox, Safari, or Edge for the best experience.",
      category: "Technical Requirements"
    },
    {
      question: "How accurate is the AI feedback?",
      answer: "Our AI has been trained on thousands of successful interviews and provides 95%+ accuracy in feedback quality and relevance. The system continuously learns and improves from user interactions.",
      category: "AI & Technology"
    },
    {
      question: "Can I upload my own resume?",
      answer: "Yes, you can upload your resume in PDF or DOCX format, and our AI will generate personalized questions based on your experience, skills, and career goals. The system supports multiple file formats.",
      category: "Features"
    },
    {
      question: "Is there customer support available?",
      answer: "We offer email support for all users, priority support for Pro users, and dedicated support for Enterprise customers. Our support team typically responds within 24 hours.",
      category: "Support"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about INTELLI-PREP
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="relative max-w-lg mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search questions, answers, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              aria-label="Search FAQ"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <p className="text-sm text-muted-foreground mb-4">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found for "{searchQuery}"
            </p>
          )}
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Questions & Answers</CardTitle>
            {!searchQuery && (
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded transition-colors duration-200">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{faq.question}</span>
                      <span className="text-xs text-muted-foreground mt-1">{faq.category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pt-2">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No questions found matching your search.</p>
                <Button variant="outline" onClick={clearSearch}>
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Contact Support
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/signup")}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
