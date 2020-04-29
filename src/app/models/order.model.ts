export interface Order {
  total_price: string;
  line_items: any[];
  subtotal_price: string;
  contact_email: string;
  shipping_address: any;
  total_tax: string;
  shipping_lines: any[];
  fulfillment_status?: string;
}

export interface Orders {
    orders: Order[];
}
