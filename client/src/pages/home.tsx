import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TrainerCard } from "@/components/trainer-card";
import { ArrowRight, Dumbbell, Award, Calendar, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Trainer } from "@shared/schema";

export default function Home() {
  const { data: trainers = [] } = useQuery({
    queryKey: ["/api/trainers"],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Gym interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
            TRANSFORM YOUR BODY<br />TRANSFORM YOUR LIFE
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience premium fitness at Body Mechanics - Delhi's most exclusive gym with state-of-the-art equipment and expert trainers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/membership">
              <Button size="lg" variant="secondary">
                View Membership Plans
              </Button>
            </Link>
            <Link href="/facilities">
              <Button size="lg" variant="outline">
                Explore Our Facilities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">WHY CHOOSE BODY MECHANICS?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a gym - we provide a complete fitness experience with premium facilities and expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Premium Equipment</h3>
              <p className="text-muted-foreground">
                State-of-the-art fitness equipment with dedicated helpers for weight racking.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Expert Trainers</h3>
              <p className="text-muted-foreground">
                Certified personal trainers with years of experience in various fitness disciplines.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Diverse Classes</h3>
              <p className="text-muted-foreground">
                Join our Zumba, Yoga, and Bhangra classes led by experienced instructors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-heading text-3xl font-bold">MEET OUR TRAINERS</h2>
            <Link href="/trainers">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.slice(0, 3).map((trainer: Trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">OUR CLASSES</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our energetic group classes designed for all fitness levels, from beginner to advanced.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Zumba class" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Zumba</h3>
                  <p className="text-white/80 mb-4">Dance fitness program</p>
                  <Link href="/classes">
                    <Button variant="secondary" size="sm">View Schedule</Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Yoga class" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Yoga</h3>
                  <p className="text-white/80 mb-4">Mind-body practice</p>
                  <Link href="/classes">
                    <Button variant="secondary" size="sm">View Schedule</Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1542833072-9a566a90c907?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Bhangra class" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Bhangra</h3>
                  <p className="text-white/80 mb-4">Punjabi folk dance</p>
                  <Link href="/classes">
                    <Button variant="secondary" size="sm">View Schedule</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">READY TO START YOUR FITNESS JOURNEY?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose from our flexible membership plans starting at just ₹4,000 per month.
          </p>
          <Link href="/membership">
            <Button size="lg" variant="secondary">
              View Membership Plans
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
