import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImagePlus, Mic, Upload, ArrowRight } from 'lucide-react';

interface InputScreenProps {
  onNext: () => void;
}

export function InputScreen({ onNext }: InputScreenProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [keywords, setKeywords] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop recording
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

        {/* Upload Product Image */}
        <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImagePlus className="w-5 h-5 text-primary" />
              Upload Product Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Great! Your product image is ready
                  </p>
                </div>
              ) : (
                <div 
                  className="h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border"
                  style={{ backgroundColor: 'var(--color-pastel-mint)' }}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
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
            <div className="flex gap-3">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={toggleRecording}
                className="flex items-center gap-2"
              >
                <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
                {isRecording ? 'Stop Recording' : 'Record Voice Note'}
              </Button>
            </div>
            
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
            disabled={!imagePreview || (!keywords && !isRecording)}
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