"use client";
import BackToCart from "@/app/_components/Buttons/BackToCart";
import Container from "@/app/_components/Container/Container";
import { FaInfoCircle, FaShieldAlt } from "react-icons/fa";
import {
  FaBookmark,
  FaCity,
  FaHouse,
  FaLocationDot,
  FaLock,
  FaMapPin,
  FaMoneyBill,
  FaPhone,
  FaReceipt,
  FaSpinner,
  FaTruck,
} from "react-icons/fa6";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HiCreditCard } from "react-icons/hi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InfoBanner from "@/app/_components/InfoBanner/InfoBanner";
import { BsBox2Fill, BsFillCreditCard2BackFill } from "react-icons/bs";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import OrderSummaryCart from "@/app/_skeletons/OrderSummaryCart";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchemeType } from "@/types/paymentSchemeType";
import { paymentScheme } from "@/app/_schemas/payment.schema";
import { createCashOrder, createVisaOrder } from "@/app/_actions/orders.action";
import { orderValues } from "@/types/order.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PaymentEmpty from "@/app/_components/PaymentEmpty/PaymentEmpty";
import PaymentLoading from "@/app/_components/PaymentLoading/PaymentLoading";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { clearCart, fetchUserCart } from "@/app/_redux/slices/cartSlice";
const egyptGovernorates = [
  { value: "cairo", label: "Cairo" },
  { value: "alexandria", label: "Alexandria" },
  { value: "giza", label: "Giza" },
  { value: "qalyubia", label: "Qalyubia" },
  { value: "port-said", label: "Port Said" },
  { value: "suez", label: "Suez" },
  { value: "ismailia", label: "Ismailia" },
  { value: "damietta", label: "Damietta" },
  { value: "dakahlia", label: "Dakahlia" },
  { value: "sharqia", label: "Sharqia" },
  { value: "gharbia", label: "Gharbia" },
  { value: "monufia", label: "Monufia" },
  { value: "kafr-el-sheikh", label: "Kafr El Sheikh" },
  { value: "beheira", label: "Beheira" },
  { value: "faiyum", label: "Faiyum" },
  { value: "beni-suef", label: "Beni Suef" },
  { value: "minya", label: "Minya" },
  { value: "asyut", label: "Asyut" },
  { value: "sohag", label: "Sohag" },
  { value: "qena", label: "Qena" },
  { value: "luxor", label: "Luxor" },
  { value: "aswan", label: "Aswan" },
  { value: "red-sea", label: "Red Sea" },
  { value: "new-valley", label: "New Valley" },
  { value: "north-sinai", label: "North Sinai" },
  { value: "south-sinai", label: "South Sinai" },
];
export const dynamic = "force-dynamic";
const Page = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const router = useRouter();

  const cartReducer = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  const form = useForm<paymentSchemeType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "cash",
      postalCode: "",
    },
    resolver: zodResolver(paymentScheme),
    mode: "onChange",
  });

  async function handleCreateOrder(values: orderValues) {
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
        const res = await createCashOrder(cartReducer.cartId, userData);

        if (res.status === "success") {
          toast.success(res.message, {
            position: "top-center",
            richColors: true,
          });

          await dispatch(fetchUserCart());
          router.push(`/allorders`);
        }
      } catch (error) {
        console.log("error during payment", error);
        toast.error("payment Faild", {
          position: "top-right",
          richColors: true,
        });
      } finally {
        setIsPaymentLoading(false);
      }
    } else if (values.paymentMethod == "visa") {
      try {
        const res = await createVisaOrder(cartReducer.cartId, userData);
        console.log(res);

        if (res.status === "success") {
          window.open(res.session.url);
          dispatch(clearCart());
        }
      } catch (error) {
        console.log("error payment", error);
        toast.error("payment Faild", {
          position: "top-right",
          richColors: true,
        });
      } finally {
        setIsPaymentLoading(false);
      }
    }
  }
  if (cartReducer.isLoading) return <PaymentLoading />;
  return (
    <>
      <div className="bg-gray-50">
        <Container>
          {cartReducer.numOfCartItems > 0 ? (
            <>
              <div className="header space-y-5 py-4">
                <div className="text-sm leading-5">
                  <span className=" text-muted-foreground">Home / cart / </span>
                  <span className="text-heading">Checkout</span>
                </div>
                <div className="flex flex-col gap-4  sm:flex-row justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-3xl">
                      <span className="w-12 h-12 bg-primary-600 text-white flex items-center justify-center  rounded-xl">
                        <FaReceipt />
                      </span>
                      <h2 className="font-bold  text-heading">
                        Complete Your Order
                      </h2>
                    </div>
                    <p className="text-muted-foreground font-semibold leading-4">
                      Review your items and complete your purchase
                    </p>
                  </div>
                  <div className="self-end sm:self-stretch">
                    <BackToCart />
                  </div>
                </div>
              </div>

              <div className="lg:grid lg:grid-cols-12 gap-6 ">
                {/* Left Side */}
                <div className="col-span-8  rounded-2xl bg-white overflow-hidden ">
                  {/* Shipping Address */}
                  <div>
                    <InfoBanner
                      icon={<FaHouse />}
                      title="Shipping Address"
                      desc="Where should we deliver your order?"
                    />
                    <div className="space-y-4    p-4 rounded-2xl">
                      <div className="  space-y-2 ">
                        <span className="flex items-center gap-2 text-gray-800 font-semibold">
                          <FaBookmark className="text-primary" /> Saved
                          Addresses
                        </span>
                        <p className="text-sm text-gray-600">
                          Select a saved address or enter a new one below
                        </p>
                      </div>
                      {/* delivery information */}
                      <div className=" flex  items-center gap-3 border border-blue-200 bg-blue-100 p-4  rounded-2xl">
                        <span className="w-8 h-8 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center">
                          <FaInfoCircle />
                        </span>
                        <div>
                          <h5 className="text-sm text-blue-800">
                            Delivery Information
                          </h5>
                          <p className="text-xs text-blue-600">
                            Please ensure your address is accurate for smooth
                            delivery
                          </p>
                        </div>
                      </div>
                      {/* Saved Address */}
                    </div>
                  </div>
                  <form
                    id="myForm"
                    onSubmit={form.handleSubmit(handleCreateOrder)}
                  >
                    <div className="p-4  rounded-b-2xl mb-5 space-y-5 shadow-xl">
                      {/* City */}
                      <div>
                        <Controller
                          name="city"
                          control={form.control}
                          defaultValue=""
                          render={({ field, fieldState }) => (
                            <div>
                              <Label className="font-bold text-sm text-gray-700 mb-2">
                                City <span className="text-red-500">*</span>
                              </Label>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger
                                  className={`w-full ps-14! py-6 border-2 relative ${fieldState.error ? "border-red-500" : ""}`}
                                >
                                  <SelectValue placeholder="e.g. Cairo, Alexandria, Giza" />
                                  <span className="absolute top-1/2 left-5 -translate-y-1/2 w-8 h-8 rounded bg-[#F3F4F6] flex items-center justify-center">
                                    <FaCity />
                                  </span>
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectGroup>
                                    {egyptGovernorates.map((gov) => (
                                      <SelectItem
                                        key={gov.value}
                                        value={gov.value}
                                      >
                                        {gov.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>

                              {/* error handling */}
                              {fieldState.error && (
                                <p className="text-red-500 text-xs mt-1">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
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
                                htmlFor="input-field-username"
                                className="font-bold text-sm text-gray-700"
                              >
                                Phone Number{" "}
                                <span className="text-red-600">*</span>
                              </FieldLabel>
                              <div className="relative">
                                <Input
                                  {...field}
                                  id="input-field-username"
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
                                htmlFor="input-field-username"
                                className="font-bold text-sm text-gray-700"
                              >
                                Postal Code{" "}
                                <span className="text-red-600">*</span>
                              </FieldLabel>
                              <div className="relative">
                                <Input
                                  {...field}
                                  id="input-field-username"
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
                                        Pay when your order arrives at your
                                        doorstep
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
                              Your payment info is protected with 256-bit SSL
                              encryption
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Right side */}

                <div className="col-span-4  rounded-2xl  ">
                  <div className="sticky top-20">
                    <InfoBanner
                      icon={<FaLock />}
                      title="Order Summary"
                      desc={`${cartReducer.numOfCartItems} items`}
                    />
                    <div className="bg-white shadow p-5 mb-3 rounded-b-2xl">
                      <div className="max-h-56 overflow-y-auto  ">
                        {/*   Item */}
                        {cartReducer.isLoading ? (
                          <>
                            {[1, 2, 3].map((i) => (
                              <OrderSummaryCart key={i} />
                            ))}
                          </>
                        ) : (
                          cartReducer.cartProducts?.map((item) => (
                            <div
                              key={item.product._id}
                              className="p-3  mb-4 bg-[#F9FAFB] rounded-xl flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-white rounded relative">
                                  <Image
                                    src={item.product.imageCover}
                                    fill
                                    alt="image"
                                    className="w-full"
                                  />
                                </div>
                                <div>
                                  <h5 className="text-sm text-heading leading-5 self-start truncate max-w-45">
                                    {item.product.title}
                                  </h5>
                                  <p className="text-xs text-[#6A7282] leading-4">
                                    {item.count} × {item.price} EGP
                                  </p>
                                </div>
                              </div>
                              <span className="text-sm font-bold text-heading">
                                {item.price * item.count}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="py-5 border-t border-gray-200">
                        <div className="mb-5">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-500">Subtotal</span>
                              <span className="text-primary">
                                {cartReducer.totalCartPrice} EGP
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-500 flex items-center gap-2">
                                <FaTruck /> Shipping
                              </span>
                              <span className="text-primary">FREE</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-2 pt-2 border-t">
                            <span className="text-heading font-bold text-lg">
                              Total
                            </span>
                            <div>
                              <span className="text-primary font-bold text-2xl">
                                {cartReducer.totalCartPrice}
                              </span>
                              <span className="text-gray-400 text-sm">EGP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Btn */}
                      <button
                        form="myForm"
                        type="submit"
                        disabled={isPaymentLoading}
                        className={`bg-linear-to-r disabled:opacity-50 disabled:cursor-not-allowed from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800  text-white transition-colors flex items-center justify-center w-full  text-sm cursor-pointer rounded-xl  py-4 gap-2`}
                      >
                        {isPaymentLoading ? (
                          <>
                            <FaSpinner className="animate-spin" />{" "}
                            Processing...{" "}
                          </>
                        ) : (
                          <>
                            <BsBox2Fill /> Place Order
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2 mt-10 justify-around border-t border-gray-100 pt-3 text-center text-sm text-gray-500">
                        <div className="flex items-center gap-1 w-1/3   ">
                          <FaShieldAlt className="text-green-600" /> Secure
                        </div>
                        <div className="flex items-center gap-1  w-1/3">
                          <FaTruck className="text-blue-600" /> Fast Delivery
                        </div>
                        <div className="flex items-center gap-1  w-1/3">
                          <BsBox2Fill className="text-orange-600" /> Easy
                          Returns
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <PaymentEmpty />
          )}
        </Container>
      </div>
    </>
  );
};

export default Page;
