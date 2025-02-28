import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ProfilePictureProps {
  onImageChange: (imageUrl: string) => void;
}

export default function ProfilePicture({ onImageChange }: ProfilePictureProps) {
  const [image, setImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [isCropping, setIsCropping] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsCropping(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop): string => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    if (ctx) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }

    return canvas.toDataURL('image/jpeg');
  };

  const handleConfirmCrop = () => {
    if (image && imgRef.current) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop as PixelCrop);
      onImageChange(croppedImageUrl);
      setIsCropping(false);
      setImage(null);
    }
  };

  const handleCancelCrop = () => {
    setImage(null);
    setIsCropping(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      
      {isCropping && image && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Crop Profile Picture</h3>
            <div className="max-h-[60vh] overflow-auto">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCrop(c)}
                circularCrop
                aspect={1}
              >
                <img 
                  ref={imgRef}
                  src={image} 
                  alt="Profile" 
                  style={{ maxWidth: '100%', maxHeight: '60vh' }}
                />
              </ReactCrop>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleConfirmCrop}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelCrop}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}