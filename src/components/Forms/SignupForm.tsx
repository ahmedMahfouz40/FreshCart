"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signupDataType } from "@/types/SignupDatatype";
import { useRouter } from "next/navigation";
import { FaSpinner, FaUserPlus } from "react-icons/fa6";
import { useState } from "react";
import { signupAcion } from "@/actions/signup.action";
import { signUpSchema } from "@/schemas/Signup.schema";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      agreeTermsAndPolicy: false,
    },
    resolver: zodResolver(signUpSchema),
  });

  async function handleSignUp(values: signupDataType) {
    const { agreeTermsAndPolicy: _agree, ...userData } = values;
    void _agree;
    setIsLoading(true);
    try {
      const isSignup = await signupAcion(userData);
      if (isSignup) {
        toast.success("sign up successfully", {
          position: "top-center",
          richColors: true,
        });
        router.push("/login");
      } else {
        toast.error("Signup Failed", {
          position: "top-center",
          richColors: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <form onSubmit={form.handleSubmit(handleSignUp)}>
        {/* Name */}
        <div className="mb-6">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-[#364153]">
                  Name*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ali"
                  autoComplete="off"
                  type="text"
                  className="py-5! px-3! rounded-md  text-xs sm:text-sm"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
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
                  className="py-5! px-3! rounded-md  text-xs sm:text-sm"
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
                  className="py-5! px-3! rounded-md  text-xs sm:text-sm"
                />
                <FieldDescription className="text-xs ">
                  Must be at least 8 characters with numbers and symbols
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {/* Confirm Password */}
        <div className="mb-6">
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-[#364153]">
                  Confirm Password*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="confirm your password"
                  autoComplete="off"
                  type="password"
                  className="py-5! px-3! rounded-md  text-xs sm:text-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {/* Phone Number */}
        <div className="mb-6">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-[#364153]">
                  Phone Number*
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="+201010203040"
                  autoComplete="off"
                  type="tel"
                  className="py-5! px-3! rounded-md  text-xs sm:text-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {/* privacy policy */}
        <div className="mb-5">
          <Controller
            name="agreeTermsAndPolicy"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer mt-0.5 self-center"
                  />
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-[#364153] flex gap-1 flex-wrap font-normal cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    *
                  </FieldLabel>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={isLoading}
            className="w-full bg-primary rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 text-white py-3 px-4 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="text-lg animate-spin" />
                <span className="font-medium">Creating Account ...</span>
              </>
            ) : (
              <>
                <FaUserPlus className="text-lg" />
                <span className="font-medium">Create My Account</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
