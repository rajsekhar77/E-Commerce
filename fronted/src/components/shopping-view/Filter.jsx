import { filterOptions } from "@/config";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => {
          return (
            <Fragment key={keyItem}>
              <div className="">
                <h3 className="text-base font-bold">{keyItem}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => {
                    return (
                      // <Label className="flex items-center gap-2 font-medium" "key={option.id}">
                      <Label className="flex items-center gap-2 font-medium" key={option.id}>
                        <Checkbox
                          checked={
                            filters &&
                            Object.keys(keyItem).length > 0 &&
                            filters[keyItem] &&
                            filters[keyItem].indexOf(option.id) > -1
                          }
                          onCheckedChange={() =>
                            handleFilter(keyItem, option.id)
                          }
                        />
                        {option.label}
                      </Label>
                    );
                  })}
                </div>
              </div>
              <Separator />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default ProductFilter;
