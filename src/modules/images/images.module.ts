import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryModule } from 'nestjs-cloudinary';

import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  imports: [
    CloudinaryModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        cloud_name: configService.get('CLOUDINARY_API_NAME'),
        api_key: configService.get('CLOUDINARY_API_KEY'),
        api_secret: configService.get('CLOUDINARY_API_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
