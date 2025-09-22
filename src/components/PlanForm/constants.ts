import { uuidv4 } from "uuidv7";
import { z } from "zod";

export const MEASURE_TYPE = [
  "DISTANCE",
  "TIME",
  "REPS",
  "REST",
  "COOL_DOWN",
  "WARM_UP",
];
export const WORKOUT_TYPE = ["STRENGTH", "RUN", "HYBRID"];
export const PLAN_TYPES = ["STRENGTH", "RUN", "BIKE", "HYBRID"];
export const LEVEL = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

// --- Zod Schema ---
const WorkoutStepSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  value: z.number().min(1),
  type: z.enum(MEASURE_TYPE),
  repetitions: z.number().min(1),
});

const WorkoutSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  title: z.string().min(3),
  description: z.string().optional(),
  type: z.enum(WORKOUT_TYPE),
  steps: z.array(WorkoutStepSchema),
});

const DaySchema = z.object({
  id: z.string().optional(),
  order: z.number(),
  day_of_week: z.number().min(0).max(6),
  workouts: z.array(WorkoutSchema),
});

const WeekSchema = z.object({
  id: z.number().or(z.string()).optional(),
  order: z.number(),
  days: z.array(DaySchema),
});

const PlanSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10),
  level: z.enum(LEVEL),
  features: z.array(
    z.string().min(8, "Feature must contain at least 8 characters")
  ),
  type: z.enum(WORKOUT_TYPE),
  weeks: z.array(WeekSchema),
});

export type PlanFormValues = z.infer<typeof PlanSchema>;

export const initialValues: PlanFormValues = {
  title: "",
  description: "",
  level: "BEGINNER",
  type: "RUN",
  weeks: [
    {
      order: 0,
      id: uuidv4(),
      days: Array(7)
        .fill(0)
        .map((_, i) => ({
          id: uuidv4(),
          order: i,
          day_of_week: i,
          workouts: [],
        })),
    },
  ],
  features: [],
};

export type Workout = {
  id?: string | number;
  title: string;
  order: number;
  description?: string;
  type: string;
  steps: Array<{
    id?: string | number;
    order: number;
    value: number;
    type: string;
    repetitions: number | null;
  }>;
};

export type DayFormValues = {
  id?: number | string;
  workouts: Workout[];
};
