
// Simple types with minimal properties and no complex relationships
export interface BasicOrderInfo {
  id: string;
  status: string;
  total_amount: number;
  created_at: string | null;
  payment_method: string | null;
  payment_status: string;
}

export interface BasicCustomerInfo {
  name: string | null;
  email: string | null;
}

export interface BasicOrderItem {
  quantity: number;
  unit_price: number;
  product_title: string;
}
