import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Listings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    description: string;

    @Column()
    price: number;

    //@Column()
    //seller: number;

    @Column()
    quantity: number;

    @Column()
    quantity_sold: number;

    @Column()
    status: number; //Temporary: Link to another table?

    @Column()
    created_at: Date;

    //Waiting for final DB design
}
