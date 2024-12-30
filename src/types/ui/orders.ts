import { Order } from "../database/orders";
import { OrderEvent } from "../database/common";

export interface UIOrder extends Order {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  events?: OrderEvent[];
  metadata: {
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    events?: OrderEvent[];
    title?: string;
    description?: string;
    [key: string]: any;
  } | null;
}

export interface OrderMetadata {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  events?: OrderEvent[];
  title?: string;
  description?: string;
  [key: string]: any;
}