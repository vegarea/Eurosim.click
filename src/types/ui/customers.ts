import { Customer } from "../database/customers";
import { Order } from "../database/orders";

export interface ExtendedCustomer extends Customer {
  orders: Order[];
  totalSpent: number;
}