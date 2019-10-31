import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street_name: string;

    @Column({nullable: true})
    street_number: number;

    @Column({nullable: true})
    unit_number: number;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    province: string;

    @Column({nullable: true})
    postal_code: string;

    @Column({nullable: true})
    country: string;
}
