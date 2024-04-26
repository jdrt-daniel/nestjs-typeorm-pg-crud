import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ProductsModule, CategoryModule, ImagesModule],
})
export class ModulesModule {}
