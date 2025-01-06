export type OrderStatus = 'payment_pending' | 'payment_failed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type OrderType = 'physical' | 'esim';
export type PaymentMethod = 'stripe' | 'paypal';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type ProductStatus = 'active' | 'inactive';
export type ProductType = 'physical' | 'esim';
export type CustomerGender = 'M' | 'F';
export type EventType = 'created' | 'status_changed' | 'payment_processed' | 'shipping_updated' | 'note_added' | 'document_validated';