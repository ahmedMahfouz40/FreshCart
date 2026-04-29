"use client";

import { useForm, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaCheck, FaHeadset, FaPaperPlane, FaSpinner } from "react-icons/fa6";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type Status = "idle" | "loading" | "success";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ContactUsForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const handleContactUs = async (data: FormData) => {
    setStatus("loading");

    await delay(1000);

    console.log("data from contact us", data);

    setStatus("success");
    reset();

    setTimeout(() => setStatus("idle"), 5000);
  };
  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
            <FaHeadset className="text-primary-600 text-lg" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-heading">
              Send us a Message
            </h2>
            <p className="text-gray-500 text-sm">
              Fill out the form and we&apos;ll get back to you
            </p>
          </div>
        </div>
        {/* if Submeted */}
        {status === "success" && (
          <div className="mb-6 p-4  rounded-xl bg-green-50 border border-green-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <FaCheck className="text-primary text-sm" />
            </div>
            <div>
              <p className="font-medium text-green-800">
                Message sent successfully!
              </p>
              <p className="text-green-600 text-sm">
                We&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(handleContactUs)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-6  text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  />
                )}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-6 rounded-xl  text-xs sm:text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  />
                )}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>

            <Controller
              name="subject"
              control={control}
              rules={{
                required: "Subject is required",
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-6 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-white">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>

                    <SelectContent className=" text-xs sm:text-sm">
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="order">Order Support</SelectItem>
                      <SelectItem value="shipping">
                        Shipping Question
                      </SelectItem>
                      <SelectItem value="returns">Returns & Refunds</SelectItem>
                      <SelectItem value="product">
                        Product Information
                      </SelectItem>
                      <SelectItem value="feedback">
                        Feedback & Suggestions
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>

            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  rows={5}
                  required
                  placeholder="How can we help you?"
                  className="w-full  text-xs sm:text-sm px-4 py-6 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
                />
              )}
            />
          </div>

          {/* Submit */}
          <button
            disabled={status === "loading"}
            type="submit"
            className={` w-full md:w-auto inline-flex items-center justify-center cursor-pointer gap-2 px-8 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-primary-600/20`}
          >
            {status === "loading" ? (
              <>
                <FaSpinner className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
