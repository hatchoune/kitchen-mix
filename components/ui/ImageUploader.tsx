"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Upload, X, Loader2, Crop as CropIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/app/actions/upload";
import imageCompression from "browser-image-compression";

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  existingImageUrl?: string | null;
  className?: string;
  aspect?: number;
}

export default function ImageUploader({
  onImageUploaded,
  existingImageUrl,
  className,
  aspect = 16 / 9,
}: ImageUploaderProps) {
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setOriginalSrc(reader.result as string);
        setCrop(undefined);
        setCompletedCrop(undefined);
        setError(null);
      });
      reader.readAsDataURL(file);
    }
  };

  // Quand l'image se charge dans le ReactCrop, auto-initialiser le crop
  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      // Calculer le plus grand rectangle avec le bon ratio qui rentre dans l'image
      const imageAspect = width / height;
      let cropWidth: number;
      let cropHeight: number;

      if (imageAspect > aspect) {
        // Image plus large que le ratio → limiter par la hauteur
        cropHeight = height;
        cropWidth = height * aspect;
      } else {
        // Image plus haute que le ratio → limiter par la largeur
        cropWidth = width;
        cropHeight = width / aspect;
      }

      const newCrop: PixelCrop = {
        unit: "px",
        x: (width - cropWidth) / 2,
        y: (height - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
      };

      setCrop(newCrop);
      setCompletedCrop(newCrop);
    },
    [aspect],
  );

  const getCroppedImg = useCallback(async (): Promise<Blob | null> => {
    if (!imgRef.current) return null;

    const canvas = document.createElement("canvas");
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Si pas de crop défini, utiliser l'image entière
    const cropArea = completedCrop || {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
      unit: "px" as const,
    };

    canvas.width = cropArea.width * scaleX;
    canvas.height = cropArea.height * scaleY;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(
      image,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/webp", 0.9);
    });
  }, [completedCrop]);

  const handleUpload = async () => {
    if (!imgRef.current) {
      setError("Aucune image sélectionnée");
      return;
    }

    setIsUploading(true);
    setProgress(10);
    setError(null);

    try {
      const croppedBlob = await getCroppedImg();
      if (!croppedBlob)
        throw new Error("Impossible de générer l'image recadrée");
      setProgress(30);

      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(
        new File([croppedBlob], "image.webp", { type: "image/webp" }),
        options,
      );
      setProgress(60);

      const formData = new FormData();
      formData.append("file", compressedFile);
      const { url } = await uploadImage(formData);
      setProgress(100);
      onImageUploaded(url);
      // Reset
      setOriginalSrc(null);
      setCompletedCrop(undefined);
      setCrop(undefined);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const cancelCrop = () => {
    setOriginalSrc(null);
    setCompletedCrop(undefined);
    setCrop(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={cn("space-y-4", className)}>
      {existingImageUrl && !originalSrc && (
        <div className="relative w-full max-w-md rounded-xl overflow-hidden border border-border">
          <Image
            src={existingImageUrl}
            alt="Image actuelle"
            width={600}
            height={400}
            className="w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onImageUploaded("")}
            className="absolute top-2 right-2 p-1 bg-black/60 rounded-full hover:bg-error transition"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {!originalSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-accent/50 transition-colors"
        >
          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Cliquez pour sélectionner une image
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Ajustez le cadre si nécessaire, puis cliquez sur &quot;Recadrer &
            uploader&quot;.
          </p>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              src={originalSrc}
              alt="Recadrage"
              className="max-h-80 rounded-lg"
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={cancelCrop}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-card-hover"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-black text-sm font-medium hover:bg-accent-hover disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CropIcon className="w-4 h-4" />
              )}
              {isUploading ? `Upload ${progress}%` : "Recadrer & uploader"}
            </button>
          </div>
          {error && <p className="text-xs text-error">{error}</p>}
        </div>
      )}
    </div>
  );
}
