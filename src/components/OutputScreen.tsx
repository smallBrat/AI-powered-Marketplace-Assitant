import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  ImageIcon, 
  FileText, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  Download 
} from 'lucide-react';

interface OutputScreenProps {
  onNext: () => void;
}

export function OutputScreen({ onNext }: OutputScreenProps) {
  // Mock AI-generated content
  const enhancedImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop";
  
  const productDescription = `Handcrafted Ceramic Coffee Mug - Ocean Blue Glaze

This beautiful ceramic mug is handcrafted with love and attention to detail. The stunning ocean blue glaze creates a unique, one-of-a-kind piece that brings tranquility to your morning coffee ritual. 

✨ Features:
• Premium stoneware construction for durability
• Microwave and dishwasher safe
• Comfortable ergonomic handle
• 12oz capacity - perfect for coffee or tea
• Food-safe, lead-free glaze

Each mug is individually hand-thrown on the potter's wheel, making every piece slightly unique. The ocean blue glaze reminds you of peaceful waves and clear skies with every sip.`;

  const brandStory = `The Story Behind Your Creation

In a small studio overlooking the coast, this mug was born from a moment of inspiration. The artisan, watching the morning waves crash against the shore, was captivated by the way the ocean's blue merged with the sky. 

This ceramic piece carries that very essence - the calming blue of endless horizons and the warmth of a craftsperson's hands. Each curve was shaped with intention, each glaze stroke applied with care.

When you hold this mug, you're not just holding a vessel for your favorite beverage. You're holding a piece of coastal serenity, a moment of peace crafted just for you. It's the perfect companion for quiet mornings, creative afternoons, or cozy evenings by the fire.

This isn't just a mug - it's a daily reminder to pause, breathe, and appreciate the simple beauty in life.`;

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--color-pastel-peach)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl">Your AI-Generated Package</h1>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Review your enhanced product materials below
          </p>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            ✅ Processing Complete
          </Badge>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Enhanced Image */}
          <Card className="lg:row-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Enhanced Product Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <img
                  src={enhancedImage}
                  alt="Enhanced product"
                  className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-md"
                />
                <div className="absolute top-2 right-2">
                  <Button size="sm" variant="outline" className="bg-white/90">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div 
                className="p-3 rounded-lg text-sm"
                style={{ backgroundColor: 'var(--color-pastel-yellow)' }}
              >
                <p>
                  <strong>AI Enhancements:</strong> Improved lighting, color saturation, 
                  and background optimization for marketplace appeal.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Product Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 pr-4">
                <div className="whitespace-pre-line text-sm leading-relaxed">
                  {productDescription}
                </div>
              </ScrollArea>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">SEO Optimized</Badge>
                <Badge variant="outline">Marketplace Ready</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Brand Story */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Brand Storytelling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 pr-4">
                <div className="whitespace-pre-line text-sm leading-relaxed">
                  {brandStory}
                </div>
              </ScrollArea>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">Emotional Connection</Badge>
                <Badge variant="outline">Brand Building</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Stats */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--color-pastel-blue)' }}
              >
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Quality Score</div>
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--color-pastel-pink)' }}
              >
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Keywords Used</div>
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--color-pastel-yellow)' }}
              >
                <div className="text-2xl font-bold text-primary">8.9</div>
                <div className="text-sm text-muted-foreground">Engagement Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={onNext}
            className="px-8 py-3"
          >
            Review & Edit
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}