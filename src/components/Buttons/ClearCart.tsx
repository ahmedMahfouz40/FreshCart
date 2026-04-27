"use client";
import { ClearUserCart } from "@/actions/cart.actions";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { clearCart } from "@/redux/slices/cartSlice";
const ClearCart = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  async function handleClearCart() {
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 2000);

    const res = await ClearUserCart();
    if (res.status == "success") {
      dispatch(clearCart());
    }
    if (res.statusMsg == "fail") {
      toast.error(res.message, { position: "top-center", richColors: true });
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="flex items-center text-gray-500 hover:text-red-600 gap-2 transition-colors cursor-pointer bg-transparent hover:bg-transparent"
          >
            <FaTrashCan /> Clear All Items
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader className="text-2xl p-2">
            <AlertDialogMedia className="bg-primary-100 text-primary text-xl">
              <FaShoppingCart />
            </AlertDialogMedia>
            <AlertDialogTitle>Clear Your Cart?</AlertDialogTitle>
            <AlertDialogDescription>
              All items will be removed from your cart. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              className="cursor-pointer px-8 py-6"
            >
              Keep Shopping
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleClearCart}
              className="px-8 py-6 bg-red-600 text-white hover:bg-red-600 cursor-pointer"
            >
              Yes, Clear All{" "}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={open}>
        <DialogContent className="text-center">
          <p className="text-lg font-bold">Cart Deleted!</p>
          <p className="text-gray-500">Your Cart is now empty</p>
          <span className="bg-primary px-8 py-5 rounded-xl font-semibold  text-white ">
            Cotinue Shopping
          </span>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClearCart;
