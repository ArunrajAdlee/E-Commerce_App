import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Listings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    stock_count: number;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    price: number;

    @Column({nullable: true})
    quantity_sold: number;

    @Column({nullable: true})
    status: boolean;

    @Column({nullable: true})
    user_id: number;

    @Column({nullable: true})
    category: number;

}