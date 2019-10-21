import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    first_name: string;

    @Column({nullable: true})
    last_name: string;

    @Column({nullable: true})
    brand_name: string;

    @Column({nullable: true})
    date_of_birth: Date;

    @Column({nullable: true})
    phone_number: number;

    @Column({nullable: true})
    age: number
}