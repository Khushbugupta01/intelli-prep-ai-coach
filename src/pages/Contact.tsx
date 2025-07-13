
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about INTELLI-PREP? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <ContactForm />

        {/* Additional Contact Info */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-muted-foreground">support@intelli-prep.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sales</h3>
              <p className="text-muted-foreground">sales@intelli-prep.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Partnership</h3>
              <p className="text-muted-foreground">partners@intelli-prep.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
