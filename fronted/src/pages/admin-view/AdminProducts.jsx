import ProductImageUpload from "@/components/admin-view/image-upload";
import Commonform from "@/components/commonComponents/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/features/admin/products/productSlice";
import { toast } from "@/hooks/use-toast";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "./ProductTile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProdutsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imgaeFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.AdminProducts);

  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    if (currentEditedId !== null) {
      dispatch(
        editProduct({
          id: currentEditedId,
          formData,
        })
      ).then((data) => {
        // console.log(data, "editproduct");
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProdutsDialog(false);
          // setImageFile(null);
          setFormData(initialFormData);
          setCurrentEditedId(null);
          toast({
            title: "Product Edited successfully",
          });
        }
      });
    } else {
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        // console.log(data, "in adminproducts");
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProdutsDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          toast({
            title: "Product added successfully",
          });
        }
      });
    }
  }

  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
      }
    })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProdutsDialog(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((product) => {
            return (
              <ProductTile
                key={product?._id}
                product={product}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProdutsDialog={setOpenCreateProdutsDialog}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            );
          })
        ) : (
          <div>no products</div>
        )}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProdutsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side={"right"} className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            file={imgaeFile}
            setFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <Commonform
              onSubmit={onSubmit}
              formData={formData}
              formControls={addProductFormElements}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            ></Commonform>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
