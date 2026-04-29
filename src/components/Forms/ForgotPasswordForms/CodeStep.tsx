import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { FaSpinner } from "react-icons/fa6";
import { Input } from "../../ui/input";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { forgotPassword, verifyResetCode } from "@/actions/userAuth.action";
import { codeSchema } from "@/schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaShieldAlt } from "react-icons/fa";
type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<"email" | "code" | "password" | "reseted">
  >;
  email: string;
};
const CodeStep = ({ setStep, email }: Props) => {
  const [isLoading, setisLoading] = useState(false);
  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      resetCode: "",
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

  async function handleVerifyCode(values: z.infer<typeof codeSchema>) {
    setisLoading(true);
    const code = {
      resetCode: values.resetCode,
    };
    try {
      const response = await verifyResetCode(code);
      if (!mountedRef.current) return;

      if (response.statusMsg === "fail") {
        toast.info(response.message, {
          richColors: true,
          position: "top-center",
        });
      }
      if (response.status === "Success") {
        toast.success("Code Correct, Add New Password", {
          richColors: true,
          position: "top-center",
        });
        setStep("password");
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.error(err);
      toast.error("Something Went Wrong", {
        richColors: true,
        position: "top-right",
      });
    } finally {
      if (mountedRef.current) setisLoading(false);
    }
  }

  return (
    <form
      id="form-rhf-input"
      className="space-y-4"
      onSubmit={form.handleSubmit(handleVerifyCode)}
    >
      <FieldGroup>
        <Controller
          name="resetCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="reset-code"
              >
                Verification Code
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="reset-code"
                  maxLength={6}
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••"
                  autoComplete="off"
                  className="w-full px-4 py-6  pl-12 border-2 border-gray-200 rounded-xl  text-2xl text-center tracking-[0.5em] "
                />
                <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 " />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <div>
          <p className="text-center text-sm my-2 text-gray-700">
            Didn&apos;t receive the code?
            <button
              type="button"
              onClick={async () => {
                await forgotPassword({ email }).then(() =>
                  toast.success(
                    "Code Sent again Successfully, Check Your Gamil",
                    {
                      richColors: true,
                      position: "top-center",
                    },
                  ),
                );
              }}
              className="text-primary cursor-pointer "
            >
              {"  "} Resend Code
            </button>
          </p>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          form="form-rhf-input"
          className="w-full cursor-pointer text-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Verifying...
            </>
          ) : (
            <>Verify Code</>
          )}
        </Button>
      </Field>
    </form>
  );
};

export default CodeStep;
