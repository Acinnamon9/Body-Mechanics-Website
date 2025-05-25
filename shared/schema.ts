import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  date,
  time,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Workout types - Push, Pull, Legs
export const workoutTypes = pgTable("workout_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export type WorkoutType = typeof workoutTypes.$inferSelect;
export type InsertWorkoutType = typeof workoutTypes.$inferInsert;

export const insertWorkoutTypeSchema = createInsertSchema(workoutTypes).pick({
  name: true,
  description: true,
});

// Exercises
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  workoutTypeId: integer("workout_type_id").references(() => workoutTypes.id),
});

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = typeof exercises.$inferInsert;

export const insertExerciseSchema = createInsertSchema(exercises).pick({
  name: true,
  description: true,
  workoutTypeId: true,
});

// User Workouts
export const userWorkouts = pgTable("user_workouts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  date: date("date").notNull(),
  notes: text("notes"),
  workoutTypeId: integer("workout_type_id").references(() => workoutTypes.id),
});

export type UserWorkout = typeof userWorkouts.$inferSelect;
export type InsertUserWorkout = typeof userWorkouts.$inferInsert;

export const insertUserWorkoutSchema = createInsertSchema(userWorkouts).pick({
  userId: true,
  date: true,
  notes: true,
  workoutTypeId: true,
});

// User Workout Exercises
export const userWorkoutExercises = pgTable("user_workout_exercises", {
  id: serial("id").primaryKey(),
  userWorkoutId: integer("user_workout_id").references(() => userWorkouts.id).notNull(),
  exerciseId: integer("exercise_id").references(() => exercises.id).notNull(),
  sets: integer("sets"),
  reps: integer("reps"),
  weight: integer("weight"),
  notes: text("notes"),
});

export type UserWorkoutExercise = typeof userWorkoutExercises.$inferSelect;
export type InsertUserWorkoutExercise = typeof userWorkoutExercises.$inferInsert;

export const insertUserWorkoutExerciseSchema = createInsertSchema(userWorkoutExercises).pick({
  userWorkoutId: true,
  exerciseId: true,
  sets: true,
  reps: true,
  weight: true,
  notes: true,
});

// Trainers
export const trainers = pgTable("trainers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  expertise: text("expertise").notNull(),
  experience: integer("experience").notNull(), // years of experience
  bio: text("bio"),
  imageUrl: text("image_url"),
});

export type Trainer = typeof trainers.$inferSelect;
export type InsertTrainer = typeof trainers.$inferInsert;

export const insertTrainerSchema = createInsertSchema(trainers).pick({
  name: true,
  expertise: true,
  experience: true,
  bio: true,
  imageUrl: true,
});

// Class Types (Zumba, Yoga, Bhangra)
export const classTypes = pgTable("class_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export type ClassType = typeof classTypes.$inferSelect;
export type InsertClassType = typeof classTypes.$inferInsert;

export const insertClassTypeSchema = createInsertSchema(classTypes).pick({
  name: true,
  description: true,
});

// Class Schedule
export const classSchedule = pgTable("class_schedule", {
  id: serial("id").primaryKey(),
  classTypeId: integer("class_type_id").references(() => classTypes.id).notNull(),
  trainerId: integer("trainer_id").references(() => trainers.id).notNull(),
  dayOfWeek: text("day_of_week").notNull(), // Monday, Tuesday, etc.
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  capacity: integer("capacity").notNull(),
});

export type ClassSchedule = typeof classSchedule.$inferSelect;
export type InsertClassSchedule = typeof classSchedule.$inferInsert;

export const insertClassScheduleSchema = createInsertSchema(classSchedule).pick({
  classTypeId: true,
  trainerId: true,
  dayOfWeek: true,
  startTime: true,
  endTime: true,
  capacity: true,
});

// Class Bookings
export const classBookings = pgTable("class_bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  classScheduleId: integer("class_schedule_id").references(() => classSchedule.id).notNull(),
  bookingDate: date("booking_date").notNull(),
  attended: boolean("attended").default(false),
}, (table) => {
  return {
    userClassBookingUnique: primaryKey(table.userId, table.classScheduleId, table.bookingDate),
  };
});

export type ClassBooking = typeof classBookings.$inferSelect;
export type InsertClassBooking = typeof classBookings.$inferInsert;

export const insertClassBookingSchema = createInsertSchema(classBookings).pick({
  userId: true,
  classScheduleId: true,
  bookingDate: true,
});

// Membership Plans
export const membershipPlans = pgTable("membership_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  durationMonths: integer("duration_months").notNull(),
  price: integer("price").notNull(), // Price in INR
  description: text("description"),
  features: text("features").array(),
});

export type MembershipPlan = typeof membershipPlans.$inferSelect;
export type InsertMembershipPlan = typeof membershipPlans.$inferInsert;

export const insertMembershipPlanSchema = createInsertSchema(membershipPlans).pick({
  name: true,
  durationMonths: true,
  price: true,
  description: true,
  features: true,
});

// User Memberships
export const userMemberships = pgTable("user_memberships", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  membershipPlanId: integer("membership_plan_id").references(() => membershipPlans.id).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  active: boolean("active").default(true),
});

export type UserMembership = typeof userMemberships.$inferSelect;
export type InsertUserMembership = typeof userMemberships.$inferInsert;

export const insertUserMembershipSchema = createInsertSchema(userMemberships).pick({
  userId: true,
  membershipPlanId: true,
  startDate: true,
  endDate: true,
});

// Trainer Bookings (Personal Training Sessions)
export const trainerBookings = pgTable("trainer_bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  trainerId: integer("trainer_id").references(() => trainers.id).notNull(),
  bookingDate: date("booking_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  notes: text("notes"),
  isTrial: boolean("is_trial").default(false),
  status: text("status").notNull().default("confirmed"), // confirmed, cancelled, completed
});

export type TrainerBooking = typeof trainerBookings.$inferSelect;
export type InsertTrainerBooking = typeof trainerBookings.$inferInsert;

export const insertTrainerBookingSchema = createInsertSchema(trainerBookings).pick({
  userId: true,
  trainerId: true,
  bookingDate: true,
  startTime: true,
  endTime: true,
  notes: true,
  isTrial: true,
});
