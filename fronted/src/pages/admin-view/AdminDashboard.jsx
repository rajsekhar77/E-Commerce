import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
} from "@/features/common/common-slice";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imgaeFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [triggerUpload, setTriggerUpload] = useState(false);

  const { toast } = useToast();
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    if (imgaeFile) {
      setTriggerUpload((prev) => !prev);
    } else {
      toast({
        title: "please upload image to proceed",
        variant: "destructive",
      });
    }
  }

  function handleImageUploadSuccess() {
    if (imgaeFile && uploadedImageUrl) {
      dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
          setImageFile(null);
          setUploadedImageUrl("");
        }
      });
    }
  }

  useEffect(() => {
    if(uploadedImageUrl) {
      handleImageUploadSuccess();
    }
  }, [uploadedImageUrl]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        file={imgaeFile}
        setFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
        triggerUpload={triggerUpload}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-4">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((item, index) => {
              return (
                <div className="relative" key={index}>
                  <img
                    src={item?.image}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
