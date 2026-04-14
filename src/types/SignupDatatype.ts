import { signUpSchema } from "@/app/_schemas/Signup.schema";
import * as zod from "zod";

export type signupDataType = zod.infer<typeof signUpSchema>;
