import { signUpSchema } from "@/schemas/Signup.schema";
import * as zod from "zod";

export type signupDataType = zod.infer<typeof signUpSchema>;
