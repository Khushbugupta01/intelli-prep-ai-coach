
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { toast } from "sonner";

interface VoiceAnalyzerProps {
  onAnalysisComplete: (analysis: VoiceAnalysis) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
}

interface VoiceAnalysis {
  wpm: number;
  pauseCount: number;
  fillerWords: number;
  volumeLevel: number;
  clarity: number;
  confidence: number;
}

export const VoiceAnalyzer = ({ onAnalysisComplete, isRecording, onToggleRecording }: VoiceAnalyzerProps) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(prev => prev + finalTranscript);
      };
    }
  }, []);

  const analyzeAudio = () => {
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    setVolumeLevel(average);

    animationRef.current = requestAnimationFrame(analyzeAudio);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio analysis
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 256;
      source.connect(analyserNode);
      
      setAudioContext(context);
      setAnalyser(analyserNode);
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      
      analyzeAudio();
      
      // Setup media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      toast.success("Voice analysis started");
    } catch (error) {
      toast.error("Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (audioContext) {
      audioContext.close();
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Analyze the recorded speech
    const analysis = analyzeTranscript(transcript);
    onAnalysisComplete(analysis);
    
    toast.success("Voice analysis completed");
  };

  const analyzeTranscript = (text: string): VoiceAnalysis => {
    const words = text.split(' ').filter(word => word.length > 0);
    const fillerWords = ['um', 'uh', 'like', 'you know', 'actually', 'basically'];
    const fillerCount = words.filter(word => 
      fillerWords.some(filler => word.toLowerCase().includes(filler))
    ).length;
    
    // Mock calculations - in real app, use more sophisticated analysis
    const wpm = words.length * 2; // Assuming 30-second recording
    const pauseCount = Math.floor(Math.random() * 5) + 1;
    const clarity = Math.max(70, 100 - (fillerCount * 5));
    const confidence = Math.max(60, 100 - (pauseCount * 3) - (fillerCount * 2));
    
    return {
      wpm,
      pauseCount,
      fillerWords: fillerCount,
      volumeLevel: Math.round(volumeLevel),
      clarity,
      confidence
    };
  };

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Voice Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Volume Level</span>
          <span className="text-sm text-muted-foreground">{Math.round(volumeLevel)}%</span>
        </div>
        <Progress value={volumeLevel} className="h-2" />
        
        <div className="flex items-center gap-2">
          <Button
            variant={isRecording ? "destructive" : "default"}
            onClick={onToggleRecording}
            className="flex-1"
          >
            {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
            {isRecording ? "Stop Analysis" : "Start Voice Analysis"}
          </Button>
        </div>
        
        {transcript && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Live Transcript:</p>
            <p className="text-sm text-muted-foreground">{transcript}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
