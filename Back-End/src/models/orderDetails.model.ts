export class OrderDetailsModel {
	id?: number;
	buyer_id: number;
	order_id: number;
	listing_id: number;
	seller_id: number;
	purchase_date?: Date;
	quantity: number;
	price_before_tax: number;
	tax: number;
	price_after_tax: number;
	listing_fee: number;
}