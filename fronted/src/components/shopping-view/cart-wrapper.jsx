import { Fragment } from "react";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import UserCartItemsContent from "./cart-content";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ setOpenCartSheet }) {
  const navigate = useNavigate();

  return (
    <SheetContent className="sm:max-w-md">
      <SheetDescription />
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        <UserCartItemsContent />
        <UserCartItemsContent />
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">$200</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        CheckOut
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
