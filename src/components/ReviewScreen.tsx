import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Edit3, 
  Check, 
  RotateCcw, 
  ArrowRight,
  ImageIcon,
  Save
} from 'lucide-react';

interface ReviewScreenProps {
  onNext: () => void;
}

export function ReviewScreen({ onNext }: ReviewScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [productTitle, setProductTitle] = useState("Handcrafted Ceramic Coffee Mug - Ocean Blue Glaze");
  const [productDescription, setProductDescription] = useState(`This beautiful ceramic mug is handcrafted with love and attention to detail. The stunning ocean blue glaze creates a unique, one-of-a-kind piece that brings tranquility to your morning coffee ritual.

✨ Features:
• Premium stoneware construction for durability
• Microwave and dishwasher safe
• Comfortable ergonomic handle
• 12oz capacity - perfect for coffee or tea
• Food-safe, lead-free glaze

Each mug is individually hand-thrown on the potter's wheel, making every piece slightly unique. The ocean blue glaze reminds you of peaceful waves and clear skies with every sip.`);

  const [brandStory, setBrandStory] = useState(`In a small studio overlooking the coast, this mug was born from a moment of inspiration. The artisan, watching the morning waves crash against the shore, was captivated by the way the ocean's blue merged with the sky.

This ceramic piece carries that very essence - the calming blue of endless horizons and the warmth of a craftsperson's hands. Each curve was shaped with intention, each glaze stroke applied with care.

When you hold this mug, you're not just holding a vessel for your favorite beverage. You're holding a piece of coastal serenity, a moment of peace crafted just for you.`);

  const enhancedImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop";

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save the changes
  };

  const handleRegenerate = () => {
    // In a real app, this would trigger AI regeneration
    alert("Regenerating content... This would trigger a new AI process in a real app.");
  };

  const handleAccept = () => {
    onNext();
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--color-pastel-blue)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl">📝 Review & Edit Your Content</h1>
          <p className="text-muted-foreground">
            Make any adjustments to perfect your product listing
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            {isEditing ? 'Save Changes' : 'Edit Content'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleRegenerate}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Regenerate All
          </Button>
          
          <Button
            onClick={handleAccept}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4" />
            Accept & Continue
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Enhanced Image - Fixed */}
          <Card className="lg:row-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Enhanced Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={enhancedImage}
                alt="Enhanced product"
                className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
              />
              <div 
                className="mt-3 p-3 rounded-lg text-sm"
                style={{ backgroundColor: 'var(--color-pastel-mint)' }}
              >
                <p>
                  ✨ <strong>Locked:</strong> Image enhancement cannot be edited manually. 
                  Use "Regenerate All" to create a new version.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Title & Description */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                {isEditing ? (
                  <Input
                    id="title"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="font-medium"
                  />
                ) : (
                  <div className="p-3 rounded-lg bg-muted">
                    <h3 className="font-medium">{productTitle}</h3>
                  </div>
                )}
              </div>

              {/* Product Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                ) : (
                  <div className="p-3 rounded-lg bg-muted max-h-64 overflow-y-auto">
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {productDescription}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Brand Story */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Brand Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {isEditing ? (
                <Textarea
                  value={brandStory}
                  onChange={(e) => setBrandStory(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              ) : (
                <div className="p-4 rounded-lg bg-muted">
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {brandStory}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="border-yellow-200" style={{ backgroundColor: 'var(--color-pastel-yellow)' }}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div className="space-y-2">
                <h4 className="font-medium text-accent">Editing Tips</h4>
                <ul className="text-sm text-accent/80 space-y-1">
                  <li>• Keep your product title under 60 characters for better SEO</li>
                  <li>• Include key features and benefits in your description</li>
                  <li>• Make your story personal and emotional to connect with buyers</li>
                  <li>• Use bullet points to highlight important features</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Action */}
        {!isEditing && (
          <div className="flex justify-center">
            <Button
              onClick={handleAccept}
              size="lg"
              className="px-12 py-4"
            >
              Continue to Export Options
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}