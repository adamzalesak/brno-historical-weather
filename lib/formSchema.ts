import * as z from "zod";

export const newEventSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(50),
  description: z.string().min(2).max(50),
  linkWithMoreInfo: z.string().optional(),
  visibility: z.enum(["Private", "Public"]),
  dateFrom: z.date(),
  dateTo: z.date(),
  isSingleDayEvent: z.boolean(),
});
