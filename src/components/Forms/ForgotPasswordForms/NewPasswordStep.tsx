import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { FaEye, FaEyeSlash, FaLock, FaSpinner } from "react-icons/fa6";
import { Input } from "../../ui/input";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { resetPassword } from "@/actions/userAuth.action";
import { passwordSchema } from "@/schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<"email" | "code" | "password" | "reseted">
  >;
  email: string;
};
const NewPasswordStep = ({ setStep, email }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<
    "newPassword" | "confirmPassword" | null
  >(null);
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // guard if user leave before handle this step
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  async function handleResetPassword(values: z.infer<typeof passwordSchema>) {
    setIsLoading(true);
    const newData = {
      email: email,
      newPassword: values.newPassword,
    };
    try {
      const response = await resetPassword(newData);
      if (!mountedRef.current) return;
      if (response.token) {
        toast.success("Password Changed Successfully, Sign In Again", {
          richColors: true,
          position: "top-center",
        });
        localStorage.removeItem("email");
        setStep("reseted");
      }
      if (response.statusMsg === "fail") {
        toast.info(response.message, {
          richColors: true,
          position: "top-center",
        });
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.error(err);
      toast.error("Something Went Wrong", {
        richColors: true,
        position: "top-right",
      });
    } finally {
      if (mountedRef.current) setIsLoading(false);
    }
  }

  return (
    <form
      id="form-rhf-input"
      className="space-y-4"
      onSubmit={form.handleSubmit(handleResetPassword)}
    >
      <FieldGroup>
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-gray-700 mb-2"
                htmlFor="resetPassword"
              >
                New Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="resetPassword"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter New Password"
                  autoComplete="off"
                  className=" py-5 sm:py-6 ps-10 pe-4 text-xs sm:text-sm"
                  type={showPassword === "newPassword" ? "text" : "password"}
                />
                <FaLock className="absolute top-1/2 left-[3%] text-[#99A1AF] -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) =>
                      prev === "newPassword"
                        ? (prev = null)
                        : (prev = "newPassword"),
                    )
                  }
                  className="absolute top-1/2 right-[3%] text-xl text-[#99A1AF] -translate-y-1/2 cursor-pointer"
                >
                  {showPassword === "newPassword" ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-gray-700 mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="confirmPassword"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm New Password"
                  autoComplete="off"
                  className=" py-5 sm:py-6 ps-10 pe-4 text-xs sm:text-sm"
                  type={
                    showPassword === "confirmPassword" ? "text" : "password"
                  }
                />
                <FaLock className="absolute top-1/2 left-[3%] text-[#99A1AF] -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) =>
                      prev === "confirmPassword"
                        ? (prev = null)
                        : (prev = "confirmPassword"),
                    )
                  }
                  className="absolute top-1/2 right-[3%] text-xl text-[#99A1AF] -translate-y-1/2 cursor-pointer"
                >
                  {showPassword === "confirmPassword" ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <Button
          disabled={isLoading}
          type="submit"
          form="form-rhf-input"
          className="w-full cursor-pointer text-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Resetting Password...
            </>
          ) : (
            <>Reset Password</>
          )}
        </Button>
      </Field>
    </form>
  );
};

export default NewPasswordStep;
