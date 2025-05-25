import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  User, 
  CalendarDays, 
  Dumbbell, 
  Users, 
  Clock, 
  CreditCard, 
  LogOut 
} from "lucide-react";

export default function Profile() {
  const { user, isLoading: isLoadingAuth } = useAuth();
  const { toast } = useToast();
  
  // Fetch user membership
  const { data: membership, isLoading: isLoadingMembership } = useQuery({
    queryKey: ["/api/user-membership"],
  });

  // Fetch user workouts
  const { data: workouts = [], isLoading: isLoadingWorkouts } = useQuery({
    queryKey: ["/api/workouts"],
  });

  // Fetch class bookings
  const { data: classBookings = [], isLoading: isLoadingClassBookings } = useQuery({
    queryKey: ["/api/class-bookings"],
  });

  // Fetch trainer bookings
  const { data: trainerBookings = [], isLoading: isLoadingTrainerBookings } = useQuery({
    queryKey: ["/api/trainer-bookings"],
  });

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    
    try {
      // Note: In a real application, we would make an API call to update the user profile
      // For now, just simulate success
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="py-10 flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">Manage your account and view your fitness journey</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 flex items-center text-destructive hover:text-destructive"
            onClick={() => window.location.href = "/api/logout"}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-xl">Profile</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user?.profileImageUrl} alt={user?.firstName || "User"} />
                  <AvatarFallback className="text-lg">
                    {user?.firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user?.email || "Member"}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
                
                <div className="flex justify-center mt-4">
                  <Badge variant="secondary">
                    Member since {format(new Date(user?.createdAt || new Date()), "MMMM yyyy")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-xl">Membership</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingMembership ? (
                  <div className="h-20 flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                ) : membership ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-secondary mr-2" />
                      <span className="font-medium">{membership.membershipPlan?.name} Plan</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Date</span>
                        <span>{format(new Date(membership.startDate), "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">End Date</span>
                        <span>{format(new Date(membership.endDate), "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant={membership.active ? "default" : "outline"}>
                          {membership.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">No active membership</p>
                    <Button variant="secondary" size="sm" asChild>
                      <a href="/membership">Get Membership</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-xl">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-5 w-5 text-primary mr-2" />
                      <span>Workouts</span>
                    </div>
                    <span className="font-medium">{workouts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-secondary mr-2" />
                      <span>Classes</span>
                    </div>
                    <span className="font-medium">{classBookings.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-primary mr-2" />
                      <span>PT Sessions</span>
                    </div>
                    <span className="font-medium">{trainerBookings.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="account">
              <TabsList className="mb-6">
                <TabsTrigger value="account">Account Settings</TabsTrigger>
                <TabsTrigger value="activity">Activity History</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Account Information</CardTitle>
                    <CardDescription>
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={user?.email || ""} 
                        disabled 
                        className="bg-muted cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      variant="secondary" 
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Preferences</CardTitle>
                    <CardDescription>
                      Manage your notification and privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailNotifications" className="cursor-pointer">Email Notifications</Label>
                        <Switch id="emailNotifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketingEmails" className="cursor-pointer">Marketing Emails</Label>
                        <Switch id="marketingEmails" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="classReminders" className="cursor-pointer">Class Reminders</Label>
                        <Switch id="classReminders" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Recent Workouts</CardTitle>
                    <CardDescription>
                      Your logged workout sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingWorkouts ? (
                      <div className="h-40 flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      </div>
                    ) : workouts.length > 0 ? (
                      <div className="space-y-4">
                        {workouts.slice(0, 5).map((workout: any) => (
                          <div key={workout.id} className="flex items-start border-b border-border pb-4 last:border-0 last:pb-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                              <Dumbbell className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{workout.workoutType?.name || "Workout"}</h3>
                                <span className="text-muted-foreground text-sm">
                                  {format(new Date(workout.date), "MMM d, yyyy")}
                                </span>
                              </div>
                              {workout.notes && (
                                <p className="text-sm text-muted-foreground mt-1">{workout.notes}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Dumbbell className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-heading text-lg font-medium mb-2">No workouts logged yet</h3>
                        <p className="text-muted-foreground mb-4">Start tracking your fitness journey by logging your workouts</p>
                        <Button variant="secondary" asChild>
                          <a href="/dashboard">Go to Dashboard</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  {workouts.length > 5 && (
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="/dashboard">View All Workouts</a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="bookings">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Class Bookings</CardTitle>
                    <CardDescription>
                      Your upcoming class reservations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingClassBookings ? (
                      <div className="h-40 flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      </div>
                    ) : classBookings.length > 0 ? (
                      <div className="space-y-4">
                        {classBookings.slice(0, 3).map((booking: any) => (
                          <div key={booking.id} className="flex items-start border-b border-border pb-4 last:border-0 last:pb-0">
                            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                              <Users className="h-5 w-5 text-secondary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{booking.classSchedule?.classType?.name || "Class"}</h3>
                                <span className="text-muted-foreground text-sm">
                                  {format(new Date(booking.bookingDate), "MMM d, yyyy")}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                                  {booking.classSchedule?.startTime} - {booking.classSchedule?.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarDays className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-heading text-lg font-medium mb-2">No class bookings</h3>
                        <p className="text-muted-foreground mb-4">Browse our class schedule and book a class</p>
                        <Button variant="secondary" asChild>
                          <a href="/classes">View Classes</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  {classBookings.length > 3 && (
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="/classes">View All Classes</a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">Trainer Sessions</CardTitle>
                    <CardDescription>
                      Your personal training appointments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTrainerBookings ? (
                      <div className="h-40 flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      </div>
                    ) : trainerBookings.length > 0 ? (
                      <div className="space-y-4">
                        {trainerBookings.slice(0, 3).map((booking: any) => (
                          <div key={booking.id} className="flex items-start border-b border-border pb-4 last:border-0 last:pb-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div className="flex items-center">
                                  <h3 className="font-medium">{booking.trainer?.name || "Trainer"}</h3>
                                  {booking.isTrial && (
                                    <Badge variant="secondary" className="ml-2">Trial</Badge>
                                  )}
                                </div>
                                <span className="text-muted-foreground text-sm">
                                  {format(new Date(booking.bookingDate), "MMM d, yyyy")}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <User className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-heading text-lg font-medium mb-2">No trainer sessions</h3>
                        <p className="text-muted-foreground mb-4">Book a session with one of our expert trainers</p>
                        <Button variant="secondary" asChild>
                          <a href="/trainers">View Trainers</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  {trainerBookings.length > 3 && (
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="/trainers">View All Trainers</a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
