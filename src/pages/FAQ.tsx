
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { Search, Home } from "lucide-react";

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How does the AI feedback system work?",
      answer: "Our AI analyzes your voice patterns, facial expressions, and response content to provide comprehensive feedback on communication skills, confidence levels, and technical accuracy."
    },
    {
      question: "What types of interviews can I practice?",
      answer: "You can practice both technical and HR interviews across various domains including software engineering, product management, data science, and more."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we use enterprise-grade encryption and follow strict data privacy protocols. Your interview recordings and personal data are never shared with third parties."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time. There are no cancellation fees or long-term commitments."
    },
    {
      question: "How many interviews can I take per month?",
      answer: "It depends on your plan. Starter includes 5 interviews, Pro offers unlimited interviews, and Enterprise includes team management features."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, all plans come with a 14-day free trial. No credit card required to start."
    },
    {
      question: "What devices are supported?",
      answer: "INTELLI-PREP works on all modern browsers and devices including desktop, laptop, tablet, and mobile phones."
    },
    {
      question: "How accurate is the AI feedback?",
      answer: "Our AI has been trained on thousands of successful interviews and provides 95%+ accuracy in feedback quality and relevance."
    },
    {
      question: "Can I upload my own resume?",
      answer: "Yes, you can upload your resume in PDF or DOCX format, and our AI will generate personalized questions based on your experience."
    },
    {
      question: "Is there customer support available?",
      answer: "We offer email support for all users, priority support for Pro users, and dedicated support for Enterprise customers."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions about INTELLI-PREP
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Questions & Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No questions found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
