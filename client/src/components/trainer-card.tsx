import { useState } from "react";
import { Trainer } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";

interface TrainerCardProps {
  trainer: Trainer;
  compact?: boolean;
}

export function TrainerCard({ trainer, compact = false }: TrainerCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("morning");
  const [isTrial, setIsTrial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const timeSlots = {
    morning: { start: "08:00:00", end: "09:00:00", label: "8:00 AM - 9:00 AM" },
    midday: { start: "12:00:00", end: "13:00:00", label: "12:00 PM - 1:00 PM" },
    evening: { start: "18:00:00", end: "19:00:00", label: "6:00 PM - 7:00 PM" },
  };

  const handleBooking = async () => {
    if (!selectedDate) {
      toast({
        title: "Select a date",
        description: "Please select a date for your training session",
        variant: "destructive",
      });
      return;
    }
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a training session",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const selectedTimeSlot = timeSlots[selectedTime as keyof typeof timeSlots];
      
      await apiRequest("POST", "/api/trainer-bookings", {
        trainerId: trainer.id,
        bookingDate: format(selectedDate, "yyyy-MM-dd"),
        startTime: selectedTimeSlot.start,
        endTime: selectedTimeSlot.end,
        isTrial,
        notes: `${isTrial ? "Trial" : "Regular"} session with ${trainer.name}`
      });
      
      toast({
        title: "Booking Successful",
        description: `Your ${isTrial ? "trial" : ""} training session has been booked successfully.`,
      });
      
      setIsBookingOpen(false);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        {!compact && (
          <div className="aspect-[4/3] relative">
            <img 
              src={trainer.imageUrl || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} 
              alt={trainer.name}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <CardHeader className={compact ? "pb-2" : ""}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {compact && (
                <Avatar>
                  <AvatarImage src={trainer.imageUrl} alt={trainer.name} />
                  <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <CardTitle className="font-heading text-xl">{trainer.name}</CardTitle>
                {compact && (
                  <CardDescription className="text-sm">{trainer.expertise}</CardDescription>
                )}
              </div>
            </div>
            <Badge variant="secondary">{trainer.experience} Years</Badge>
          </div>
          {!compact && (
            <CardDescription className="text-sm">{trainer.expertise}</CardDescription>
          )}
        </CardHeader>
        {!compact && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-secondary mr-1" />
                <Star className="h-4 w-4 text-secondary mr-1" />
                <Star className="h-4 w-4 text-secondary mr-1" />
                <Star className="h-4 w-4 text-secondary mr-1" />
                <Star className="h-4 w-4 text-secondary mr-1" />
                <span className="text-sm ml-1">5.0</span>
              </div>
              <p className="text-sm text-muted-foreground">{trainer.bio}</p>
            </div>
          </CardContent>
        )}
        <CardFooter className={`${compact ? "pt-0" : ""} flex gap-3`}>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className={compact ? "text-sm py-1 h-8" : ""}>
                Book Trial
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book a Session with {trainer.name}</DialogTitle>
                <DialogDescription>
                  Select a date and time for your training session.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex flex-col space-y-2">
                  <Label>Select a date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 1))}
                    className="rounded-md border mx-auto"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label>Select a time</Label>
                  <RadioGroup defaultValue="morning" onValueChange={setSelectedTime}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="morning" id="morning" />
                      <Label htmlFor="morning">Morning (8:00 AM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="midday" id="midday" />
                      <Label htmlFor="midday">Midday (12:00 PM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="evening" id="evening" />
                      <Label htmlFor="evening">Evening (6:00 PM)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label>Session Type</Label>
                  <RadioGroup defaultValue="trial" onValueChange={(value) => setIsTrial(value === "trial")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="trial" id="trial" />
                      <Label htmlFor="trial">Trial Session (Free)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="regular" />
                      <Label htmlFor="regular">Regular Session (₹1,000)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleBooking}
                  disabled={isSubmitting || !selectedDate}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className={compact ? "text-sm py-1 h-8" : ""}>
            <CalendarDays className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
