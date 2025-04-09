import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import MyImageZoom from "../MyZoomImage/MyZoomImage";

const MyImageCropper = ({ image, style = null, onChange = null }) => {
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        aspect: 1,
    });
    // const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const [zoom, setZoom] = useState({ scale: 1, positionX: 0, positionY: 0 }); // Zoom seviyesini saklamak için state
    const [scaleFactor, setScaleFactor] = useState(1.5);

    // Görüntü yüklendiğinde çağrılır
    const handleImageLoad = (e) => {
        setImageRef(e.currentTarget); // HTMLImageElement olarak kaydediyoruz
    };

    // Zoom değiştiğinde çağrılır
    const handleZoomChange = (newZoom) => {
        setZoom(newZoom);
        setScaleFactor(newZoom.scale * 3);
    };

    // Kırpma tamamlandığında çağrılır
    const onCropComplete = (newCrop) => {
        if (imageRef && newCrop.width && newCrop.height) {
            // Zoom oranını kullanarak yeni koordinatlar hesapla
            const adjustedCrop = {
                ...newCrop,
                x: (newCrop.x - zoom.positionX) / zoom.scale,
                y: (newCrop.y - zoom.positionY) / zoom.scale,
                width: newCrop.width / zoom.scale,
                height: newCrop.height / zoom.scale,
            };

            generateCroppedImage(imageRef, adjustedCrop);
        }
    };

    // Kırpılmış görseli base64 formatında almak için
    const generateCroppedImage = (image, crop) => {
        if (!crop || !crop.width || !crop.height || crop.width === 0) {
            console.warn("Geçersiz kırpma ölçüleri");
            return;
        }

        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        // Kesim boyutlarını scaleFactor ile çarp
        const outputWidth = crop.width * scaleFactor;
        const outputHeight = crop.height * scaleFactor;

        canvas.width = outputWidth;
        canvas.height = outputHeight;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            outputWidth,
            outputHeight // Büyütülmüş boyutlar
        );

        const base64Image = canvas.toDataURL("image/jpeg");
        // setCroppedImageUrl(base64Image);

        if (onChange) {
            onChange({ value: base64Image });
        }
    };

    return (
        <div style={style}>
            {image && (
                <ReactCrop
                    crop={crop}
                    onComplete={onCropComplete}
                    onChange={(newCrop) => setCrop(newCrop)}
                    style={style}
                >
                    <MyImageZoom onZoomChange={handleZoomChange}>
                        <img
                            src={image}
                            alt="Crop preview"
                            onLoad={handleImageLoad}
                            className="rounded-e-md"
                        />
                    </MyImageZoom>
                </ReactCrop>
            )}
        </div>
    );
};

export default MyImageCropper;
