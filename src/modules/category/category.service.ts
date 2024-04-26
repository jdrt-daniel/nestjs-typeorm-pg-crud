import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities/category.entity';
import { handleError } from 'src/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      // create a new category
      const category = this.categoryRepository.create(createCategoryDto);
      // save the category
      return await this.categoryRepository.save(category);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(): Promise<Category[]> {
    // find all categories
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    // find the category by id
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      // find the category by id
      const category = await this.findOne(id);
      // update the category with the new data
      this.categoryRepository.merge(category, updateCategoryDto);
      // save the updated category
      return await this.categoryRepository.save(category);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<void> {
    // find the category by id
    const category = await this.findOne(id);
    // remove the category
    await this.categoryRepository.remove(category);
  }
}
