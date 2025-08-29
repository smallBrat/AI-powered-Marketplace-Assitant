import { useState } from 'react';
import { InputScreen } from './components/InputScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { OutputScreen } from './components/OutputScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { ExportScreen } from './components/ExportScreen';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { 
  Upload,
  Cpu,
  Eye,
  Edit,
  Download,
  ArrowLeft
} from 'lucide-react';
import { Button } from './components/ui/button';

type Screen = 'input' | 'processing' | 'output' | 'review' | 'export';

interface Step {
  id: Screen;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('input');

  const steps: Step[] = [
    {
      id: 'input',
      title: 'Upload',
      icon: <Upload className="w-4 h-4" />,
      description: 'Add your product'
    },
    {
      id: 'processing',
      title: 'AI Processing',
      icon: <Cpu className="w-4 h-4" />,
      description: 'AI magic happens'
    },
    {
      id: 'output',
      title: 'Results',
      icon: <Eye className="w-4 h-4" />,
      description: 'View AI output'
    },
    {
      id: 'review',
      title: 'Review',
      icon: <Edit className="w-4 h-4" />,
      description: 'Edit & refine'
    },
    {
      id: 'export',
      title: 'Export',
      icon: <Download className="w-4 h-4" />,
      description: 'Ready to publish'
    }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentScreen);
  };

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentScreen(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentScreen(steps[currentIndex - 1].id);
    }
  };

  const handleComplete = () => {
    // Reset to start or show completion message
    setCurrentScreen('input');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'input':
        return <InputScreen onNext={handleNext} />;
      case 'processing':
        return <ProcessingScreen onComplete={handleNext} />;
      case 'output':
        return <OutputScreen onNext={handleNext} />;
      case 'review':
        return <ReviewScreen onNext={handleNext} />;
      case 'export':
        return <ExportScreen onComplete={handleComplete} />;
      default:
        return <InputScreen onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎨</div>
              <div>
                <h1 className="font-semibold">AI Marketplace Assistant</h1>
                <p className="text-sm text-muted-foreground">For Local Artisans</p>
              </div>
            </div>
            
            {getCurrentStepIndex() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const currentIndex = getCurrentStepIndex();
              const isActive = index === currentIndex;
              const isCompleted = index < currentIndex;
              const isUpcoming = index > currentIndex;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    {/* Step Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-primary text-white shadow-lg scale-110'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        step.icon
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-medium ${
                        isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 relative">
                      <div className="absolute inset-0 bg-muted rounded-full" />
                      <div 
                        className={`absolute inset-0 bg-primary rounded-full transition-all duration-500 ${
                          index < currentIndex ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Info */}
          <div className="mt-4 text-center">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Step {getCurrentStepIndex() + 1} of {steps.length}: {steps[getCurrentStepIndex()].title}
            </Badge>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="transition-all duration-300">
        {renderScreen()}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t p-6 text-center text-sm text-muted-foreground">
        <p>Built with ❤️ for artisans • Powered by AI • Made with Figma Make</p>
      </footer>
    </div>
  );
}