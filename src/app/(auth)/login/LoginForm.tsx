"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema } from "../../_schemas/login.schema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { signinDataType } from "@/types/LoginDatatype";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  async function handleLogin(values: signinDataType) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      console.log(result);

      if (result?.ok) {
        toast.success("Signed in successfully", {
          position: "top-center",
          richColors: true,
        });

        router.push("/");
      } else {
        toast.error("Unauthorized, You don't have an account!", {
          position: "top-center",
          richColors: true,
        });
      }
    } catch (error) {
      console.log("error at Sign in: ", error);
      toast.error("Error while Signing In", {
        position: "top-center",
        richColors: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        {/* Email */}
        <div className="mb-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-[#364153]">
                  Email*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ali@example.com"
                  autoComplete="off"
                  type="email"
                  className="py-5! px-3! rounded-md "
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {/* Password */}
        <div className="mb-6">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-[#364153]">
                  Password*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="create a strong password"
                  autoComplete="off"
                  type="password"
                  className="py-5! px-3! rounded-md"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {/* Keep me Sign in ( Checkbox) */}
        <div className="mb-5">
          <Field orientation="horizontal">
            <Checkbox
              id="terms-checkbox"
              className="cursor-pointer"
              name="terms-checkbox"
            />
            <Label htmlFor="terms-checkbox text-[#364153]">
              <div className="flex flex-wrap gap-2 items-center">
                I agree to the
                <Link href={"/"} className="text-primary">
                  Terms of Service
                </Link>
                and
                <Link href={"/"} className="text-primary">
                  Privacy Policy
                </Link>
                *
              </div>
            </Label>
          </Field>
        </div>
        {/* Signin Button */}
        <div>
          <button
            disabled={isLoading}
            className="w-full bg-primary rounded-lg cursor-pointer text-white py-3 px-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                {" "}
                <FaSpinner className="animate-spin text-lg" /> Singing
                In....{" "}
              </>
            ) : (
              <span className="font-medium">Sign In</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
