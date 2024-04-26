import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class ImagesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadImages(files: Express.Multer.File[]) {
    if (!files) {
      return [];
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        return await this.cloudinaryService.uploadFile(file, {
          resource_type: 'image',
        });
      }),
    );

    return uploadedFiles.map((file) => file.secure_url);
  }
}
