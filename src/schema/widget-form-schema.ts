import { z } from "zod";

export const widgetSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(5).max(1000),
  price: z.number().min(1).max(20000),
});

export type Widget = z.infer<typeof widgetSchema>;
