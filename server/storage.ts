import {
  users, type User, type UpsertUser,
  workoutTypes, type WorkoutType, type InsertWorkoutType,
  exercises, type Exercise, type InsertExercise,
  userWorkouts, type UserWorkout, type InsertUserWorkout,
  userWorkoutExercises, type UserWorkoutExercise, type InsertUserWorkoutExercise,
  trainers, type Trainer, type InsertTrainer,
  classTypes, type ClassType, type InsertClassType,
  classSchedule, type ClassSchedule, type InsertClassSchedule,
  classBookings, type ClassBooking, type InsertClassBooking,
  membershipPlans, type MembershipPlan, type InsertMembershipPlan,
  userMemberships, type UserMembership, type InsertUserMembership,
  trainerBookings, type TrainerBooking, type InsertTrainerBooking
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Workout types
  getWorkoutTypes(): Promise<WorkoutType[]>;
  getWorkoutTypeById(id: number): Promise<WorkoutType | undefined>;
  createWorkoutType(workoutType: InsertWorkoutType): Promise<WorkoutType>;
  
  // Exercises
  getExercisesByWorkoutType(workoutTypeId: number): Promise<Exercise[]>;
  getExerciseById(id: number): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  
  // User workouts
  getUserWorkouts(userId: string): Promise<UserWorkout[]>;
  getUserWorkoutById(id: number): Promise<UserWorkout | undefined>;
  createUserWorkout(userWorkout: InsertUserWorkout): Promise<UserWorkout>;
  
  // User workout exercises
  getUserWorkoutExercises(userWorkoutId: number): Promise<UserWorkoutExercise[]>;
  createUserWorkoutExercise(userWorkoutExercise: InsertUserWorkoutExercise): Promise<UserWorkoutExercise>;
  
  // Trainers
  getTrainers(): Promise<Trainer[]>;
  getTrainerById(id: number): Promise<Trainer | undefined>;
  createTrainer(trainer: InsertTrainer): Promise<Trainer>;
  
  // Class types
  getClassTypes(): Promise<ClassType[]>;
  getClassTypeById(id: number): Promise<ClassType | undefined>;
  createClassType(classType: InsertClassType): Promise<ClassType>;
  
  // Class schedule
  getClassSchedule(): Promise<ClassSchedule[]>;
  getClassScheduleByDay(dayOfWeek: string): Promise<ClassSchedule[]>;
  getClassScheduleById(id: number): Promise<ClassSchedule | undefined>;
  createClassSchedule(classScheduleItem: InsertClassSchedule): Promise<ClassSchedule>;
  
  // Class bookings
  getClassBookingsByUser(userId: string): Promise<ClassBooking[]>;
  createClassBooking(classBooking: InsertClassBooking): Promise<ClassBooking>;
  
  // Membership plans
  getMembershipPlans(): Promise<MembershipPlan[]>;
  getMembershipPlanById(id: number): Promise<MembershipPlan | undefined>;
  createMembershipPlan(membershipPlan: InsertMembershipPlan): Promise<MembershipPlan>;
  
  // User memberships
  getUserMembership(userId: string): Promise<UserMembership | undefined>;
  createUserMembership(userMembership: InsertUserMembership): Promise<UserMembership>;
  
  // Trainer bookings
  getTrainerBookingsByUser(userId: string): Promise<TrainerBooking[]>;
  getTrainerBookingsByTrainer(trainerId: number): Promise<TrainerBooking[]>;
  createTrainerBooking(trainerBooking: InsertTrainerBooking): Promise<TrainerBooking>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
  
  // Workout types
  async getWorkoutTypes(): Promise<WorkoutType[]> {
    return await db.select().from(workoutTypes);
  }
  
  async getWorkoutTypeById(id: number): Promise<WorkoutType | undefined> {
    const [workoutType] = await db.select().from(workoutTypes).where(eq(workoutTypes.id, id));
    return workoutType;
  }
  
  async createWorkoutType(workoutType: InsertWorkoutType): Promise<WorkoutType> {
    const [newWorkoutType] = await db.insert(workoutTypes).values(workoutType).returning();
    return newWorkoutType;
  }
  
  // Exercises
  async getExercisesByWorkoutType(workoutTypeId: number): Promise<Exercise[]> {
    return await db.select().from(exercises).where(eq(exercises.workoutTypeId, workoutTypeId));
  }
  
  async getExerciseById(id: number): Promise<Exercise | undefined> {
    const [exercise] = await db.select().from(exercises).where(eq(exercises.id, id));
    return exercise;
  }
  
  async createExercise(exercise: InsertExercise): Promise<Exercise> {
    const [newExercise] = await db.insert(exercises).values(exercise).returning();
    return newExercise;
  }
  
  // User workouts
  async getUserWorkouts(userId: string): Promise<UserWorkout[]> {
    return await db.select().from(userWorkouts).where(eq(userWorkouts.userId, userId));
  }
  
  async getUserWorkoutById(id: number): Promise<UserWorkout | undefined> {
    const [userWorkout] = await db.select().from(userWorkouts).where(eq(userWorkouts.id, id));
    return userWorkout;
  }
  
  async createUserWorkout(userWorkout: InsertUserWorkout): Promise<UserWorkout> {
    const [newUserWorkout] = await db.insert(userWorkouts).values(userWorkout).returning();
    return newUserWorkout;
  }
  
  // User workout exercises
  async getUserWorkoutExercises(userWorkoutId: number): Promise<UserWorkoutExercise[]> {
    return await db.select().from(userWorkoutExercises).where(eq(userWorkoutExercises.userWorkoutId, userWorkoutId));
  }
  
  async createUserWorkoutExercise(userWorkoutExercise: InsertUserWorkoutExercise): Promise<UserWorkoutExercise> {
    const [newUserWorkoutExercise] = await db.insert(userWorkoutExercises).values(userWorkoutExercise).returning();
    return newUserWorkoutExercise;
  }
  
  // Trainers
  async getTrainers(): Promise<Trainer[]> {
    return await db.select().from(trainers);
  }
  
  async getTrainerById(id: number): Promise<Trainer | undefined> {
    const [trainer] = await db.select().from(trainers).where(eq(trainers.id, id));
    return trainer;
  }
  
  async createTrainer(trainer: InsertTrainer): Promise<Trainer> {
    const [newTrainer] = await db.insert(trainers).values(trainer).returning();
    return newTrainer;
  }
  
  // Class types
  async getClassTypes(): Promise<ClassType[]> {
    return await db.select().from(classTypes);
  }
  
  async getClassTypeById(id: number): Promise<ClassType | undefined> {
    const [classType] = await db.select().from(classTypes).where(eq(classTypes.id, id));
    return classType;
  }
  
  async createClassType(classType: InsertClassType): Promise<ClassType> {
    const [newClassType] = await db.insert(classTypes).values(classType).returning();
    return newClassType;
  }
  
  // Class schedule
  async getClassSchedule(): Promise<ClassSchedule[]> {
    return await db.select().from(classSchedule);
  }
  
  async getClassScheduleByDay(dayOfWeek: string): Promise<ClassSchedule[]> {
    return await db.select().from(classSchedule).where(eq(classSchedule.dayOfWeek, dayOfWeek));
  }
  
  async getClassScheduleById(id: number): Promise<ClassSchedule | undefined> {
    const [schedule] = await db.select().from(classSchedule).where(eq(classSchedule.id, id));
    return schedule;
  }
  
  async createClassSchedule(classScheduleItem: InsertClassSchedule): Promise<ClassSchedule> {
    const [newClassSchedule] = await db.insert(classSchedule).values(classScheduleItem).returning();
    return newClassSchedule;
  }
  
  // Class bookings
  async getClassBookingsByUser(userId: string): Promise<ClassBooking[]> {
    return await db.select().from(classBookings).where(eq(classBookings.userId, userId));
  }
  
  async createClassBooking(classBooking: InsertClassBooking): Promise<ClassBooking> {
    const [newClassBooking] = await db.insert(classBookings).values(classBooking).returning();
    return newClassBooking;
  }
  
  // Membership plans
  async getMembershipPlans(): Promise<MembershipPlan[]> {
    return await db.select().from(membershipPlans);
  }
  
  async getMembershipPlanById(id: number): Promise<MembershipPlan | undefined> {
    const [membershipPlan] = await db.select().from(membershipPlans).where(eq(membershipPlans.id, id));
    return membershipPlan;
  }
  
  async createMembershipPlan(membershipPlan: InsertMembershipPlan): Promise<MembershipPlan> {
    const [newMembershipPlan] = await db.insert(membershipPlans).values(membershipPlan).returning();
    return newMembershipPlan;
  }
  
  // User memberships
  async getUserMembership(userId: string): Promise<UserMembership | undefined> {
    const [userMembership] = await db
      .select()
      .from(userMemberships)
      .where(
        and(
          eq(userMemberships.userId, userId),
          eq(userMemberships.active, true),
          gte(userMemberships.endDate, new Date())
        )
      );
    return userMembership;
  }
  
  async createUserMembership(userMembership: InsertUserMembership): Promise<UserMembership> {
    const [newUserMembership] = await db.insert(userMemberships).values(userMembership).returning();
    return newUserMembership;
  }
  
  // Trainer bookings
  async getTrainerBookingsByUser(userId: string): Promise<TrainerBooking[]> {
    return await db.select().from(trainerBookings).where(eq(trainerBookings.userId, userId));
  }
  
  async getTrainerBookingsByTrainer(trainerId: number): Promise<TrainerBooking[]> {
    return await db.select().from(trainerBookings).where(eq(trainerBookings.trainerId, trainerId));
  }
  
  async createTrainerBooking(trainerBooking: InsertTrainerBooking): Promise<TrainerBooking> {
    const [newTrainerBooking] = await db.insert(trainerBookings).values(trainerBooking).returning();
    return newTrainerBooking;
  }
}

export const storage = new DatabaseStorage();
