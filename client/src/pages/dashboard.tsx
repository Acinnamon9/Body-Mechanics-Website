import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { WorkoutCard } from "@/components/workout-card";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Calendar as CalendarIcon, Plus, Activity, Calendar as CalendarCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserWorkout, WorkoutType } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [newWorkoutDate, setNewWorkoutDate] = useState<Date>(new Date());
  const [newWorkoutType, setNewWorkoutType] = useState<string>("");
  const [newWorkoutNotes, setNewWorkoutNotes] = useState<string>("");
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch user workouts
  const { data: workouts = [], isLoading: isLoadingWorkouts } = useQuery({
    queryKey: ["/api/workouts"],
  });

  // Fetch workout types
  const { data: workoutTypes = [], isLoading: isLoadingWorkoutTypes } = useQuery({
    queryKey: ["/api/workout-types"],
  });

  // Fetch class bookings
  const { data: classBookings = [], isLoading: isLoadingClassBookings } = useQuery({
    queryKey: ["/api/class-bookings"],
  });

  // Fetch trainer bookings
  const { data: trainerBookings = [], isLoading: isLoadingTrainerBookings } = useQuery({
    queryKey: ["/api/trainer-bookings"],
  });

  // Fetch user membership
  const { data: membership, isLoading: isLoadingMembership } = useQuery({
    queryKey: ["/api/user-membership"],
  });

  const getWorkoutTypeById = (id: number) => {
    return workoutTypes.find((type: WorkoutType) => type.id === id);
  };

  const handleCreateWorkout = async () => {
    if (!newWorkoutType) {
      toast({
        title: "Workout type required",
        description: "Please select a workout type",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const workoutData = {
        date: format(newWorkoutDate, "yyyy-MM-dd"),
        workoutTypeId: parseInt(newWorkoutType),
        notes: newWorkoutNotes.trim() || undefined,
      };

      await apiRequest("POST", "/api/workouts", workoutData);

      toast({
        title: "Workout created",
        description: "Your workout has been added successfully",
      });

      // Reset form and close dialog
      setNewWorkoutType("");
      setNewWorkoutNotes("");
      setNewWorkoutDate(new Date());
      setIsWorkoutDialogOpen(false);
      
      // Refresh workouts
      queryClient.invalidateQueries({ queryKey: ["/api/workouts"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWorkoutsWithType = () => {
    return workouts.map((workout: UserWorkout) => ({
      ...workout,
      workoutType: getWorkoutTypeById(workout.workoutTypeId || 0),
      exerciseCount: 3, // This would ideally come from the API
    }));
  };

  const formatClassBookings = () => {
    if (!classBookings.length) return [];
    
    return classBookings.map((booking: any) => ({
      id: booking.id,
      title: booking.classSchedule?.classType?.name || "Class",
      date: format(parseISO(booking.bookingDate), "EEEE, MMMM d"),
      time: `${booking.classSchedule?.startTime} - ${booking.classSchedule?.endTime}`,
    }));
  };

  const formatTrainerBookings = () => {
    if (!trainerBookings.length) return [];
    
    return trainerBookings.map((booking: any) => ({
      id: booking.id,
      trainerName: booking.trainer?.name || "Trainer",
      date: format(parseISO(booking.bookingDate), "EEEE, MMMM d"),
      time: `${booking.startTime} - ${booking.endTime}`,
      isTrial: booking.isTrial,
    }));
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Fitness Dashboard</h1>
            <p className="text-muted-foreground">Track your workouts and manage your fitness journey</p>
          </div>

          <Dialog open={isWorkoutDialogOpen} onOpenChange={setIsWorkoutDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Log Workout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log New Workout</DialogTitle>
                <DialogDescription>
                  Record your workout details below.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Workout Date</label>
                  <Calendar
                    mode="single"
                    selected={newWorkoutDate}
                    onSelect={(date) => date && setNewWorkoutDate(date)}
                    className="rounded-md border mx-auto"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Workout Type</label>
                  <Select value={newWorkoutType} onValueChange={setNewWorkoutType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workoutTypes.map((type: WorkoutType) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes (Optional)</label>
                  <Textarea
                    placeholder="Add notes about your workout"
                    value={newWorkoutNotes}
                    onChange={(e) => setNewWorkoutNotes(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsWorkoutDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCreateWorkout}
                  disabled={isSubmitting || !newWorkoutType}
                >
                  {isSubmitting ? "Saving..." : "Save Workout"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Membership Status */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-xl">Membership Status</CardTitle>
            <CardDescription>Your current membership plan</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingMembership ? (
              <div className="h-24 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : membership ? (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">Active</Badge>
                    <span className="font-medium">{membership.membershipPlan?.name || "Membership"}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Valid until: {format(new Date(membership.endDate), "MMMM d, yyyy")}
                  </div>
                </div>
                <Link href="/membership">
                  <Button variant="outline" size="sm" className="mt-4 md:mt-0">
                    Manage Membership
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <Badge variant="outline" className="mr-2">No Active Membership</Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Purchase a membership plan to access all our facilities and services.
                  </p>
                </div>
                <Link href="/membership">
                  <Button variant="secondary" size="sm" className="mt-4 md:mt-0">
                    View Membership Plans
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Stats cards */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-lg">Total Workouts</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold">
                {isLoadingWorkouts ? "-" : workouts.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Keep up the good work!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-lg">Upcoming Classes</CardTitle>
                <div className="p-2 bg-secondary/10 rounded-full">
                  <CalendarCheck className="h-5 w-5 text-secondary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold">
                {isLoadingClassBookings ? "-" : classBookings.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Booked classes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-lg">Trainer Sessions</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold">
                {isLoadingTrainerBookings ? "-" : trainerBookings.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Personal training sessions
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="workouts" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="workouts">Recent Workouts</TabsTrigger>
            <TabsTrigger value="classes">Booked Classes</TabsTrigger>
            <TabsTrigger value="trainers">Trainer Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="workouts">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingWorkouts ? (
                <div className="col-span-full h-40 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : workouts.length > 0 ? (
                getWorkoutsWithType().map((workout: any) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))
              ) : (
                <div className="col-span-full h-40 flex items-center justify-center">
                  <div className="text-center">
                    <Dumbbell className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-medium mb-2">No workouts logged yet</h3>
                    <p className="text-muted-foreground mb-4">Start tracking your fitness journey by logging your workouts</p>
                    <Button variant="secondary" onClick={() => setIsWorkoutDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Log First Workout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="classes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingClassBookings ? (
                <div className="col-span-full h-40 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : formatClassBookings().length > 0 ? (
                formatClassBookings().map((booking: any) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="font-heading text-xl">{booking.title}</CardTitle>
                        <Badge variant="default">{booking.date}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>{booking.time}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/classes">
                        <Button variant="outline" className="w-full">View All Classes</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full h-40 flex items-center justify-center">
                  <div className="text-center">
                    <CalendarCheck className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-medium mb-2">No classes booked yet</h3>
                    <p className="text-muted-foreground mb-4">Join our exciting group classes to enhance your fitness journey</p>
                    <Link href="/classes">
                      <Button variant="secondary">
                        View Class Schedule
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="trainers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingTrainerBookings ? (
                <div className="col-span-full h-40 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : formatTrainerBookings().length > 0 ? (
                formatTrainerBookings().map((booking: any) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="font-heading text-xl">{booking.trainerName}</CardTitle>
                        <Badge variant={booking.isTrial ? "secondary" : "default"}>
                          {booking.isTrial ? "Trial" : "Session"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/trainers">
                        <Button variant="outline" className="w-full">View All Trainers</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full h-40 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-medium mb-2">No trainer sessions booked</h3>
                    <p className="text-muted-foreground mb-4">Book a session with one of our expert trainers for personalized guidance</p>
                    <Link href="/trainers">
                      <Button variant="secondary">
                        View Trainers
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
