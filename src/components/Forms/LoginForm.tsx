"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "../../schemas/login.schema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaSpinner,
} from "react-icons/fa6";
import { signinDataType } from "@/types/LoginDatatype";
import Link from "next/link";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      keepMeSignIn: false,
    },
    resolver: zodResolver(loginSchema),
  });
  async function handleLogin(values: signinDataType) {
    const { keepMeSignIn, ...userData } = values;
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        ...userData,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(result);

      if (result?.ok) {
        toast.success("Signed in successfully", {
          position: "top-center",
          richColors: true,
        });

        window.location.href = "/";
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
  function handleShowPassword() {
    setShowPassword((prev) => !prev);
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
                <div className="relative">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@example.com"
                    autoComplete="email"
                    type="email"
                    className="px-4 py-6 pl-12 border-gray-200 rounded-xl "
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {/* Password */}
        <div className="mb-6 ">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-[#364153]">
                  <div className="flex justify-between gap-2  w-full">
                    <span> Password*</span>
                    <Link
                      className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
                      href="/forget-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="create a strong password"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    className="pl-12! pr-12! py-6! rounded-xl border-gray-200"
                  />

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <button
                    onClick={handleShowPassword}
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Keep Me Sign In */}
        <div className="mb-6 ">
          <Controller
            name="keepMeSignIn"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id={field.name}
                  />
                  <FieldLabel htmlFor={field.name} className="text-[#364153]">
                    <span className=" text-sm text-gray-700">
                      Keep me signed in
                    </span>
                  </FieldLabel>
                </div>
              </Field>
            )}
          />
        </div>

        {/* Signin Button */}
        <div>
          <button
            disabled={isLoading}
            className="w-full bg-primary rounded-lg cursor-pointer active:scale-[0.98] text-white py-3 px-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
