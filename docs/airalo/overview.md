
# Airalo API - Overview

## Introduction

The Airalo's API provides RESTful web services for integrating with Airalo's Partnership Platform. This API enables the management of eSIM products, orders, and activations.

## Environments

### Sandbox
```
https://sandbox-partners-api.airalo.com
```

### Production
```
https://partners-api.airalo.com
```

## API Integration Resources

- **FAQ Page**: https://airalopartners.zendesk.com/hc/en-us/sections/13207524820893-FAQ
- **AI-powered chatbot**:
  - Production: https://partners.airalo.com/api-integration
  - Sandbox: https://sandbox.partners.airalo.com/api-integration

## Important Notes

**Disclaimer**: Airalo reserves the right to extend the Partner API responses and requests with new attributes. Partners must ensure their integration can handle these changes, as they are considered backward-compatible.

## Integration Flow

1. **Authentication** - Use API key and secret to authenticate requests
2. **Product Listing** - Fetch available eSIM packages/products
3. **Order Creation** - Submit orders for eSIM packages
4. **Order Management** - Track and manage orders
5. **Activation** - Handle eSIM activation and QR code delivery

This documentation will help you implement a complete integration with the Airalo Partner API.
