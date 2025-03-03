
// Tipos muy simples sin referencias circulares
export interface BasicOrderInfo {
  id: string;
  status: string;
  total_amount: number;
  created_at: string | null;
  payment_method: string | null;
  payment_status: string;
  type: string;
}

export interface BasicCustomerInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface BasicOrderItem {
  quantity: number;
  unit_price: number;
  total_price: number;
  product_title?: string;
}
