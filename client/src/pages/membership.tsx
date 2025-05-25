import { MembershipPlanCard } from "@/components/membership-plan";
import { useQuery } from "@tanstack/react-query";
import { MembershipPlan } from "@shared/schema";
import { 
  Dumbbell, 
  Check, 
  Clock, 
  Users, 
  ShieldCheck, 
  ShowerHead 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Membership() {
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["/api/membership-plans"],
  });

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Membership Plans</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the membership plan that fits your fitness goals and budget.
            All plans include access to our premium facilities and equipment.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {plans.map((plan: MembershipPlan, index: number) => (
                <MembershipPlanCard 
                  key={plan.id} 
                  plan={plan} 
                  highlight={plan.durationMonths === 6} // Highlight the 6-month plan
                />
              ))}
            </div>

            {/* Membership Features */}
            <div className="bg-card rounded-lg p-8 shadow-lg mb-16">
              <h2 className="font-heading text-2xl font-bold mb-8 text-center">All Memberships Include</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">Premium Equipment</h3>
                  <p className="text-muted-foreground">
                    Access to state-of-the-art fitness equipment with dedicated helpers for weight racking.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">Flexible Hours</h3>
                  <p className="text-muted-foreground">
                    Open 7 days a week from 5:00 AM to 11:00 PM, giving you ample time to fit workouts into your schedule.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">Group Classes</h3>
                  <p className="text-muted-foreground">
                    Access to all group fitness classes including Zumba, Yoga, and Bhangra sessions.
                  </p>
                </div>
              </div>
            </div>

            {/* Facilities Section */}
            <div className="mb-16">
              <h2 className="font-heading text-2xl font-bold mb-8 text-center">Premium Facilities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Gym interior" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-4">Workout Area</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>Latest strength training equipment</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>Dedicated cardio section</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>Functional training area</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>Olympic lifting platforms</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Sauna" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-4">Wellness Facilities</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ShowerHead className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>Premium shower facilities</span>
                      </li>
                      <li className="flex items-start">
                        <ShieldCheck className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>Secure changing rooms</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>Sauna for relaxation and recovery</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                        <span>Complimentary towel service</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <h2 className="font-heading text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">Is there a joining fee?</h3>
                  <p className="text-muted-foreground">
                    No, we do not charge any joining fees. The membership price shown is all you pay.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">Can I freeze my membership?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can freeze your membership for up to 30 days per year with a valid reason, such as medical issues or travel.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">What is the cancellation policy?</h3>
                  <p className="text-muted-foreground">
                    Memberships can be canceled with 30 days notice. For fixed-term memberships, cancellation fees may apply.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">Are personal training sessions included?</h3>
                  <p className="text-muted-foreground">
                    Personal training sessions are not included in the basic membership but come as complimentary sessions with longer-term plans.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">Can I try before joining?</h3>
                  <p className="text-muted-foreground">
                    Yes, we offer one-day guest passes. Contact us to arrange your visit.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold">Do you offer student discounts?</h3>
                  <p className="text-muted-foreground">
                    Yes, students with valid ID can receive a 10% discount on any membership plan.
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
