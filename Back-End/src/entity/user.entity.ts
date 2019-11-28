import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  brand_name: string;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  address_id: number;

  @OneToOne(type => Address)
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id'}])
  address: Address;
}
