import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'containers', schema: 'public' })
export class Container {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'container_number',
    nullable: false,
    length: 255,
  })
  containerNumber: string;

  @Column('int4', {
    name: 'quantity',
    nullable: false,
  })
  quantity: number;

  @Column('character varying', {
    name: 'vendor',
    nullable: false,
  })
  vendor: string;

  @Column('integer', { name: 'product_skus_id', nullable: false })
  productId: number;

  @ManyToOne(() => Product, (product) => product.container)
  @JoinColumn({ name: 'product_skus_id', referencedColumnName: 'id' })
  product: Product;

  @OneToMany(() => Order, (order) => order.container)
  order: Order[];

  @CreateDateColumn({
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
