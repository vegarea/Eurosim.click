import { Order } from "../database/orders";
import { OrderItem } from "../database/orderItems";
import { Customer } from "../database/customers";

export interface UIOrder extends Order {
  customer?: Customer;
  items?: OrderItem[];
}

export interface OrderMetadata {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  title?: string;
  description?: string;
  [key: string]: any;
}