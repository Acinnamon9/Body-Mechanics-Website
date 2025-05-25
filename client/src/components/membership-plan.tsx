import { useState } from "react";
import { MembershipPlan } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

interface MembershipPlanCardProps {
  plan: MembershipPlan;
  highlight?: boolean;
}

export function MembershipPlanCard({ plan, highlight = false }: MembershipPlanCardProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to purchase a membership",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/user-membership", {
        membershipPlanId: plan.id,
      });
      
      toast({
        title: "Membership Purchased",
        description: `Your ${plan.durationMonths}-month membership has been activated successfully.`,
      });
      
      // Invalidate user membership query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["/api/user-membership"] });
      
      setIsConfirmOpen(false);
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your membership purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className={`relative overflow-hidden ${highlight ? 'border-secondary' : ''}`}>
        {highlight && (
          <div className="absolute top-0 right-0">
            <div className="bg-secondary text-white px-4 py-1 transform rotate-45 translate-x-6 translate-y-3">
              Popular
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-center">{plan.name}</CardTitle>
          <CardDescription className="text-center">{plan.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-heading mb-6">
            ₹{plan.price.toLocaleString('en-IN')}
          </div>
          <ul className="space-y-3 text-left">
            {plan.features && plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-secondary shrink-0 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogTrigger asChild>
              <Button 
                variant={highlight ? "secondary" : "outline"} 
                className="w-full"
              >
                Subscribe Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Membership Purchase</DialogTitle>
                <DialogDescription>
                  You are about to purchase the {plan.name} membership plan for ₹{plan.price.toLocaleString('en-IN')}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="font-medium mb-2">Plan Details:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Duration: {plan.durationMonths} month{plan.durationMonths > 1 ? 's' : ''}</li>
                    <li>Price: ₹{plan.price.toLocaleString('en-IN')}</li>
                    <li>Payment: One-time payment</li>
                    <li>Activation: Immediate</li>
                  </ul>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleSubscribe}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Purchase"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
}
