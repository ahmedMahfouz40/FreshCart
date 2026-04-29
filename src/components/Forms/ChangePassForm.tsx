"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, Controller, useForm } from "react-hook-form";
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
import { FaEye, FaEyeSlash, FaLock, FaSpinner } from "react-icons/fa6";
import { changeUserPassword } from "@/actions/userAuth.action";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

//  Alert Banner
const AlertBanner = memo(
  ({ status, message }: { status: "success" | "fail"; message?: string }) => (
    <div
      className={`mb-6 p-4 rounded-xl text-sm font-medium border ${
        status === "success"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
    >
      {status === "success"
        ? "Password changed successfully"
        : message || "Something went wrong"}
    </div>
  ),
);

AlertBanner.displayName = "AlertBanner";

//  Password Field
const PasswordField = memo(
  ({
    name,
    label,
    description,
    inputId,
    control,
    showPassword,
    onToggle,
  }: {
    name: "currentPassword" | "password" | "rePassword";
    label: string;
    description?: string;
    inputId: string;
    control: Control<z.infer<typeof changePassSchema>>;
    showPassword: string | null;
    onToggle: (name: string) => void;
  }) => (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id={inputId}
                aria-invalid={fieldState.invalid}
                placeholder={`Enter Your ${label}`}
                className="focus-visible:border-amber-600 py-6 rounded-2xl"
                type={showPassword === name ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => onToggle(name)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400  text-xs sm:text-sm hover:text-gray-600 cursor-pointer"
              >
                {showPassword === name ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  ),
);
PasswordField.displayName = "PasswordField";

// ─── Fields Config
const fields = [
  {
    name: "currentPassword",
    label: "Current Password",
    inputId: "form-rhf-input-currentPass",
  },
  {
    name: "password",
    label: "New Password",
    inputId: "form-rhf-input-password",
    description: "Must be at least 6 characters",
  },
  {
    name: "rePassword",
    label: "Confirm New Password",
    inputId: "form-rhf-input-rePass",
  },
] as const;

// ─── Main Form
export default function ChangePassForm() {
  const [isUpdated, setIsUpdated] = useState<"success" | "fail" | false>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

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
          timeoutRef.current = setTimeout(() => setIsUpdated(false), 10000);
        } else if (res.statusMsg === "fail") {
          handleFail(res.message);
        } else if (res.message === "fail") {
          handleFail(res.errors.msg);
        }
      } catch {
        toast.error("Cannot change password", {
          richColors: true,
          position: "top-center",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [form, handleFail],
  );

  const handleShowPassword = useCallback((msg: string) => {
    setShowPassword((prev) => (prev === msg ? null : msg));
  }, []);

  return (
    <form
      id="form-rhf-input"
      onSubmit={form.handleSubmit(handleChangeUsrPassword)}
      className="space-y-5"
    >
      {isUpdated && <AlertBanner status={isUpdated} message={errorMessage} />}

      {fields.map((f) => (
        <PasswordField
          key={f.name}
          {...f}
          control={form.control}
          showPassword={showPassword}
          onToggle={handleShowPassword}
        />
      ))}

      <button
        disabled={isLoading}
        type="submit"
        className={`${isLoading && "opacity-60 cursor-not-allowed"} active:scale-[0.98] py-3 px-6 rounded-xl bg-[#E17100] text-white flex items-center gap-2 cursor-pointer hover:scale-[1.01] transition-all duration-200`}
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
