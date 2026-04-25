"use client";
import { FaInfoCircle, FaShieldAlt } from "react-icons/fa";
import {
  FaCity,
  FaLocationDot,
  FaMapPin,
  FaMoneyBill,
  FaPhone,
} from "react-icons/fa6";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";

import { HiCreditCard } from "react-icons/hi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InfoBanner from "@/app/_components/InfoBanner/InfoBanner";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { Controller, useForm, useWatch } from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchemeType } from "@/types/paymentSchemeType";
import { paymentScheme } from "@/schemas/payment.schema";
import { createCashOrder, createVisaOrder } from "@/actions/orders.action";
import { orderValues } from "@/types/order.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { clearCart, fetchUserCart } from "@/redux/slices/cartSlice";

interface chechoutFormProps {
  setIsPaymentLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cartId: string;
}
const CheckoutForm = ({ setIsPaymentLoading, cartId }: chechoutFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { userAddresses } = useAppSelector((state) => state.userAddressReducer);

  const form = useForm<paymentSchemeType>({
    defaultValues: {
      city: "",
      details: "",
      phone: "",
      postalCode: "",

      paymentMethod: "cash",
      address: "",
    },
    resolver: zodResolver(paymentScheme),
    mode: "onBlur",
  });

  const selectedAddressId = useWatch({
    control: form.control,
    name: "address",
  });
  useEffect(() => {
    if (!selectedAddressId) {
      form.reset({
        ...form.getValues(),
        details: "",
        phone: "",
        city: "",
        postalCode: "",
      });
      return;
    }

    const selectedAddress = userAddresses.find(
      (item) => item._id === selectedAddressId,
    );
    if (!selectedAddress) return;
    form.setValue("details", selectedAddress.details, { shouldValidate: true });
    form.setValue("phone", selectedAddress.phone, { shouldValidate: true });
    form.setValue("city", selectedAddress.city, { shouldValidate: true });
  }, [selectedAddressId, userAddresses, form]);

  const handleCreateOrder = useCallback(
    async (values: orderValues) => {
      setIsPaymentLoading(true);
      const userData = {
        shippingAddress: {
          details: values.details,
          phone: values.phone,
          city: values.city,
          postalCode: values.postalCode,
        },
      };
      if (values.paymentMethod == "cash") {
        try {
          const res = await createCashOrder(cartId, userData);

          if (res.status === "success") {
            toast.success(res.message, {
              position: "top-center",
              richColors: true,
            });
            await dispatch(fetchUserCart());
            router.push(`/allorders`);
          }
        } catch {
          toast.error("payment Faild", {
            position: "top-right",
            richColors: true,
          });
        } finally {
          setIsPaymentLoading(false);
        }
      } else if (values.paymentMethod == "visa") {
        try {
          const res = await createVisaOrder(cartId, userData);

          if (res.status === "success") {
            window.open(res.session.url);
            dispatch(clearCart());
          }
        } catch {
          toast.error("payment Faild", {
            position: "top-right",
            richColors: true,
          });
        } finally {
          setIsPaymentLoading(false);
        }
      }
    },
    [cartId, dispatch, router, setIsPaymentLoading],
  );

  return (
    <form id="myForm" onSubmit={form.handleSubmit(handleCreateOrder)}>
      <div className="p-4  rounded-b-2xl mb-5 space-y-5 shadow-xl">
        {/* Saved Addresses */}
        {userAddresses.length > 0 && (
          <Controller
            name="address"
            control={form.control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                className="max-w-full space-y-3"
              >
                {/* dynamic Address */}
                {userAddresses.map((item) => (
                  <FieldLabel
                    key={item._id}
                    htmlFor={item._id}
                    className="p-5 rounded-xl border cursor-pointer transition-all
                                  group has-[button[data-state=checked]]:border-primary 
                                has-[button[data-state=checked]]:bg-primary/5"
                  >
                    <Field
                      orientation="horizontal"
                      className="items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span
                          className="w-12 h-12 me-3 rounded-xl bg-[#F3F4F6] text-[#99A1AF] 
                                        flex items-center justify-center text-xl
                                        transition-all
                                      group-has-[button[data-state=checked]]:bg-primary
                                      group-has-[button[data-state=checked]]:text-white"
                        >
                          <FaLocationDot />
                        </span>

                        <FieldContent>
                          <FieldTitle className="font-bold leading-6 text-heading group-has-[button[data-state=checked]]:text-primary-700">
                            {item.name}
                          </FieldTitle>
                          <FieldDescription className="text-sm text-[#6A7282]">
                            {item.details}
                          </FieldDescription>

                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaPhone className="text-[10px]" />
                              {item.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaCity className="text-[10px]" />
                              {item.city}
                            </span>
                          </div>
                        </FieldContent>
                      </div>

                      <RadioGroupItem
                        value={item._id}
                        id={item._id}
                        onClick={() => {
                          if (field.value === item._id) {
                            field.onChange(""); // deselect
                          }
                        }}
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            )}
          />
        )}
        {/* delivery direction */}
        <div className=" flex  items-center gap-3 border border-blue-200 bg-blue-100 p-4  rounded-2xl">
          <span className="w-8 h-8 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center">
            <FaInfoCircle />
          </span>
          <div>
            <h5 className="text-sm text-blue-800">Delivery Information</h5>
            <p className="text-xs text-blue-600">
              Please ensure your address is accurate for smooth delivery
            </p>
          </div>
        </div>
        {/* City */}
        <div>
          <Controller
            name="city"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor="input-field-city"
                  className="font-bold text-sm text-gray-700"
                >
                  City <span className="text-red-600">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="input-field-city"
                    type="text"
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    className={`py-6 pe-4 ps-14 border-2 ${fieldState.invalid && "border-red-500"}`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <div className="absolute left-5 top-[50%] -translate-y-1/2 text-gray-600 bg-gray-200 w-8 h-8 flex items-center justify-center rounded">
                    <FaCity />
                  </div>
                </div>
              </Field>
            )}
          />
        </div>
        {/* Street Address */}
        <div>
          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="font-bold text-sm text-gray-700">
                  Street Address
                  <span className="text-red-600">*</span>
                </FieldLabel>
                <div className="relative">
                  <Textarea
                    {...field}
                    placeholder="Street name, building number, floor, apartment..."
                    className={`pt-4 pe-4 pb-15.5 min-h-20 resize-none ps-14 border-2 ${fieldState.error ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <div className="absolute left-5 top-[25%] -translate-y-1/2 text-gray-600 bg-gray-200 w-8 h-8 flex items-center justify-center rounded">
                    <FaLocationDot />
                  </div>
                </div>
              </Field>
            )}
          />
        </div>
        {/* Phone Number */}
        <div>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor="input-field-phone"
                  className="font-bold text-sm text-gray-700"
                >
                  Phone Number <span className="text-red-600">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="input-field-phone"
                    type="tel"
                    placeholder="010xxxxxxxx "
                    className={`py-6 pe-4 ps-14 border-2 ${fieldState.invalid && "border-red-500"}`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <div className="absolute left-5 top-[50%] -translate-y-1/2 text-gray-600 bg-gray-200 w-8 h-8 flex items-center justify-center rounded">
                    <FaPhone />
                  </div>
                  <p className="absolute hidden sm:block inset-e-5 top-[50%] -translate-y-1/2 text-xs text-gray-400">
                    Egyptian numbers only
                  </p>
                </div>
              </Field>
            )}
          />
        </div>
        {/* Postal Code */}
        <div>
          <Controller
            name="postalCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor="input-field-postalCode"
                  className="font-bold text-sm text-gray-700"
                >
                  Postal Code <span className="text-red-600">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="input-field-postalCode"
                    type="text"
                    placeholder="ex..12345 "
                    className={`py-6 pe-4 ps-14 border-2 ${fieldState.invalid && "border-red-500"}`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <div className="absolute  left-5 top-[50%] -translate-y-1/2 text-gray-600 bg-gray-200 w-8 h-8 flex items-center justify-center rounded">
                    <FaMapPin />
                  </div>
                  <p className="absolute hidden sm:block inset-e-5 top-[50%] -translate-y-1/2 text-xs text-gray-400">
                    Used for accurate delivery to your area.
                  </p>
                </div>
              </Field>
            )}
          />
        </div>
      </div>

      {/*Payment Method  */}
      <div className="shadow-xl shadow-gray-100 bg-white">
        <InfoBanner
          icon={<BsFillCreditCard2BackFill />}
          title="Payment Method"
          desc="Choose how you'd like to pay"
        />

        <div className="space-y-3  mb-8 p-4  shadow-lg rounded-2xl">
          <Controller
            name="paymentMethod"
            control={form.control}
            defaultValue="cash"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="max-w-full space-y-3"
              >
                {/* Cash */}
                <FieldLabel
                  htmlFor="cash"
                  className="p-5 rounded-xl border cursor-pointer transition-all
                                  group has-[button[data-state=checked]]:border-primary 
                                has-[button[data-state=checked]]:bg-primary/5"
                >
                  <Field
                    orientation="horizontal"
                    className="items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span
                        className="w-14 h-14 me-3 rounded-xl bg-[#F3F4F6] text-[#99A1AF] 
                                        flex items-center justify-center text-2xl
                                        transition-all
                                      group-has-[button[data-state=checked]]:bg-primary
                                      group-has-[button[data-state=checked]]:text-white"
                      >
                        <FaMoneyBill />
                      </span>

                      <FieldContent>
                        <FieldTitle className="font-bold leading-6 text-heading group-has-[button[data-state=checked]]:text-primary-700">
                          Cash on Delivery
                        </FieldTitle>
                        <FieldDescription className="text-sm text-[#6A7282]">
                          Pay when your order arrives at your doorstep
                        </FieldDescription>
                      </FieldContent>
                    </div>

                    <RadioGroupItem value="cash" id="cash" />
                  </Field>
                </FieldLabel>

                {/* Visa */}
                <FieldLabel
                  htmlFor="visa"
                  className="p-5 rounded-xl border cursor-pointer transition-all
                                  group has-[button[data-state=checked]]:border-blue-500 
                                has-[button[data-state=checked]]:bg-blue-500/5"
                >
                  <Field
                    orientation="horizontal"
                    className="items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span
                        className="w-14 h-14 me-3 rounded-xl bg-[#F3F4F6] text-[#99A1AF] 
                                        flex items-center justify-center text-2xl
                                        transition-all
                                      group-has-[button[data-state=checked]]:bg-blue-500                                     
                                      group-has-[button[data-state=checked]]:text-white"
                      >
                        <HiCreditCard />
                      </span>

                      <FieldContent className="relative">
                        <FieldTitle className="font-bold text-heading leading-6 group-has-[button[data-state=checked]]:text-blue-700">
                          Visa / Credit Card
                        </FieldTitle>

                        <FieldDescription className="text-sm text-[#6A7282]">
                          Secure payment via Stripe
                        </FieldDescription>
                      </FieldContent>
                    </div>

                    <RadioGroupItem
                      value="visa"
                      id="visa"
                      className="group-has-[button[data-state=checked]]:bg-blue-500"
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            )}
          />
          <div className=" my-5 flex  items-center gap-3 border border-primary-200 bg-primary-50/65 p-4  rounded-2xl">
            <span className="w-10 h-10 bg-primary-100 text-primary  rounded-full  flex items-center justify-center">
              <FaShieldAlt />
            </span>
            <div>
              <h5 className="font-semibold text-primary-700 text-sm">
                Secure & Encrypted
              </h5>
              <p className="text-xs text-primary-500">
                Your payment info is protected with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
