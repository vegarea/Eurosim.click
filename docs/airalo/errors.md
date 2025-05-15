
# Airalo API - Error Handling

This document outlines the error codes and recommended handling strategies for the Airalo Partner API.

## HTTP Status Codes

| HTTP Code | Description |
|-----------|-------------|
| 200 | Successful request |
| 400 | Bad request - Invalid parameters |
| 401 | Unauthorized - Invalid credentials |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource doesn't exist |
| 422 | Unprocessable Entity - Validation errors |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |

## Validation and Processing Errors (HTTP 422)

These errors occur when the request is well-formed but cannot be processed due to validation issues or other business rules.

| Code | Reason |
|------|--------|
| 11 | Insufficient Airalo Credit: {additional} |
| 13 | The requested operator is currently undergoing maintenance. Please try again later. |
| 14 | Invalid checksum: {additional} |
| 23 | The requested top-up has been disabled by the operator. {additional} |
| 33 | Insufficient stock of eSIMs remaining: {additional}. Please try again later. |
| 34 | The requested eSIM package is invalid or it is currently out of stock. Please try again later. |
| 43 | Bad request. {additional} Please check your input and try again. |
| 53 | Something unexpected happened. We're working to resolve the issue. Please try again later. |

**Note**: For errors with code 53 - if the issue persists after a few retries, please contact support.

## Rate Limiting (HTTP 429)

| Code | Reason |
|------|--------|
| 429 | Too Many Attempts (rate limit) |

## Recommended Error Handling

1. **Retry Strategy**: Implement exponential backoff for 5xx errors and rate limits
2. **Logging**: Log full error responses for troubleshooting
3. **User Feedback**: Provide meaningful error messages to end users
4. **Monitoring**: Track error rates to detect API issues
5. **Fallbacks**: Implement graceful degradation where possible

## Example Error Response

```json
{
  "meta": "failed",
  "message": "Insufficient Airalo Credit: You need at least $20.00 to place this order.",
  "code": 11
}
```

## Contact Support

For persistent errors or issues that cannot be resolved through standard error handling, contact Airalo Partner support with:

1. The error code and message
2. Request details (endpoint, parameters)
3. Timestamp of the error
4. Any relevant order or eSIM identifiers
