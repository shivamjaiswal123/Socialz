'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { XIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  endpoint: 'postImage';
  onImageUploadSuccess: (url: string) => void;
  value: string;
}

const ImageUpload = ({
  endpoint,
  onImageUploadSuccess,
  value,
}: ImageUploadProps) => {
  if (value) {
    return (
      <div className="relative size-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md size-40 object-cover"
        />
        <button
          onClick={() => onImageUploadSuccess('')}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onImageUploadSuccess(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
        toast.error('Something went wrong');
      }}
    />
  );
};

export default ImageUpload;
