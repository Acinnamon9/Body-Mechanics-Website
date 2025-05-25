import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">About Body Mechanics</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our story, mission, and the values that drive us to provide the best fitness experience in Delhi.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-heading text-3xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-secondary mb-6"></div>
            <p className="text-muted-foreground mb-4">
              Body Mechanics was founded in 2015 with a simple mission: to create a premium fitness environment
              that combines industrial aesthetics with high-end equipment and personalized service.
            </p>
            <p className="text-muted-foreground mb-4">
              Our founder, Rajiv Sharma, a former national-level athlete, identified a gap in Delhi's fitness scene.
              He envisioned a gym that wasn't just about equipment, but about creating a community of like-minded
              individuals committed to transforming their bodies and lives.
            </p>
            <p className="text-muted-foreground">
              Since opening our doors in Janakpuri, we've helped thousands of members achieve their fitness goals
              through our combination of premium facilities, expert trainers, and supportive community.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Gym interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="bg-card rounded-lg p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Body Mechanics, our mission is to empower individuals to transform their bodies and minds through
              premium fitness experiences, expert guidance, and a supportive community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="font-heading text-xl font-bold text-primary">01</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Premium Experience</h3>
                <p className="text-muted-foreground">
                  We provide state-of-the-art equipment, luxurious amenities, and a clean, motivating environment
                  that inspires our members to push their limits.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="font-heading text-xl font-bold text-secondary">02</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Our certified trainers provide personalized coaching and support to help members achieve their
                  fitness goals safely and effectively.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="font-heading text-xl font-bold text-primary">03</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Supportive Community</h3>
                <p className="text-muted-foreground">
                  We foster a welcoming, inclusive community where members motivate each other and build lasting
                  connections around shared fitness goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do at Body Mechanics, from how we design our facilities to how we interact with our members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-xl font-bold mb-4">Excellence</h3>
              <p className="text-muted-foreground mb-4">
                We strive for excellence in every aspect of our business, from the equipment we provide to the
                cleanliness of our facilities and the quality of our instruction.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Premium equipment selection</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Rigorous cleanliness standards</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Continuous staff training</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-xl font-bold mb-4">Integrity</h3>
              <p className="text-muted-foreground mb-4">
                We operate with honesty and transparency in all our dealings, from membership pricing to the
                advice our trainers provide.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Transparent pricing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Honest fitness guidance</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Ethical business practices</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-xl font-bold mb-4">Community</h3>
              <p className="text-muted-foreground mb-4">
                We believe in the power of community to inspire and motivate. We create spaces and events that
                foster connection and mutual support.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Regular community events</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Member recognition programs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Inclusive, welcoming environment</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-xl font-bold mb-4">Innovation</h3>
              <p className="text-muted-foreground mb-4">
                We constantly seek new ways to improve our members' experience, from incorporating the latest fitness
                technology to updating our programs based on cutting-edge research.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Regular equipment updates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Evidence-based training methods</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                  <span>Continuous facility improvements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold mb-4">Our Leadership Team</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate individuals who drive Body Mechanics' mission and ensure we deliver excellence every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Rajiv Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-xl font-bold mb-1">Rajiv Sharma</h3>
              <p className="text-secondary mb-2">Founder & CEO</p>
              <p className="text-muted-foreground text-sm">
                Former national athlete with 15+ years of fitness industry experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Priya Malhotra" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-xl font-bold mb-1">Priya Malhotra</h3>
              <p className="text-secondary mb-2">Head of Training</p>
              <p className="text-muted-foreground text-sm">
                Certified fitness expert specializing in strength and conditioning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Vikram Mehta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-xl font-bold mb-1">Vikram Mehta</h3>
              <p className="text-secondary mb-2">Operations Director</p>
              <p className="text-muted-foreground text-sm">
                Ensures smooth daily operations and exceptional member experience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card rounded-lg p-8 shadow-lg text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the Body Mechanics difference and start your fitness transformation today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/membership">
              <Button size="lg" variant="secondary">
                View Membership Plans
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="group">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
