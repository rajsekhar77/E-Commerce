import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";

function UserCartItemsContent() {
  return (
    <div className="flex items-center space-x-4">
      <img
        src="img.jpg"
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">Title</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant={"outline"}
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">cartquantity</span>
          <Button
            variant={"outline"}
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $200
        </p>
        <Trash
          className="cursor-pointer mt-2"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
