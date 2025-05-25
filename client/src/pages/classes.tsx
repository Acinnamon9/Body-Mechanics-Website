import { useState } from "react";
import { ClassScheduleComponent } from "@/components/class-schedule";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { ClassBooking } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { format, parseISO } from "date-fns";
import { Dumbbell, Music, Heart } from "lucide-react";

export default function Classes() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("schedule");
  
  const { data: classBookings = [], isLoading: isLoadingBookings } = useQuery({
    queryKey: ["/api/class-bookings"],
    enabled: isAuthenticated,
  });

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Group Classes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our energetic group classes designed for all fitness levels, from beginner to advanced.
            Led by experienced instructors in a motivating environment.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="schedule">Class Schedule</TabsTrigger>
              {isAuthenticated && (
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              )}
              <TabsTrigger value="descriptions">Class Descriptions</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="schedule">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="font-heading text-2xl font-bold mb-6 text-center">Weekly Schedule</h2>
              <ClassScheduleComponent />
            </div>
          </TabsContent>

          {isAuthenticated && (
            <TabsContent value="bookings">
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h2 className="font-heading text-2xl font-bold mb-6 text-center">My Class Bookings</h2>
                
                {isLoadingBookings ? (
                  <div className="flex justify-center p-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                ) : classBookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classBookings.map((booking: ClassBooking) => (
                      <Card key={booking.id}>
                        <CardHeader>
                          <CardTitle className="font-heading text-xl">
                            {booking.classSchedule?.classType?.name || "Class"}
                          </CardTitle>
                          <CardDescription>
                            {format(new Date(booking.bookingDate), "EEEE, MMMM d, yyyy")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                {booking.classSchedule?.startTime} - {booking.classSchedule?.endTime}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Instructor: {booking.classSchedule?.trainer?.name || "Instructor"}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-heading text-xl font-medium mb-2">No classes booked yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't booked any classes yet. Check out our schedule and book a class today!
                    </p>
                    <Button variant="secondary" onClick={() => setActiveTab("schedule")}>
                      View Schedule
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          )}

          <TabsContent value="descriptions">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="font-heading text-2xl font-bold mb-6 text-center">Class Descriptions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-xl">Zumba</CardTitle>
                      <div className="p-2 bg-secondary/10 rounded-full">
                        <Music className="h-5 w-5 text-secondary" />
                      </div>
                    </div>
                    <CardDescription>Dance fitness program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Zumba is a dance fitness program that combines Latin and international music with dance moves.
                      It incorporates interval training with fast and slow rhythms to help improve cardiovascular fitness.
                      Perfect for anyone who wants a fun, energetic workout!
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-secondary mr-2" />
                        <span className="text-sm">Calorie burning</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-secondary mr-2" />
                        <span className="text-sm">Improves coordination</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-secondary mr-2" />
                        <span className="text-sm">Boosts mood</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-xl">Yoga</CardTitle>
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardDescription>Mind-body practice</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Yoga is a mind-body practice that combines physical postures, breathing exercises, and meditation.
                      It helps improve flexibility, strength, balance, and relaxation. Our yoga classes are suitable
                      for all levels, from beginners to experienced practitioners.
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Improves flexibility</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Reduces stress</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Enhances mental clarity</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-xl">Bhangra</CardTitle>
                      <div className="p-2 bg-secondary/10 rounded-full">
                        <Dumbbell className="h-5 w-5 text-secondary" />
                      </div>
                    </div>
                    <CardDescription>Punjabi folk dance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Bhangra is a high-energy form of Punjabi folk dance that combines cardio workout with cultural expression.
                      It features vigorous movements, jumps, and shoulder shakes that provide a full-body workout while
                      celebrating Punjabi culture and music.
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-secondary mr-2" />
                        <span className="text-sm">Cardio workout</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-secondary mr-2" />
                        <span className="text-sm">Builds stamina</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-secondary mr-2" />
                        <span className="text-sm">Cultural experience</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="font-heading text-xl font-bold mb-4">Class Guidelines</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary text-sm font-bold">1</span>
                </div>
                <span>Please arrive 10 minutes before class starts</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary text-sm font-bold">2</span>
                </div>
                <span>Bring a water bottle and towel</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary text-sm font-bold">3</span>
                </div>
                <span>Wear comfortable workout attire and appropriate shoes</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary text-sm font-bold">4</span>
                </div>
                <span>Inform the instructor of any injuries or health concerns</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary text-sm font-bold">5</span>
                </div>
                <span>Cancellations must be made at least 4 hours before class</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="font-heading text-xl font-bold mb-4">Benefits of Group Classes</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <span>Motivation from working out with others</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <span>Structured workouts designed by fitness professionals</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <span>Proper form and technique guidance from instructors</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <span>Consistent schedule to help establish a routine</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <span>Social interaction and community building</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <span>Variety to prevent workout boredom</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
