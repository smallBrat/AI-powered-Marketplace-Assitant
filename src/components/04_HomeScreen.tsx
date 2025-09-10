import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Home,
  Package,
  Plus,
  BarChart3,
  Settings,
  Eye,
  Heart,
  ShoppingCart,
  TrendingUp,
  Clock,
  Star,
  Users,
  DollarSign,
  Activity,
  Lightbulb,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  onAddProduct: () => void;
  onNavigate: (screen: string) => void;
}

interface ActivityItem {
  id: string;
  action: string;
  item: string;
  timestamp: string;
  type: 'added' | 'sold' | 'viewed' | 'liked';
}

interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
}

export function HomeScreen({ onAddProduct, onNavigate }: HomeScreenProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const [artisanName, setArtisanName] = useState<string>("");
  const [artisanInitials, setArtisanInitials] = useState<string>("");

// fetch artisan data from backend using email in localStorage
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);

    if (user.full_name) {
      setArtisanName(user.full_name);

      const initials = user.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();
      setArtisanInitials(initials);
    }
  }
}, []);

  const quickStats = [
    {
      title: 'Total Products',
      value: '12',
      change: '+2 this month',
      icon: Package,
      color: 'text-primary'
    },
    {
      title: 'Total Views',
      value: '3,247',
      change: '+18% from last month',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      title: 'Total Sales',
      value: '$1,284',
      change: '+12% from last month',
      icon: DollarSign,
      color: 'text-green-600'
    }
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      action: 'You added',
      item: 'Handcrafted Ceramic Bowl',
      timestamp: '2 hours ago',
      type: 'added'
    },
    {
      id: '2',
      action: 'Someone viewed',
      item: 'Sterling Silver Pendant',
      timestamp: '4 hours ago',
      type: 'viewed'
    },
    {
      id: '3',
      action: 'You sold',
      item: 'Wooden Cutting Board',
      timestamp: '1 day ago',
      type: 'sold'
    },
    {
      id: '4',
      action: 'Someone liked',
      item: 'Macrame Wall Hanging',
      timestamp: '2 days ago',
      type: 'liked'
    },
    {
      id: '5',
      action: 'You added',
      item: 'Clay Pottery Bowl',
      timestamp: '3 days ago',
      type: 'added'
    }
  ];

  const tips: Tip[] = [
    {
      id: '1',
      title: 'Optimize Your Product Photos',
      description: 'Use natural lighting and show multiple angles. Products with 3+ photos get 40% more views.',
      category: 'Photography'
    },
    {
      id: '2',
      title: 'Write Compelling Descriptions',
      description: 'Include the story behind your piece, materials used, and dimensions. Personal stories increase engagement by 60%.',
      category: 'Writing'
    },
    {
      id: '3',
      title: 'Price Competitively',
      description: 'Research similar items in your category. Consider your time, materials, and skill level when pricing.',
      category: 'Pricing'
    },
    {
      id: '4',
      title: 'Use Relevant Keywords',
      description: 'Include terms customers search for: "handmade", "artisan", "custom", and material names.',
      category: 'SEO'
    },
    {
      id: '5',
      title: 'Respond to Inquiries Quickly',
      description: 'Fast responses increase sales probability by 50%. Aim to reply within 24 hours.',
      category: 'Customer Service'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'added': return <Plus className="w-4 h-4 text-green-600" />;
      case 'sold': return <ShoppingCart className="w-4 h-4 text-primary" />;
      case 'viewed': return <Eye className="w-4 h-4 text-blue-600" />;
      case 'liked': return <Heart className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-50 border-green-200';
      case 'sold': return 'bg-purple-50 border-purple-200';
      case 'viewed': return 'bg-blue-50 border-blue-200';
      case 'liked': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'add-product', label: 'Add New Product', icon: Plus },
    { id: 'analytics', label: 'Insights & Analytics', icon: BarChart3 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleMenuClick = (menuId: string) => {
    if (menuId === 'add-product') {
      onAddProduct();
    } else {
      onNavigate(menuId);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-pastel-blue)' }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 mb-8">
              <div className="text-2xl">🎨</div>
              <div>
                <h2 className="font-semibold">Artisan Hub</h2>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 mb-6">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-white">{artisanInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{artisanName}</p>
                <p className="text-sm text-muted-foreground">Pottery Artist</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === 'home';
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Welcome back, {artisanName}! 👋</h1>
            <p className="text-muted-foreground">
              Here's your artisan dashboard overview for today.
            </p>
          </div>

          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-2xl font-semibold">{stat.value}</p>
                        <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity Feed */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className={`flex items-center gap-3 p-3 rounded-lg border ${getActivityColor(activity.type)}`}>
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="font-medium">'{activity.item}'</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onNavigate('analytics')}
                  >
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Artisans Carousel */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                  Tips for Artisans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className="mb-2">
                        {tips[currentTipIndex].category}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={prevTip}
                          className="w-8 h-8 p-0"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={nextTip}
                          className="w-8 h-8 p-0"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2">{tips[currentTipIndex].title}</h4>
                    <p className="text-sm text-muted-foreground">{tips[currentTipIndex].description}</p>
                  </div>
                  
                  {/* Tip Indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    {tips.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTipIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTipIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                        title={`Go to tip ${index + 1}`}
                        aria-label={`Go to tip ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="mt-8 border-2 border-dashed border-primary/30 bg-primary/5">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-4xl">✨</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ready to add your next masterpiece?</h3>
                  <p className="text-muted-foreground">
                    Let our AI help you create compelling listings that showcase your craftsmanship.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={onAddProduct}
                  className="px-8 py-4"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}