import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Award, Calendar, ShieldCheck } from "lucide-react";

export default function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Gym interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="font-heading text-4xl md:text-7xl font-bold text-white mb-6">
            ELEVATE YOUR<br/>FITNESS JOURNEY
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join Body Mechanics - Delhi's premium fitness destination with cutting-edge equipment, expert trainers, and an industrial-inspired atmosphere.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => window.location.href = "/api/login"}
              className="text-lg"
            >
              Join Now
            </Button>
            <Link href="/membership">
              <Button size="lg" variant="outline" className="text-lg">
                View Membership Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">WHY CHOOSE BODY MECHANICS?</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              We offer more than just a gym - we provide a complete fitness experience with premium facilities and expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-lg text-center shadow-lg hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Premium Equipment</h3>
              <p className="text-muted-foreground">
                State-of-the-art fitness equipment with dedicated helpers for weight racking.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg text-center shadow-lg hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Expert Trainers</h3>
              <p className="text-muted-foreground">
                Certified personal trainers with years of experience in various fitness disciplines.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg text-center shadow-lg hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Diverse Classes</h3>
              <p className="text-muted-foreground">
                Join our Zumba, Yoga, and Bhangra classes led by experienced instructors.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg text-center shadow-lg hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Premium Facilities</h3>
              <p className="text-muted-foreground">
                Enjoy sauna, shower facilities, and well-maintained changing rooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">ENERGIZING CLASSES</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Experience a variety of high-energy classes designed for all fitness levels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-80 rounded-lg overflow-hidden group shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Zumba class" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Zumba</h3>
                  <p className="text-white/80 mb-4">Dance fitness program that combines Latin and international music with dance moves</p>
                  <Link href="/classes">
                    <Button variant="secondary" size="sm" className="group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 rounded-lg overflow-hidden group shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Yoga class" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Yoga</h3>
                  <p className="text-white/80 mb-4">Mind-body practice that combines physical postures, breathing exercises, and meditation</p>
                  <Link href="/classes">
                    <Button variant="secondary" size="sm" className="group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 rounded-lg overflow-hidden group shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1542833072-9a566a90c907?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Bhangra class" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Bhangra</h3>
                  <p className="text-white/80 mb-4">High-energy Punjabi folk dance that combines cardio workout with cultural expression</p>
                  <Link href="/classes">
                    <Button variant="secondary" size="sm" className="group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">MEMBERSHIP PLANS</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Choose the membership plan that fits your fitness goals and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <h3 className="font-heading text-2xl font-bold mb-2">1 Month</h3>
              <div className="text-3xl font-heading mb-4">₹4,000</div>
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Full gym access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Group classes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Locker usage</span>
                </li>
              </ul>
              <Link href="/membership">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <h3 className="font-heading text-2xl font-bold mb-2">3 Months</h3>
              <div className="text-3xl font-heading mb-4">₹10,000</div>
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Full gym access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Group classes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>1 free PT session</span>
                </li>
              </ul>
              <Link href="/membership">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-lg text-center relative">
              <div className="absolute top-0 right-0">
                <div className="bg-secondary text-white px-3 py-1 text-sm transform rotate-45 translate-x-5 translate-y-3">
                  Popular
                </div>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-2">6 Months</h3>
              <div className="text-3xl font-heading mb-4">₹15,000</div>
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Full gym access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Group classes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>2 free PT sessions</span>
                </li>
              </ul>
              <Link href="/membership">
                <Button variant="secondary" className="w-full">View Details</Button>
              </Link>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <h3 className="font-heading text-2xl font-bold mb-2">12 Months</h3>
              <div className="text-3xl font-heading mb-4">₹28,000</div>
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Full gym access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>Group classes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                  <span>4 free PT sessions</span>
                </li>
              </ul>
              <Link href="/membership">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">READY TO START YOUR FITNESS JOURNEY?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Join Body Mechanics today and transform your body and mind with our premium fitness experience.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => window.location.href = "/api/login"}
            className="text-lg px-8"
          >
            Join Now
          </Button>
        </div>
      </section>
    </div>
  );
}
