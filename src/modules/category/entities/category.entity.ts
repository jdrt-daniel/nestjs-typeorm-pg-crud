import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @OneToMany(() => Product, (Product) => Product.id)
  product: Product;
}
