import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    // console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      setFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", file);
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data
    );
    // console.log(response);
    if (response.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (file !== null) {
      uploadImageToCloudinary();
    }
  }, [file]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      {/* // <div className="w-full mt-4"> */}
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className={`${
          isEditMode ? "opacity-30" : ""
        } border-2 border-dashed rounded-lg p-4`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id={"image-upload"}
          type={"file"}
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!file ? (
          <Label
            htmlFor={"image-upload"}
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to Upload Image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className={"h-10 bg-gray-100"} />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{file.name}</p>
            <Button
              variant="ghost"
              size={"icon"}
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
