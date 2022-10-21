import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

export interface IPhoto {
  id: string;
  secure_url: string;
}

const savePhotosToCloudinary = async (
  photos: UploadedFile | UploadedFile[],
  cloudinaryOptions: UploadApiOptions
): Promise<IPhoto[]> => {
  const imagesArray: IPhoto[] = [];

  if (Array.isArray(photos)) {
    for (let i = 0; i < photos.length; i++) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(photos[i].tempFilePath, cloudinaryOptions);

      imagesArray.push({
        id: public_id,
        secure_url: secure_url,
      });
    }
  } else {
    const { public_id, secure_url } = await cloudinary.uploader.upload(photos.tempFilePath, cloudinaryOptions);

    imagesArray.push({
      id: public_id,
      secure_url: secure_url,
    });
  }

  return imagesArray;
};

export default savePhotosToCloudinary;