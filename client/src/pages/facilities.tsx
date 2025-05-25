import { 
  Dumbbell, 
  Users, 
  ShowerHead, 
  Heart, 
  Sparkles, 
  Check 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Facilities() {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Our Facilities</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience premium fitness at Body Mechanics with state-of-the-art equipment and facilities
            designed to enhance your workout experience.
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-16">
          <img 
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Gym interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end">
            <div className="p-8">
              <h2 className="font-heading text-3xl font-bold text-white mb-2">
                Industrial Design, Premium Experience
              </h2>
              <p className="text-white/80 max-w-xl mb-4">
                Our facility features an industrial aesthetic with modern equipment and amenities to provide
                the ultimate fitness experience.
              </p>
              <Badge variant="secondary" className="text-sm">12,000 sq. ft. Facility</Badge>
            </div>
          </div>
        </div>

        {/* Main Facilities Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Premium equipment" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-xl">Premium Equipment</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardDescription>State-of-the-art fitness gear</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Latest strength training machines</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Olympic weightlifting platforms</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Cardio equipment with entertainment systems</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Dedicated functional training area</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Sauna" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-xl">Sauna</CardTitle>
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Heart className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <CardDescription>Recovery and relaxation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Dry sauna for post-workout recovery</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Helps reduce muscle soreness</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Improves circulation and relaxation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Clean and well-maintained daily</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src="https://images.unsplash.com/photo-1631765197761-66728fcbf4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="ShowerHead facilities" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-xl">ShowerHead Facilities</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <ShowerHead className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardDescription>Premium amenities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Spacious shower stalls with rainfall showerheads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Complimentary bath products</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Clean towels available</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Regularly sanitized and maintained</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Changing rooms" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-xl">Changing Rooms</CardTitle>
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Sparkles className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <CardDescription>Comfortable and secure</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Spacious lockers with secure digital locks</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Vanity areas with mirrors and hairdryers</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Well-lit and clean environment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Sanitized multiple times daily</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Rack help" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-xl">Racking Assistance</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardDescription>Dedicated helpers for weights</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Staff available to help rack and re-rack weights</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Ensures equipment is properly maintained</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Keeps workout areas organized and safe</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Available during all operating hours</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src="https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Group fitness area" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-xl">Group Fitness Studios</CardTitle>
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Users className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <CardDescription>Dedicated class spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Spacious studios with premium flooring</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>High-quality sound systems</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Climate-controlled environment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>All necessary equipment provided</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Amenities Section */}
        <div className="bg-card rounded-lg p-8 shadow-lg mb-16">
          <h2 className="font-heading text-2xl font-bold mb-8 text-center">Additional Amenities</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <WifiIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Free Wi-Fi</h3>
              <p className="text-sm text-muted-foreground">Stay connected throughout the facility</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bottle className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-medium mb-1">Water Stations</h3>
              <p className="text-sm text-muted-foreground">Filtered water available throughout</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Protein Bar</h3>
              <p className="text-sm text-muted-foreground">Nutritious snacks and supplements</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-medium mb-1">Parking</h3>
              <p className="text-sm text-muted-foreground">Free dedicated parking available</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card rounded-lg p-8 shadow-lg text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Ready to Experience Our Premium Facilities?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join Body Mechanics today and transform your fitness journey with our state-of-the-art equipment and amenities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/membership">
              <Button size="lg" variant="secondary">
                View Membership Plans
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.location.href = "/api/login"}
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
