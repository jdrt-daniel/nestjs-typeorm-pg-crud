import {
  Controller,
  Post,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { CloudinaryService } from 'nestjs-cloudinary';
import { FilesInterceptor } from '@nestjs/platform-express';

import { FileFilter } from './helpers/fileFilter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files[]', 4, {
      fileFilter: FileFilter,
    }),
  )
  async uploadCloudinaryFile(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    if (!files) {
      throw new BadRequestException('Make sure that file is a image');
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        return await this.cloudinaryService.uploadFile(file, {
          resource_type: 'image',
        });
      }),
    );

    return uploadedFiles;
  }
}
