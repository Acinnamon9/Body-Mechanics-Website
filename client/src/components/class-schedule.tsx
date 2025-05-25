import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassSchedule, ClassType } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ClassData extends ClassSchedule {
  classType?: ClassType;
  trainerName?: string;
}

export function ClassScheduleComponent() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: schedule = [], isLoading } = useQuery({
    queryKey: ["/api/class-schedule"],
  });

  const { data: classTypes = [] } = useQuery({
    queryKey: ["/api/class-types"],
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getClassTypeById = (id: number) => {
    return classTypes.find((type: ClassType) => type.id === id);
  };

  const getClassesByDay = (day: string) => {
    return schedule.filter((item: ClassSchedule) => item.dayOfWeek === day);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
  };

  const handleBookClass = async (classId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a class",
        variant: "destructive",
      });
      return;
    }

    try {
      const today = new Date();
      const bookingDate = format(today, "yyyy-MM-dd");

      await apiRequest("POST", "/api/class-bookings", {
        classScheduleId: classId,
        bookingDate,
      });

      toast({
        title: "Class Booked!",
        description: "You have successfully booked this class.",
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking this class. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="Monday" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
        {days.map((day) => (
          <TabsTrigger key={day} value={day}>
            {day}
          </TabsTrigger>
        ))}
      </TabsList>

      {days.map((day) => (
        <TabsContent key={day} value={day}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getClassesByDay(day).length > 0 ? (
              getClassesByDay(day).map((cls: ClassSchedule) => {
                const classType = getClassTypeById(cls.classTypeId);
                return (
                  <Card key={cls.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="font-heading text-xl">
                          {classType?.name || "Class"}
                        </CardTitle>
                        <Badge variant={classType?.name === "Zumba" ? "default" : 
                                         classType?.name === "Yoga" ? "secondary" : 
                                         "outline"}>
                          {classType?.name}
                        </Badge>
                      </div>
                      <CardDescription>{classType?.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{day}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Capacity: {cls.capacity}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => handleBookClass(cls.id)}
                      >
                        Book Class
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No classes scheduled for {day}</p>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
