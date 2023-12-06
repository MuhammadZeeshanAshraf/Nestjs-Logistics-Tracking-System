import { Container } from 'src/modules/container/entities/container.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { SaleAgent } from 'src/modules/saleAgent/entities/saleAgent.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders', { schema: 'public' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;
  @Column('integer', { name: 'container_id', nullable: false })
  containerId: number;
  @Column('integer', { name: 'customer_id', nullable: false })
  customerId: number;
  @Column('integer', { name: 'sale_agent_id', nullable: false })
  saleAgentId: number;
  @Column('integer', { name: 'quantity', nullable: false })
  quantity: number;
  @Column('integer', { name: 'rate', nullable: false })
  rate: number;
  @Column('character varying', { name: 'total', nullable: false })
  total: number;

  @ManyToOne(() => Container, (container) => container.order)
  @JoinColumn({ name: 'container_id', referencedColumnName: 'id' })
  container: Container;

  @ManyToOne(() => Customer, (customer) => customer.order)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @ManyToOne(
    () => SaleAgent,
    (saleAgent) => {
      saleAgent.order;
    },
  )
  @JoinColumn({ name: 'sale_agent_id', referencedColumnName: 'id' })
  saleAgent: SaleAgent;
  @DeleteDateColumn({
    name: 'deleted_at',
    type: Date,
    default: 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date;
  @CreateDateColumn({
    name: 'created_at',
    type: Date,
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
