import { useQuery } from "@tanstack/react-query";
import { TrainerCard } from "@/components/trainer-card";
import { Trainer } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Star, Award, Clock } from "lucide-react";

export default function Trainers() {
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["/api/trainers"],
  });

  // Group trainers by expertise
  const groupTrainersByExpertise = () => {
    const groups: { [key: string]: Trainer[] } = {};
    
    trainers.forEach((trainer: Trainer) => {
      if (!groups[trainer.expertise]) {
        groups[trainer.expertise] = [];
      }
      groups[trainer.expertise].push(trainer);
    });
    
    return groups;
  };

  const expertiseGroups = groupTrainersByExpertise();

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Our Expert Trainers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Work with our certified personal trainers to achieve your fitness goals.
            Book a trial session or subscribe to regular personal training.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {trainers.map((trainer: Trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))}
            </div>

            <div className="bg-card rounded-lg p-8 shadow-lg mb-16">
              <h2 className="font-heading text-2xl font-bold mb-8 text-center">Trainer Specializations</h2>
              
              <Tabs defaultValue={Object.keys(expertiseGroups)[0] || "all"}>
                <TabsList className="grid grid-cols-3 mb-8">
                  {Object.keys(expertiseGroups).map((expertise) => (
                    <TabsTrigger key={expertise} value={expertise}>
                      {expertise}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {Object.entries(expertiseGroups).map(([expertise, trainers]) => (
                  <TabsContent key={expertise} value={expertise}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {trainers.map((trainer: Trainer) => (
                        <TrainerCard key={trainer.id} trainer={trainer} compact />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-card rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Personalized Attention</h3>
                <p className="text-muted-foreground">
                  One-on-one training sessions customized to your specific goals, fitness level, and preferences.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Certified trainers with years of experience will guide you through proper form and technique.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Accelerated Results</h3>
                <p className="text-muted-foreground">
                  Achieve your fitness goals faster with structured programs and accountability from your trainer.
                </p>
              </div>
            </div>

            {/* Training Packages */}
            <div className="bg-card rounded-lg p-8 shadow-lg mb-16">
              <h2 className="font-heading text-2xl font-bold mb-8 text-center">Training Packages</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold">Trial Session</h3>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>One 60-minute session</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Fitness assessment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Goal setting consultation</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mb-6">
                    Perfect for those who want to try personal training before committing.
                  </p>
                </div>
                
                <div className="border border-secondary rounded-lg p-6 relative">
                  <div className="absolute top-0 right-0">
                    <div className="bg-secondary text-white px-3 py-1 text-xs transform rotate-45 translate-x-6 translate-y-3">
                      Popular
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold">Weekly Training</h3>
                    <Badge>₹3,500 / week</Badge>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Two 60-minute sessions per week</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Progress tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Nutrition guidance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Workout plan for non-training days</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mb-6">
                    Ideal for consistent progress and accountability.
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold">Monthly Package</h3>
                    <Badge>₹12,000 / month</Badge>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Eight 60-minute sessions per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Comprehensive fitness assessment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Customized nutrition plan</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Monthly progress reviews</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                      <span>Priority scheduling</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mb-6">
                    Best value for serious fitness enthusiasts.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <h2 className="font-heading text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">How do I book a trial session?</h3>
                  <p className="text-muted-foreground">
                    Select a trainer from our team and click the "Book Trial" button. Choose a date and time that works for you, and confirm your booking.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">What should I bring to my training session?</h3>
                  <p className="text-muted-foreground">
                    Please bring comfortable workout clothes, appropriate shoes, a water bottle, and a towel.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">Can I change my trainer after booking?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can change your trainer at any time. Contact our front desk or speak with your current trainer about making a switch.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">What is your cancellation policy?</h3>
                  <p className="text-muted-foreground">
                    We require at least 24 hours notice for cancellations. Late cancellations or no-shows may be charged the full session fee.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
