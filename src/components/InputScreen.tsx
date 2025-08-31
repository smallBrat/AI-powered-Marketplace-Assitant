import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImagePlus, Mic, Upload, ArrowRight, Pause, Play, Square, Send, Headphones, CheckCircle } from 'lucide-react';

interface InputScreenProps {
  onNext: () => void;
}

export function InputScreen({ onNext }: InputScreenProps) {
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [keywords, setKeywords] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const previews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            previews.push(e.target.result as string);
            setMediaPreviews((prev) => [...prev, e.target?.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setIsStopped(false);
    setIsSubmitted(false);
  };

  const pauseRecording = () => {
    setIsPaused(true);
  };

  const resumeRecording = () => {
    setIsPaused(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setIsStopped(true);
    setIsSubmitted(false);
    setAudioUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"); // dummy audio
  };

  const submitRecording = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--color-pastel-lavender)' }}>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl">✨ AI Marketplace Assistant</h1>
          <p className="text-muted-foreground">
            Upload your product and let AI create compelling descriptions and stories
          </p>
        </div>

        {/* Upload Product Media */}
        <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImagePlus className="w-5 h-5 text-primary" />
              Upload Product Images / Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              {mediaPreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {mediaPreviews.map((preview, idx) => (
                    preview.startsWith("data:video") ? (
                      <video
                        key={idx}
                        src={preview}
                        controls
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        key={idx}
                        src={preview}
                        alt={`Preview ${idx}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )
                  ))}
                </div>
              ) : (
                <div 
                  className="h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border"
                  style={{ backgroundColor: 'var(--color-pastel-mint)' }}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to upload multiple files
                  </p>
                </div>
              )}
            </div>
            <Input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaUpload}
              className="cursor-pointer"
            />
          </CardContent>
        </Card>

        {/* Voice Note / Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-primary" />
              Add Voice Note or Keywords
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 flex-wrap">
              {!isRecording && !isStopped && !isSubmitted && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startRecording}
                  className="flex items-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Start Recording
                </Button>
              )}

              {isRecording && !isPaused && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={pauseRecording}
                    className="flex items-center gap-2"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={stopRecording}
                    className="flex items-center gap-2"
                  >
                    <Square className="w-4 h-4" />
                    Stop
                  </Button>
                </>
              )}

              {isRecording && isPaused && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resumeRecording}
                    className="flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Resume
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={stopRecording}
                    className="flex items-center gap-2"
                  >
                    <Square className="w-4 h-4" />
                    Stop
                  </Button>
                </>
              )}

              {isStopped && !isSubmitted && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {
                      if (audioUrl) {
                        const audio = new Audio(audioUrl);
                        audio.play();
                      }
                    }}
                  >
                    <Headphones className="w-4 h-4" />
                    Listen Recording
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={submitRecording}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Recording
                  </Button>
                </>
              )}
            </div>

            {/* Success message after submission */}
            {isSubmitted && (
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Record submitted successfully!
              </div>
            )}

            <div className="relative">
              <p className="text-sm text-muted-foreground mb-2">
                Or type keywords about your product:
              </p>
              <Textarea
                placeholder="e.g., handmade ceramic mug, blue glaze, kitchen decor, gift idea..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{ backgroundColor: 'var(--color-pastel-yellow)' }}
            >
              <p className="text-sm">
                💡 <strong>Tip:</strong> The more details you provide, the better AI can create 
                your product description and story!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={onNext}
            disabled={mediaPreviews.length === 0 || (!keywords && !isSubmitted)}
            className="px-8 py-3"
          >
            Continue to AI Processing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
