import * as zod from 'zod'
import { paymentScheme } from "@/app/_schemas/payment.schema";

export type paymentSchemeType = zod.infer<typeof paymentScheme>;
