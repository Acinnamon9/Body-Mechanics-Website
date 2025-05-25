import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { format, addDays, parseISO } from "date-fns";
import { z } from "zod";
import { 
  insertUserWorkoutSchema, 
  insertUserWorkoutExerciseSchema,
  insertClassBookingSchema,
  insertTrainerBookingSchema,
  insertUserMembershipSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Workout Types API
  app.get('/api/workout-types', async (req, res) => {
    try {
      const workoutTypes = await storage.getWorkoutTypes();
      res.json(workoutTypes);
    } catch (error) {
      console.error("Error fetching workout types:", error);
      res.status(500).json({ message: "Failed to fetch workout types" });
    }
  });

  // Exercises API
  app.get('/api/exercises/:workoutTypeId', async (req, res) => {
    try {
      const workoutTypeId = parseInt(req.params.workoutTypeId);
      const exercises = await storage.getExercisesByWorkoutType(workoutTypeId);
      res.json(exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      res.status(500).json({ message: "Failed to fetch exercises" });
    }
  });

  // User Workouts API
  app.get('/api/workouts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const workouts = await storage.getUserWorkouts(userId);
      res.json(workouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ message: "Failed to fetch workouts" });
    }
  });

  app.post('/api/workouts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const workoutData = insertUserWorkoutSchema.parse({
        ...req.body,
        userId
      });
      
      const workout = await storage.createUserWorkout(workoutData);
      res.status(201).json(workout);
    } catch (error) {
      console.error("Error creating workout:", error);
      res.status(500).json({ message: "Failed to create workout" });
    }
  });

  app.get('/api/workouts/:workoutId/exercises', isAuthenticated, async (req: any, res) => {
    try {
      const workoutId = parseInt(req.params.workoutId);
      const exercises = await storage.getUserWorkoutExercises(workoutId);
      res.json(exercises);
    } catch (error) {
      console.error("Error fetching workout exercises:", error);
      res.status(500).json({ message: "Failed to fetch workout exercises" });
    }
  });

  app.post('/api/workouts/:workoutId/exercises', isAuthenticated, async (req: any, res) => {
    try {
      const workoutId = parseInt(req.params.workoutId);
      const exerciseData = insertUserWorkoutExerciseSchema.parse({
        ...req.body,
        userWorkoutId: workoutId
      });
      
      const exercise = await storage.createUserWorkoutExercise(exerciseData);
      res.status(201).json(exercise);
    } catch (error) {
      console.error("Error adding exercise to workout:", error);
      res.status(500).json({ message: "Failed to add exercise to workout" });
    }
  });

  // Trainers API
  app.get('/api/trainers', async (req, res) => {
    try {
      const trainers = await storage.getTrainers();
      res.json(trainers);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      res.status(500).json({ message: "Failed to fetch trainers" });
    }
  });

  app.get('/api/trainers/:id', async (req, res) => {
    try {
      const trainerId = parseInt(req.params.id);
      const trainer = await storage.getTrainerById(trainerId);
      
      if (!trainer) {
        return res.status(404).json({ message: "Trainer not found" });
      }
      
      res.json(trainer);
    } catch (error) {
      console.error("Error fetching trainer:", error);
      res.status(500).json({ message: "Failed to fetch trainer" });
    }
  });

  // Class Schedule API
  app.get('/api/class-schedule', async (req, res) => {
    try {
      const schedule = await storage.getClassSchedule();
      res.json(schedule);
    } catch (error) {
      console.error("Error fetching class schedule:", error);
      res.status(500).json({ message: "Failed to fetch class schedule" });
    }
  });

  app.get('/api/class-schedule/:day', async (req, res) => {
    try {
      const day = req.params.day;
      const schedule = await storage.getClassScheduleByDay(day);
      res.json(schedule);
    } catch (error) {
      console.error("Error fetching class schedule:", error);
      res.status(500).json({ message: "Failed to fetch class schedule" });
    }
  });

  // Class Bookings API
  app.get('/api/class-bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getClassBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching class bookings:", error);
      res.status(500).json({ message: "Failed to fetch class bookings" });
    }
  });

  app.post('/api/class-bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const bookingData = insertClassBookingSchema.parse({
        ...req.body,
        userId,
        bookingDate: parseISO(req.body.bookingDate)
      });
      
      const booking = await storage.createClassBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error booking class:", error);
      res.status(500).json({ message: "Failed to book class" });
    }
  });

  // Membership Plans API
  app.get('/api/membership-plans', async (req, res) => {
    try {
      const plans = await storage.getMembershipPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching membership plans:", error);
      res.status(500).json({ message: "Failed to fetch membership plans" });
    }
  });

  // User Membership API
  app.get('/api/user-membership', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const membership = await storage.getUserMembership(userId);
      res.json(membership || null);
    } catch (error) {
      console.error("Error fetching user membership:", error);
      res.status(500).json({ message: "Failed to fetch user membership" });
    }
  });

  app.post('/api/user-membership', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const planId = parseInt(req.body.membershipPlanId);
      
      // Get the membership plan to calculate end date
      const plan = await storage.getMembershipPlanById(planId);
      if (!plan) {
        return res.status(404).json({ message: "Membership plan not found" });
      }
      
      const startDate = new Date();
      const endDate = addDays(startDate, plan.durationMonths * 30); // Approximate month to days
      
      const membershipData = insertUserMembershipSchema.parse({
        userId,
        membershipPlanId: planId,
        startDate,
        endDate
      });
      
      const membership = await storage.createUserMembership(membershipData);
      res.status(201).json(membership);
    } catch (error) {
      console.error("Error creating user membership:", error);
      res.status(500).json({ message: "Failed to create user membership" });
    }
  });

  // Trainer Bookings API
  app.get('/api/trainer-bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getTrainerBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching trainer bookings:", error);
      res.status(500).json({ message: "Failed to fetch trainer bookings" });
    }
  });

  app.post('/api/trainer-bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const bookingData = insertTrainerBookingSchema.parse({
        ...req.body,
        userId,
        bookingDate: parseISO(req.body.bookingDate),
        startTime: req.body.startTime,
        endTime: req.body.endTime
      });
      
      const booking = await storage.createTrainerBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error booking trainer:", error);
      res.status(500).json({ message: "Failed to book trainer" });
    }
  });

  // Initialize data endpoint - use this to populate initial data for the app
  app.post('/api/init-data', async (req, res) => {
    try {
      // Create workout types
      const pushWorkout = await storage.createWorkoutType({ name: "Push", description: "Chest, shoulders, and triceps" });
      const pullWorkout = await storage.createWorkoutType({ name: "Pull", description: "Back and biceps" });
      const legsWorkout = await storage.createWorkoutType({ name: "Legs", description: "Quadriceps, hamstrings, calves" });
      
      // Create exercises for Push
      await storage.createExercise({ name: "Bench Press", description: "Barbell bench press for chest", workoutTypeId: pushWorkout.id });
      await storage.createExercise({ name: "Overhead Press", description: "Barbell overhead press for shoulders", workoutTypeId: pushWorkout.id });
      await storage.createExercise({ name: "Tricep Pushdown", description: "Cable tricep pushdown", workoutTypeId: pushWorkout.id });
      
      // Create exercises for Pull
      await storage.createExercise({ name: "Deadlift", description: "Barbell deadlift for back", workoutTypeId: pullWorkout.id });
      await storage.createExercise({ name: "Pull-up", description: "Body weight pull-ups", workoutTypeId: pullWorkout.id });
      await storage.createExercise({ name: "Bicep Curl", description: "Dumbbell bicep curls", workoutTypeId: pullWorkout.id });
      
      // Create exercises for Legs
      await storage.createExercise({ name: "Squat", description: "Barbell squat for quadriceps", workoutTypeId: legsWorkout.id });
      await storage.createExercise({ name: "Romanian Deadlift", description: "Barbell Romanian deadlift for hamstrings", workoutTypeId: legsWorkout.id });
      await storage.createExercise({ name: "Calf Raise", description: "Standing calf raises", workoutTypeId: legsWorkout.id });
      
      // Create trainers
      await storage.createTrainer({
        name: "Rahul Singh",
        expertise: "Strength Training",
        experience: 8,
        bio: "Certified personal trainer with expertise in strength and conditioning.",
        imageUrl: "https://images.unsplash.com/photo-1531369201-4f7be267b1de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      });
      
      await storage.createTrainer({
        name: "Priya Sharma",
        expertise: "Yoga & Flexibility",
        experience: 6,
        bio: "Yoga instructor specialized in increasing flexibility and core strength.",
        imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      });
      
      await storage.createTrainer({
        name: "Vikram Patel",
        expertise: "Cardio & HIIT",
        experience: 5,
        bio: "High-intensity interval training expert and cardio specialist.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      });
      
      // Create class types
      const zumba = await storage.createClassType({ name: "Zumba", description: "Dance fitness program" });
      const yoga = await storage.createClassType({ name: "Yoga", description: "Mind-body practice" });
      const bhangra = await storage.createClassType({ name: "Bhangra", description: "Punjabi folk dance" });
      
      // Create class schedule
      const trainer1 = 1; // Rahul
      const trainer2 = 2; // Priya
      const trainer3 = 3; // Vikram
      
      // Monday: Zumba (Evening 7-8 PM)
      await storage.createClassSchedule({
        classTypeId: zumba.id,
        trainerId: trainer1,
        dayOfWeek: "Monday",
        startTime: "19:00:00",
        endTime: "20:00:00",
        capacity: 15
      });
      
      // Tuesday: Yoga (Evening 7-8 PM)
      await storage.createClassSchedule({
        classTypeId: yoga.id,
        trainerId: trainer2,
        dayOfWeek: "Tuesday",
        startTime: "19:00:00",
        endTime: "20:00:00",
        capacity: 15
      });
      
      // Wednesday: Bhangra (Evening 7-8 PM)
      await storage.createClassSchedule({
        classTypeId: bhangra.id,
        trainerId: trainer3,
        dayOfWeek: "Wednesday",
        startTime: "19:00:00",
        endTime: "20:00:00",
        capacity: 15
      });
      
      // Thursday: Zumba (Morning 8-9 AM)
      await storage.createClassSchedule({
        classTypeId: zumba.id,
        trainerId: trainer1,
        dayOfWeek: "Thursday",
        startTime: "08:00:00",
        endTime: "09:00:00",
        capacity: 15
      });
      
      // Friday: Yoga (Morning 8-9 AM)
      await storage.createClassSchedule({
        classTypeId: yoga.id,
        trainerId: trainer2,
        dayOfWeek: "Friday",
        startTime: "08:00:00",
        endTime: "09:00:00",
        capacity: 15
      });
      
      // Saturday: Bhangra (Morning 8-9 AM)
      await storage.createClassSchedule({
        classTypeId: bhangra.id,
        trainerId: trainer3,
        dayOfWeek: "Saturday",
        startTime: "08:00:00",
        endTime: "09:00:00",
        capacity: 15
      });
      
      // Create membership plans
      await storage.createMembershipPlan({
        name: "1 Month",
        durationMonths: 1,
        price: 4000,
        description: "Basic membership for 1 month",
        features: ["Access to gym facilities", "Access to group classes", "Locker usage"]
      });
      
      await storage.createMembershipPlan({
        name: "3 Months",
        durationMonths: 3,
        price: 10000,
        description: "Standard membership for 3 months",
        features: ["Access to gym facilities", "Access to group classes", "Locker usage", "1 free personal training session"]
      });
      
      await storage.createMembershipPlan({
        name: "6 Months",
        durationMonths: 6,
        price: 15000,
        description: "Premium membership for 6 months",
        features: ["Access to gym facilities", "Access to group classes", "Locker usage", "2 free personal training sessions", "Nutrition consultation"]
      });
      
      await storage.createMembershipPlan({
        name: "12 Months",
        durationMonths: 12,
        price: 28000,
        description: "Ultimate membership for 12 months",
        features: ["Access to gym facilities", "Access to group classes", "Locker usage", "4 free personal training sessions", "Nutrition consultation", "Exclusive member events"]
      });
      
      res.json({ message: "Initial data created successfully" });
    } catch (error) {
      console.error("Error initializing data:", error);
      res.status(500).json({ message: "Failed to initialize data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
