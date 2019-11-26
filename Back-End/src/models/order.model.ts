export class OrderModel {
  id?: number;
  date: Date;
  shipping_type: string;
  shipped_to: string;
  shipping_status: string;
  total_price_before_tax: number;
  total_tax: number;
  total_price: number;
  total_fee: number;
}