import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buyer_id: number;

    @Column()
    date: Date;

    @Column()
    shipping_type: string;

    @Column()
    shipped_to: number;

    @Column()
    shipping_status: string;

    @Column()
    total_price_before_tax: number;

    @Column()
    total_tax: number;

    @Column()
    total_price: number;

    @Column()
    total_fee: number;
}