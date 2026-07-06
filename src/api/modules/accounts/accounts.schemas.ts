import { z } from "zod";

export const accountDetailsSchema = z.object({
  id: z.string().min(1),
  iban: z.string().optional(),
  currency: z.string().length(3),
  balance: z.number(),
  status: z.enum(["ACTIVE", "BLOCKED", "CLOSED"]).optional()
});

export const paymentResponseSchema = z.object({
  paymentId: z.string().min(1),
  status: z.enum(["PENDING", "BOOKED", "REJECTED"])
});

