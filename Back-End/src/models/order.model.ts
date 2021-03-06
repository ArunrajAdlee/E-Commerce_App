export class OrderModel {
  id?: number;
	buyer_id: number;
  date: Date;
  shipping_type: string;
  shipped_to: number;
  shipping_status: string;
  total_price_before_tax: number;
  total_tax: number;
  total_price: number;
  total_fee: number;
}