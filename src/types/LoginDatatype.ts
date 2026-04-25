import { loginSchema } from "@/schemas/login.schema";
import * as zod from "zod";

export type signinDataType = zod.infer<typeof loginSchema>;
