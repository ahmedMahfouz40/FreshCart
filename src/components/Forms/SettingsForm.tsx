"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { settingsSchema } from "@/schemas/SettingsForm.schema";
import { IoSaveSharp } from "react-icons/io5";
import { updateLoggedUserData } from "@/actions/userAuth.action";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa6";
import { useSession } from "next-auth/react";

export default function SettingsForm() {
  const [isUpdated, setIsUpdated] = useState<"success" | "fail" | false>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  // unMounting Phse
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  // Updating Phase
  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name ?? "",
        email: "",
        phone: "",
      });
    }
  }, [session, form]);
  // hadnle fail message
  const handleFail = useCallback((message: string) => {
    setIsUpdated("fail");
    setErrorMessage(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsUpdated(false);
    }, 10000);
  }, []);

  const handleUpdateUserData = useCallback(
    async (values: z.infer<typeof settingsSchema>) => {
      setIsLoading(true);
      try {
        const res = await updateLoggedUserData(values);
        if (res.message === "success") {
          setIsUpdated("success");
          form.reset({
            name: values.name,
            email: "",
            phone: "",
          });
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setIsUpdated(false);
          }, 10000);
        } else if (res.statusMsg === "fail") {
          handleFail(res.message);
        } else if (res.message == "fail") {
          handleFail(res.errors.msg);
        }
      } catch {
        toast.error("cannot update user data", {
          richColors: true,
          position: "top-center",
        });
        throw new Error("cannot update user data");
      } finally {
        setIsLoading(false);
      }
    },
    [form, handleFail],
  );

  return (
    <form
      id="form-rhf-input"
      onSubmit={form.handleSubmit(handleUpdateUserData)}
      className="space-y-5"
    >
      {/* If User Updated Successfully */}
      {isUpdated === "success" ? (
        <div
          className={`mb-6 p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200`}
        >
          Profile updated successfully
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

      {/* Full Name */}
      <div>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-name">Full Name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Usama"
                  className="py-4"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      {/* Email */}
      <div>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-email">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Email"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      {/* Phone Number */}
      <div>
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-phone">
                  Phone Number Address
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="010xxxxxxxx"
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
        className={`  ${isLoading && "cursor-not-allowed opacity-60"} active:scale-[0.98] py-3 px-6 rounded-xl bg-primary text-white flex items-center gap-2 cursor-pointer hover:bg-primary-700 hover:scale-[1.01]  transition-all duration-200`}
      >
        {isLoading ? (
          <>
            <FaSpinner className="text-sm animate-spin" /> Saving..
          </>
        ) : (
          <>
            <IoSaveSharp /> Save Changes
          </>
        )}
      </button>
    </form>
  );
}
