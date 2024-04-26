import { Category } from 'src/modules/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column('int', { default: 0 })
  stock: number;

  @Column('text', { nullable: true, array: true })
  images: string[];

  @ManyToOne(() => Category, (Category) => Category.id, { cascade: true })
  category: Category;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
