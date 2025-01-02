export class Logger {
  private requestId: string;

  constructor(requestId: string) {
    this.requestId = requestId;
  }

  info(message: string, data?: any) {
    console.log(`🔵 [${this.requestId}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }

  error(message: string, error?: any) {
    console.error(`🔴 [${this.requestId}] ${message}`, error ? JSON.stringify(error, null, 2) : '');
  }

  warn(message: string, data?: any) {
    console.warn(`🟡 [${this.requestId}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }

  success(message: string, data?: any) {
    console.log(`✅ [${this.requestId}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }
}