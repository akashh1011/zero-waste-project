import { z } from "zod";


const INDIA_BOUNDS = {
  minLat: 8.4,
  maxLat: 37.6,
  minLng: 68.7,
  maxLng: 97.25,
};

const wasteEntrySchema = z.object({
  userId: z
    .string({ required_error: "userId is required" })
    .min(1, "userId cannot be empty"),

  wasteType: z.enum(["plastic", "paper", "metal", "organic"], {
    errorMap: () => ({
      message: "wasteType must be one of: plastic, paper, metal, organic",
    }),
  }),

  weightInKg: z
    .number({ required_error: "weightInKg is required", invalid_type_error: "weightInKg must be a number" })
    .gt(0.1, "weightInKg must be greater than 0.1"),

  location: z.object({
    latitude: z
      .number({ required_error: "latitude is required", invalid_type_error: "latitude must be a number" })
      .min(-90, "Invalid latitude")
      .max(90, "Invalid latitude"),
    longitude: z
      .number({ required_error: "longitude is required", invalid_type_error: "longitude must be a number" })
      .min(-180, "Invalid longitude")
      .max(180, "Invalid longitude"),
  }),
}).superRefine((data, ctx) => {
  const { latitude, longitude } = data.location;

  const isInsideIndia =
    latitude >= INDIA_BOUNDS.minLat &&
    latitude <= INDIA_BOUNDS.maxLat &&
    longitude >= INDIA_BOUNDS.minLng &&
    longitude <= INDIA_BOUNDS.maxLng;

  if (!isInsideIndia) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid location: Service available only in India",
      path: ["location"],
    });
  }
});

  const validateWasteEntry = (req, res, next) => {
  const result = wasteEntrySchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ message: "Validation failed", errors });
  }

  req.body = result.data;
  next();
};

export default validateWasteEntry;