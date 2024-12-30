type CheckoutStep = 
  | "init_checkout"
  | "validating_cart"
  | "creating_customer"
  | "creating_order"
  | "creating_order_items"
  | "checkout_completed"
  | "checkout_failed";

interface CheckoutLog {
  step: CheckoutStep;
  status: "info" | "success" | "error";
  message: string;
  data?: any;
  error?: any;
  timestamp: string;
}

class CheckoutLogger {
  private logs: CheckoutLog[] = [];

  log(step: CheckoutStep, status: CheckoutLog["status"], message: string, data?: any, error?: any) {
    const logEntry: CheckoutLog = {
      step,
      status,
      message,
      data,
      error,
      timestamp: new Date().toISOString()
    };

    this.logs.push(logEntry);
    console.group(`[Checkout: ${step}]`);
    console.log(`Status: ${status.toUpperCase()}`);
    console.log('Message:', message);
    if (data) console.log('Data:', data);
    if (error) console.error('Error:', error);
    console.log('Timestamp:', logEntry.timestamp);
    console.groupEnd();
  }

  getLogs() {
    return this.logs;
  }

  clear() {
    this.logs = [];
  }
}

export const checkoutLogger = new CheckoutLogger();