"use client";
import { FaArrowLeft, FaEnvelope, FaKey, FaLock } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import NewPasswordStep from "./NewPasswordStep";
import EmailStep from "./EmailStep";
import CodeStep from "./CodeStep";
import ResetedPassword from "@/components/RestPassworSuccess/ResetedPassword";

export default function MainForm() {
  const [step, setStep] = useState<"email" | "code" | "password" | "reseted">(
    "email",
  );
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="w-full ">
        {step === "reseted" ? (
          <ResetedPassword />
        ) : (
          <>
            <div>
              {/* header */}
              <div className="text-center space-y-2 text-3xl font-bold leading-9 mb-8 text-[#1E2939]">
                <p className="text-3xl font-bold  mb-3">
                  <span className="text-primary">Fresh</span>
                  <span>Cart</span>
                </p>
                <h1>
                  {step == "email"
                    ? "Forgot Password"
                    : step === "code"
                      ? "Chech Your Email"
                      : "Create New Password"}
                </h1>

                <p className="leading-6 text-[16px] text-[#4A5565] font-medium">
                  {step == "email"
                    ? "No worries, we'll send you a reset code"
                    : step === "code"
                      ? `Enter the 6-digit code sent to ${email} `
                      : "Your new password must be different from previous passwords"}
                </p>
              </div>
              {/* Operation Line  */}
              <div className="flex items-center justify-center mb-8">
                {/* step 1 - Email */}
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 
                    ${
                      step === "email"
                        ? "ring-4 ring-primary-100 bg-primary text-white" // active
                        : "bg-primary text-white" // completed (code | password)
                    }`}
                  >
                    <FaEnvelope className="text-xs" />
                  </div>
                  {/* Line after step 1: filled when on code or password */}
                  <div
                    className={`w-10 sm:w-16 h-0.5 mx-2 transition-all duration-300 
                    ${step === "code" || step === "password" ? "bg-primary" : "bg-gray-200"}`}
                  />
                </div>

                {/* step 2 - Code */}
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 
                    ${
                      step === "code"
                        ? "ring-4 ring-primary-100 bg-primary text-white" // active
                        : step === "password"
                          ? "bg-primary text-white" // completed
                          : "bg-gray-100 text-gray-400" // inactive (email)
                    }`}
                  >
                    <FaKey className="text-xs" />
                  </div>
                  {/* Line after step 2: filled only when on password */}
                  <div
                    className={`w-10 sm:w-16 h-0.5 mx-2 transition-all duration-300 
                              ${step === "password" ? "bg-primary" : "bg-gray-200"}`}
                  />
                </div>
                {/* step 3 - Password */}
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 
                  ${
                    step === "password"
                      ? "ring-4 ring-primary-100 bg-primary text-white" // active
                      : "bg-gray-100 text-gray-400" // inactive (email | code)
                  }`}
                  >
                    <FaLock className="text-xs" />
                  </div>
                </div>
              </div>

              {step === "email" && (
                <EmailStep setStep={setStep} setEmail={setEmail} />
              )}
              {step === "code" && <CodeStep setStep={setStep} email={email} />}
              {step === "password" && (
                <NewPasswordStep setStep={setStep} email={email} />
              )}

              {step === "email" && (
                <Link
                  href={"/login"}
                  className="flex items-center gap-2 justify-center py-5 w-full text-primary text-sm mt-2"
                >
                  <FaArrowLeft /> Back to Sign In
                </Link>
              )}

              {step === "email" && (
                <div className="pt-6 border-t border-gray-200 text-center">
                  <span>
                    Remember your password?
                    <Link href={"/login"} className="text-primary">
                      {" "}
                      Sign In
                    </Link>
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
