"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { changePassSchema } from "@/schemas/ChangePass.schema";
import { FaLock, FaSpinner } from "react-icons/fa6";
import { changeUserPassword } from "@/actions/userAuth.action";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ChangePassForm() {
  const [isUpdated, setIsUpdated] = useState<"success" | "fail" | false>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // to see if timout is doing or not
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  // unMounting Phase
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const form = useForm<z.infer<typeof changePassSchema>>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });
  //  Handle fail message
  const handleFail = useCallback((message: string) => {
    setIsUpdated("fail");
    setErrorMessage(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsUpdated(false);
      setErrorMessage("");
    }, 10000);
  }, []);

  const handleChangeUsrPassword = useCallback(
    async (values: z.infer<typeof changePassSchema>) => {
      setIsLoading(true);
      try {
        const res = await changeUserPassword(values);
        if (res.message === "success") {
          setIsUpdated("success");
          form.reset();
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setIsUpdated(false);
          }, 10000);
        } else if (res.statusMsg == "fail") {
          handleFail(res.message);
        } else if (res.message == "fail") {
          handleFail(res.errors.msg);
          setIsUpdated("fail");
        }
      } catch {
        toast.error("cannot change password", {
          richColors: true,
          position: "top-center",
        });
        throw new Error("cannot change password");
      } finally {
        setIsLoading(false);
      }
    },
    [form, handleFail],
  );

  return (
    <form
      id="form-rhf-input"
      onSubmit={form.handleSubmit(handleChangeUsrPassword)}
      className="space-y-5"
    >
      {/* If User Updated Successfully */}
      {isUpdated === "success" ? (
        <div
          className={`mb-6 p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200`}
        >
          Password changed successfully
        </div>
      ) : isUpdated == "fail" ? (
        <div
          className={`mb-6 p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200`}
        >
          {errorMessage || "Something went wrong"}
        </div>
      ) : (
        ""
      )}
      {/* Current Password */}
      <div>
        <FieldGroup>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-currentPass">
                  Current Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-currentPass"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Current Password"
                  className="focus-visible:border-amber-600 "
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      {/* Password */}
      <div>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-password">
                  New Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your New Password"
                  className="focus-visible:border-amber-600 "
                  type="password"
                />
                <FieldDescription>
                  {" "}
                  Must be at least 6 characters{" "}
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      {/* rePassword */}
      <div>
        <FieldGroup>
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-rePass">
                  Confirm New Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-rePass"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm Your New Password"
                  className="focus-visible:border-amber-600 "
                  type="password"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      {/* Submit Button */}
      <button
        disabled={isLoading}
        type="submit"
        className={`${isLoading && "opacity-60 cursor-not-allowed"} active:scale-[0.98]  py-3 px-6 rounded-xl bg-[#E17100] text-white flex items-center gap-2 cursor-pointer  hover:scale-[1.01]  transition-all duration-200`}
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin" /> Saving...
          </>
        ) : (
          <>
            <FaLock /> Save Changes
          </>
        )}
      </button>
    </form>
  );
}
