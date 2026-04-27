"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError, FieldLabel } from "@/components/ui/field";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { addAddressSchema } from "@/schemas/AddAddress.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAddressDataType } from "@/types/addresses.type";
import {
  addUserAddress,
  updateUserAddress,
} from "@/actions/userAddress.action";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/reduxHooks";
import React, { ReactNode, useState } from "react";
import { fetchUserAddress } from "@/redux/slices/addressSlice";
import { FaSpinner } from "react-icons/fa6";

interface props {
  buttonTitle?: string | ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValues?: addAddressDataType;
  addressId?: string;
}

const emptyValues: addAddressDataType = {
  name: "",
  details: "",
  phone: "",
  city: "",
};

export default React.memo(function AddAddressModal({
  buttonTitle,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  defaultValues,
  addressId,
}: props) {
  const dispatch = useAppDispatch();
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditMode = !!addressId;
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;

  const form = useForm<addAddressDataType>({
    defaultValues: defaultValues ?? emptyValues,
    resolver: zodResolver(addAddressSchema),
  });

  async function handleAddress(values: addAddressDataType) {
    setLoading(true);

    const res = isEditMode
      ? await updateUserAddress(addressId, values)
      : await addUserAddress(values);

    setLoading(false);
    if (res.status === "success") {
      toast.success(res.message, {
        position: "top-right",
        richColors: true,
      });
      dispatch(fetchUserAddress());
      form.reset();
      setOpen(false);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {buttonTitle && (
          <Button
            variant="default"
            className="px-5 py-3 self-end sm:self-stretch bg-primary text-white rounded-xl text-center cursor-pointer"
          >
            {buttonTitle}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="p-4 sm:p-6 rounded-2xl  sm:max-w-[90%]  md:max-w-[80%] lg:max-w-[70%] xl:max-w-[45%]">
        <form onSubmit={form.handleSubmit(handleAddress)}>
          <DialogHeader>
            <DialogTitle className="text-heading font-bold text-xl">
              {isEditMode ? "Update Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>
          <FieldGroup className="py-3">
            {/* Full Name */}
            <div>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Address Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g.Home, Office"
                      autoComplete="off"
                      type="text"
                      className="py-6 rounded-2xl"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            {/* Full Details */}
            <div>
              <Controller
                name="details"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-details">
                      Full Address
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-demo-details"
                        placeholder="Street, building, apartment..."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end"></InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Phone &City*/}
            <div className="flex flex-wrap items-center gap-3 ">
              {/* Phone Number */}
              <div className="flex-1">
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-phone">
                        Phone Number
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-phone"
                        aria-invalid={fieldState.invalid}
                        placeholder="010xxxxxxxx"
                        autoComplete="off"
                        type="text"
                        className="py-6 rounded-2xl"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* City */}
              <div className="flex-1">
                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-city">City</FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-city"
                        aria-invalid={fieldState.invalid}
                        placeholder="Cairo"
                        autoComplete="off"
                        type="text"
                        className="py-6 rounded-2xl"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
          </FieldGroup>
          <DialogFooter className="flex items-center gap-2">
            <DialogClose asChild className="flex-1 cursor-pointer">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={loading}
              type="submit"
              className="flex-1 cursor-pointer hover:bg-primary-700 transition-colors"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  {isEditMode ? " Updating..." : " Adding..."}
                </>
              ) : isEditMode ? (
                "Update Address"
              ) : (
                "Add Address"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
