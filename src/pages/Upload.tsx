
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload as UploadIcon, FileText, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.type === "application/pdf" || uploadedFile.name.endsWith(".pdf")) {
        setFile(uploadedFile);
        toast.success("Resume uploaded successfully!");
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf")) {
        setFile(droppedFile);
        toast.success("Resume uploaded successfully!");
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const processResume = async () => {
    if (!file || !jobRole || !experience) {
      toast.error("Please fill all fields and upload a resume.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock extracted data
      const mockData = {
        skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning", "SQL"],
        experiences: [
          "Software Developer at TechCorp (2020-2023)",
          "Frontend Developer at StartupXYZ (2018-2020)",
          "Intern at DataCompany (2017-2018)"
        ],
        education: [
          "Master of Science in Computer Science - Stanford University (2017)",
          "Bachelor of Engineering in Computer Science - UC Berkeley (2015)"
        ],
        certifications: [
          "AWS Certified Solutions Architect",
          "Google Cloud Professional",
          "Certified Scrum Master"
        ],
        generatedQuestions: [
          {
            type: "Technical",
            question: `Based on your experience with ${jobRole}, can you explain a challenging project where you used JavaScript and React?`,
            category: "Technical Experience"
          },
          {
            type: "HR",
            question: "How has your transition from frontend to full-stack development shaped your career goals?",
            category: "Career Progression"
          },
          {
            type: "Technical",
            question: "Describe your experience with machine learning and how you've applied it in real-world projects.",
            category: "Domain Expertise"
          },
          {
            type: "HR",
            question: "What attracts you to this specific role and how does it align with your career aspirations?",
            category: "Role Fit"
          },
          {
            type: "Technical",
            question: "How would you approach scaling a Node.js application to handle increased traffic?",
            category: "System Design"
          }
        ]
      };

      setExtractedData(mockData);
      setIsProcessed(true);
      setIsProcessing(false);
      toast.success("Resume processed successfully! Custom questions generated.");
    }, 3000);
  };

  const startCustomInterview = () => {
    // Store custom questions for the interview
    localStorage.setItem('customQuestions', JSON.stringify({
      questions: extractedData.generatedQuestions,
      jobRole: jobRole,
      experience: experience,
      skills: extractedData.skills
    }));
    
    toast.success("Starting personalized interview...");
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Upload Your Resume</h1>
          <p className="text-gray-600">Get personalized interview questions based on your experience and target role</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadIcon className="h-5 w-5" />
                Resume Upload
              </CardTitle>
              <CardDescription>
                Upload your resume in PDF format for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {file ? (
                  <div className="text-green-600">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                    <p className="font-semibold">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p className="font-semibold mb-2">Drop your resume here or click to browse</p>
                    <p className="text-sm">Supports PDF files up to 10MB</p>
                  </div>
                )}
              </div>

              {/* Job Details */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="jobRole">Target Job Role</Label>
                  <Input
                    id="jobRole"
                    placeholder="e.g., Senior Software Engineer, Product Manager"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select onValueChange={setExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                      <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={processResume} 
                disabled={!file || !jobRole || !experience || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Custom Questions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Analysis Results
              </CardTitle>
              <CardDescription>
                {isProcessed ? "Your personalized interview preparation is ready" : "Upload and process your resume to see results"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isProcessed && !isProcessing && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Upload your resume to get started</p>
                </div>
              )}

              {isProcessing && (
                <div className="text-center py-12">
                  <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="font-semibold">Analyzing your resume...</p>
                  <p className="text-sm text-gray-600">This may take a few moments</p>
                </div>
              )}

              {isProcessed && extractedData && (
                <div className="space-y-6">
                  {/* Skills */}
                  <div>
                    <h3 className="font-semibold mb-3">Extracted Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {extractedData.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Questions Preview */}
                  <div>
                    <h3 className="font-semibold mb-3">Generated Questions ({extractedData.generatedQuestions.length})</h3>
                    <div className="space-y-3">
                      {extractedData.generatedQuestions.slice(0, 3).map((q: any, index: number) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={q.type === "HR" ? "default" : "secondary"} className="text-xs">
                              {q.type}
                            </Badge>
                            <span className="text-xs text-gray-600">{q.category}</span>
                          </div>
                          <p className="text-sm text-blue-900">{q.question}</p>
                        </div>
                      ))}
                      {extractedData.generatedQuestions.length > 3 && (
                        <p className="text-sm text-gray-600 text-center">
                          +{extractedData.generatedQuestions.length - 3} more questions
                        </p>
                      )}
                    </div>
                  </div>

                  <Button onClick={startCustomInterview} className="w-full" size="lg">
                    Start Personalized Interview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UploadIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Upload Resume</h3>
                <p className="text-sm text-gray-600">Upload your PDF resume and specify your target role</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">Our AI extracts skills and generates relevant questions</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Practice</h3>
                <p className="text-sm text-gray-600">Start your personalized mock interview session</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
