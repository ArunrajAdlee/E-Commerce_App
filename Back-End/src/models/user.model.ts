export class UserModel {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  brand_name?: string;
  date_of_birth?: Date;
  phone_number?: string;
  age?: number;
  address_id: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}
