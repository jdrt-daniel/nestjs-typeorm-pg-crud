import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/modules/category/entities/category.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  categorySeedData = [
    { name: 'Polera' },
    { name: 'Sombrero' },
    { name: 'Pantalon' },
    { name: 'Sudadera' },
    { name: 'Camisa' },
  ];

  productsSeedData = [
    {
      name: 'Polera XBg',
      description: 'Polera de algodon',
      price: 10.5,
      stock: 4,
    },
    {
      name: 'Sombrero Elegante',
      description: 'Sombrero de fieltro negro',
      price: 29.99,
      stock: 10,
    },
    {
      name: 'Pantalon de Mezclilla',
      description: 'Pantalon de mezclilla azul oscuro',
      price: 49.99,
      stock: 5,
    },
    {
      name: 'Sudadera Deportiva',
      description: 'Sudadera con capucha para actividades deportivas',
      price: 39.99,
      stock: 8,
    },
    {
      name: 'Camisa a Rayas',
      description: 'Camisa de manga larga a rayas',
      price: 24.99,
      stock: 12,
    },
    {
      name: 'Vestido de Noche',
      description: 'Vestido elegante para ocasiones especiales',
      price: 79.99,
      stock: 3,
    },
    {
      name: 'Zapatos de Cuero',
      description: 'Zapatos de cuero negro para hombres',
      price: 89.99,
      stock: 7,
    },
    {
      name: 'Blusa Floral',
      description: 'Blusa de manga corta con estampado floral',
      price: 19.99,
      stock: 15,
    },
    {
      name: 'Chaqueta de Cuero',
      description: 'Chaqueta de cuero genuino para hombres',
      price: 149.99,
      stock: 2,
    },
    {
      name: 'Falda Plisada',
      description: 'Falda plisada de color rosa',
      price: 34.99,
      stock: 6,
    },
    {
      name: 'Gorra Deportiva',
      description: 'Gorra deportiva con logo bordado',
      price: 14.99,
      stock: 20,
    },
    {
      name: 'Chaleco de Lana',
      description: 'Chaleco de lana para mantenerse abrigado',
      price: 54.99,
      stock: 4,
    },
    {
      name: 'Blazer Formal',
      description: 'Blazer formal de color negro',
      price: 79.99,
      stock: 9,
    },
    {
      name: 'Shorts Deportivos',
      description: 'Shorts deportivos para actividades al aire libre',
      price: 29.99,
      stock: 11,
    },
    {
      name: 'Vestido de Verano',
      description: 'Vestido ligero y fresco para el verano',
      price: 39.99,
      stock: 7,
    },
    {
      name: 'Calcetines de Algodón',
      description: 'Calcetines de algodón suaves y cómodos',
      price: 9.99,
      stock: 25,
    },
    {
      name: 'Traje de Baño',
      description: 'Traje de baño de una pieza para mujeres',
      price: 49.99,
      stock: 3,
    },
    {
      name: 'Jersey de Lana',
      description: 'Jersey de lana de cuello alto',
      price: 59.99,
      stock: 6,
    },
    {
      name: 'Zapatos Deportivos',
      description: 'Zapatos deportivos para correr',
      price: 69.99,
      stock: 8,
    },
    {
      name: 'Blusa de Encaje',
      description: 'Blusa de encaje elegante para ocasiones especiales',
      price: 44.99,
      stock: 5,
    },
    {
      name: 'Jeans Ajustados',
      description: 'Jeans ajustados de color azul claro',
      price: 39.99,
      stock: 10,
    },
  ];

  imageSeedData = [
    'https://res.cloudinary.com/dttizsdoe/image/upload/v1714111293/uvdsao0wvp2hzbtdv0ag.jpg',
    'https://res.cloudinary.com/dttizsdoe/image/upload/v1714111293/amaaw9c1drcbkbe7npxe.jpg',
    'https://res.cloudinary.com/dttizsdoe/image/upload/v1714111293/jh6jysbvtaxbdgkqj7wr.jpg',
    'https://res.cloudinary.com/dttizsdoe/image/upload/v1714111293/yswl0dcbtbda196tgluq.jpg',
    'https://res.cloudinary.com/dttizsdoe/image/upload/v1714111293/uvdsao0wvp2hzbtdv0ag.jpg',
    'https://res.cloudinary.com/dttizsdoe/image/upload/v1714111293/cld-sample-5.jpg',
  ];

  async executeSeedData() {
    //delete all data
    this.productRepository.delete({});
    this.categoryRepository.delete({});

    //create categories
    const categoriesArr: Category[] = [];

    this.categorySeedData.forEach((cat) => {
      categoriesArr.push(this.categoryRepository.create(cat));
    });
    const categoriesResult = await this.categoryRepository.save(categoriesArr);

    //create products
    const productsArr: Product[] = [];

    this.productsSeedData.forEach((prod) => {
      productsArr.push(
        this.productRepository.create({
          ...prod,
          category:
            categoriesResult[
              Math.floor(Math.random() * categoriesResult.length)
            ],
          images: [
            this.imageSeedData[
              Math.floor(Math.random() * this.imageSeedData.length)
            ],
            this.imageSeedData[
              Math.floor(Math.random() * this.imageSeedData.length)
            ],
          ],
        }),
      );
    });

    await this.productRepository.save(productsArr);
  }
}
