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

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  brand_name: string;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  address_id: number;

  @Column({nullable: true})
  resetPasswordToken: string;

  @Column({nullable: true})
  resetPasswordExpires: Date;
  
  @OneToOne(type => Address)
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id'}])
  address: Address;
}
