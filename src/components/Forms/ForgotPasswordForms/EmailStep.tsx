import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { FaEnvelope, FaSpinner } from "react-icons/fa6";
import { Input } from "../../ui/input";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { forgotPassword } from "@/actions/userAuth.action";
import { emailSchema } from "@/schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<"email" | "code" | "password" | "reseted">
  >;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};
const EmailStep = ({ setStep, setEmail }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
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
  async function handleForgotPassword(data: z.infer<typeof emailSchema>) {
    setIsLoading(true);
    try {
      const response = await forgotPassword(data);
      if (!mountedRef.current) return;

      if (response.statusMsg === "success") {
        setEmail(data.email);
        toast.success(response.message, {
          richColors: true,
          position: "top-right",
        });
        setStep("code");
      } else if (response.statusMsg == "fail") {
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
      className="space-y-4 w-full"
      onSubmit={form.handleSubmit(handleForgotPassword)}
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-heading"
                htmlFor="form-rhf-input-Email Address"
              >
                Email Address
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="form-rhf-input-Email Address"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className=" py-5 sm:py-6 ps-10 pe-4 text-xs sm:text-sm"
                />
                <FaEnvelope className="absolute top-1/2 left-[3%] text-[#99A1AF] -translate-y-1/2" />
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
              <FaSpinner className="animate-spin" /> Sending Code...
            </>
          ) : (
            <>Send Reset Code</>
          )}
        </Button>
      </Field>
    </form>
  );
};

export default EmailStep;
