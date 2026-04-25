"use client";
import { DeleteAddress } from "@/actions/userAddress.action";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { removeAddress } from "@/redux/slices/addressSlice";
import { address } from "@/types/addresses.type";
import React, { useCallback, useState } from "react";
import {
  FaCity,
  FaLocationDot,
  FaPencil,
  FaPhone,
  FaSpinner,
  FaTrash,
} from "react-icons/fa6";
import { toast } from "sonner";
import AddAddressModal from "../AddAddressModal/AddAddressModal";

const AddressCart = ({ item }: { item: address }) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setisDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleDeleteAddress = useCallback(async () => {
    setisDeleting(true);
    try {
      const res = await DeleteAddress(item._id);

      if (res.status === "success") {
        toast.success(res.message, {
          richColors: true,
          position: "top-center",
        });
        dispatch(removeAddress(item._id));
      }
    } catch {
      toast.error("Failed to delete address. Please try again.", {
        richColors: true,
        position: "top-center",
      });
    } finally {
      setisDeleting(false);
    }
  }, [item._id, dispatch]);

  return (
    <>
      <AddAddressModal
        defaultValues={{
          name: item._id,
          city: item.city,
          details: item.details,
          phone: item.phone,
        }}
        addressId={item._id}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <div className="col-span-2 lg:col-span-1">
        <div className="p-5 border min-h-40 border-gray-100 rounded-2xl shadow  hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="bg-primary-50/50 text-primary self-start w-11 h-11 rounded-xl flex items-center justify-center">
                <FaLocationDot />
              </span>
              <div>
                <h3 className=" font-bold text-heading ">{item.name}</h3>
                <p className="text-[#4A5565] text-sm">{item.details}</p>
                <div className=" mt-5 flex items-center flex-wrap gap-4 text-[#4A5565] text-sm">
                  <p className=" leading-5  flex items-center gap-2">
                    <FaPhone /> {item.phone}
                  </p>
                  <span>.</span>
                  <p className=" leading-5 flex items-center gap-2">
                    <FaCity /> {item.city}
                  </p>
                </div>
              </div>
            </div>
            {/* Btns (Update & Delete ) */}
            <div className="self-start flex gap-2 items-center">
              <button
                onClick={() => setIsEditOpen(true)}
                className="w-9 h-9 rounded-lg cursor-pointer  bg-[#F3F4F6]  hover:bg-primary-200 hover:text-primary transition-colors text-[#4A5565] flex items-center justify-center"
              >
                <FaPencil />
              </button>
              <button
                disabled={isDeleting}
                onClick={handleDeleteAddress}
                className={`  w-9 h-9 rounded-lg cursor-pointer  bg-[#F3F4F6] hover:bg-red-200 hover:text-red-500 transition-colors  text-[#4A5565] flex items-center justify-center`}
              >
                {isDeleting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaTrash />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AddressCart);
