import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import { WorkoutType, UserWorkout } from "@shared/schema";

interface WorkoutCardProps {
  workout: UserWorkout & { 
    workoutType?: WorkoutType;
    exerciseCount?: number;
  };
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Card className="workout-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="font-heading text-xl">
            {workout.workoutType?.name || "Workout"}
          </CardTitle>
          <Badge 
            variant={
              workout.workoutType?.name === "Push" ? "default" : 
              workout.workoutType?.name === "Pull" ? "secondary" :
              "outline"
            }
          >
            {workout.workoutType?.name || "Custom"}
          </Badge>
        </div>
        <CardDescription className="flex items-center mt-1">
          <Calendar className="h-4 w-4 mr-1" />
          {format(new Date(workout.date), "MMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {workout.notes && (
            <p className="text-sm text-muted-foreground">{workout.notes}</p>
          )}
          <div className="flex items-center text-sm">
            <Dumbbell className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{workout.exerciseCount || 0} exercises</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/workout/${workout.id}`}>
          <Button variant="ghost" className="w-full">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
