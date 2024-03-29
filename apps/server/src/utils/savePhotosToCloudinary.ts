import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

export interface IPhoto {
  id: string;
  secure_url: string;
}

// Save single image
export const savePhotoToCloudinary = async (photo: UploadedFile, options: UploadApiOptions): Promise<IPhoto> => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(photo.tempFilePath, options);

  return {
    id: public_id,
    secure_url: secure_url,
  };
};

// Save multiple images
export const savePhotosToCloudinary = async (
  photos: UploadedFile | UploadedFile[],
  options: UploadApiOptions
): Promise<IPhoto[]> => {
  // Images
  const imagesArray: IPhoto[] = [];

  // Save Multiple Images
  if (Array.isArray(photos)) {
    // Promise.all for better performance
    await Promise.all(
      photos.map(async (photo) => {
        const { public_id, secure_url } = await cloudinary.uploader.upload(photo.tempFilePath, options);

        imagesArray.push({
          id: public_id,
          secure_url: secure_url,
        });
      })
    );

    return imagesArray;
  }

  // Save single photo
  const { public_id, secure_url } = await cloudinary.uploader.upload(photos.tempFilePath, options);

  imagesArray.push({
    id: public_id,
    secure_url: secure_url,
  });

  return imagesArray;
};

export default savePhotosToCloudinary;
