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
    image: string;

    @Column({nullable: true})
    thumbnail: string;

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
    username: string;

    @Column({nullable: true})
    category: number;

    @Column({nullable: true})
    category_name: string;
}

