import { z } from "zod";

export const MEASURE_TYPE = ["DISTANCE", "TIME", "REPS"];
export const WORKOUT_TYPE = ["STRENGTH", "RUN", "HYBRID"];
export const PLAN_TYPES = ["STRENGTH", "RUN", "BIKE", "HYBRID"];
export const LEVEL = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

// --- Zod Schema ---
const WorkoutSetSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  active_value: z.number().min(1),
  active_measure_type: z.enum(MEASURE_TYPE),
  recovery_value: z.number().optional(),
  recovery_measure_type: z.enum(MEASURE_TYPE).optional(),
});

const WorkoutSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  title: z.string().min(3),
  description: z.string().optional(),
  type: z.enum(WORKOUT_TYPE),
  sets: z.array(WorkoutSetSchema),
});

const DaySchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  day_of_week: z.number().min(0).max(6),
  workouts: z.array(WorkoutSchema),
});

const WeekSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  days: z.array(DaySchema),
});

const PlanSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10),
  level: z.enum(LEVEL),
  type: z.enum(WORKOUT_TYPE),
  weeks: z.array(WeekSchema),
});

export type PlanFormValues = z.infer<typeof PlanSchema>;

export const initialValues: PlanFormValues = {
  title: "",
  description: "",
  level: "BEGINNER",
  type: "RUN",
  weeks: [],
};
