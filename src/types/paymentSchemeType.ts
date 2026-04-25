import * as zod from "zod";
import { paymentScheme } from "@/schemas/payment.schema";

export type paymentSchemeType = zod.infer<typeof paymentScheme>;
