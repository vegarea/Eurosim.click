import { corsHeaders } from './config.ts';
import { Logger } from './logger.ts';

export function handleSuccess(logger: Logger, requestId: string, data: any) {
  logger.success('Request completed successfully', data);
  return new Response(
    JSON.stringify({ 
      received: true,
      requestId,
      ...data
    }), 
    { 
      headers: corsHeaders,
      status: 200
    }
  );
}

export function handleError(logger: Logger, requestId: string, error: any, status = 400) {
  logger.error('Error processing request', {
    error: error.message,
    stack: error.stack,
    details: error.details || 'No additional details'
  });
  
  return new Response(
    JSON.stringify({ 
      error: error.message,
      requestId,
      details: error.stack,
      data: error.details || 'No additional details'
    }), 
    { 
      status,
      headers: corsHeaders
    }
  );
}