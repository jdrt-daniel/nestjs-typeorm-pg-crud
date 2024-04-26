import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { handleError } from 'src/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    // Inject the ProductRepository
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: string[],
  ): Promise<Product> {
    try {
      // Create a new product
      const newProduct = this.productRepository.create({
        ...createProductDto,
        images,
        category: { id: createProductDto.categoryId },
      });
      // Save the product to the database
      return this.productRepository.save(newProduct);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      // Find all products
      return this.productRepository.find({
        skip: 0,
        take: 10,
        relations: ['category'],
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: string): Promise<Product> {
    // Find the product by id
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      // Find the product by id
      const product = await this.findOne(id);
      // Update the product with the new data
      this.productRepository.merge(product, {
        ...updateProductDto,
        category: { id: updateProductDto.categoryId },
      });
      // Save the updated product to the database
      return this.productRepository.save(product);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Find the product by id
      const product = await this.findOne(id);
      // Remove the product from the database
      await this.productRepository.remove(product);
    } catch (error) {
      handleError(error);
    }
  }
}
