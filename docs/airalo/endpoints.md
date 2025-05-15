


# Airalo API - Endpoints

This document outlines the key endpoints available in the Airalo Partner API. All endpoints use a base URL of:
- Sandbox: `https://sandbox-partners-api.airalo.com`
- Production: `https://partners-api.airalo.com`

## Common Endpoints

### Status
```
GET /v2/status
```
Check API connectivity and account status.

### Get Countries
```
GET /v2/countries
```
Retrieve list of supported countries.

### Get Operators
```
GET /v2/operators
```
Retrieve list of operators in supported countries.

## eSIM Package Management

### Get Packages
```
GET /v2/packages
```
Retrieve list of available eSIM packages.

**Rate Limit:** 40 requests per minute.

**Parameters:**
- `filter[type]` (optional) - Filter packages by operator type. Values: "local" or "global".
  - "global": Returns only global and regional eSIMs. 
  - "local": Returns only country-specific packages.
  - When not specified, returns all types of eSIMs.
- `filter[country]` (optional) - Filter packages by country code (e.g., US, DE, GB).
- `limit` (optional) - Number of items to return per page.
- `page` (optional) - Page number for pagination.
- `include` (optional) - Set to "topup" to include topup packages in the response.

**Response includes:**
- Package information (name, data amount, validity, price, etc.)
- Country coverage
- Operator details
- Package type information (data, voice, text)

### Get Package Details
```
GET /v2/packages/{package_id}
```
Retrieve detailed information about a specific package.

### Get Top-up Packages
```
GET /v2/esims/{iccid}/topup-packages
```
Retrieve available top-up packages for an existing eSIM.

## Order Management

### Submit Order
```
POST /v2/orders
```
Create a new eSIM order.

**Parameters:**
- `quantity` (required) - Number of items in the order (max 50)
- `package_id` (required) - ID of the eSIM package to order
- `type` (optional) - Type of order (only "sim" is valid, default is "sim")
- `description` (optional) - Custom description to identify the order
- `brand_settings_name` (optional) - Brand name for the eSIM, null for unbranded

**Response includes:**
- Order details (ID, code, price, etc.)
- Installation instructions (QR code, manual installation)
- Direct Apple installation URL (for iOS 17.4+)

### Get Order
```
GET /v2/orders/{order_id}
```
Retrieve information about a specific order.

### Get Order List
```
GET /v2/orders
```
Retrieve list of orders with filtering options.

### Submit Top-up Order
```
POST /v2/esims/{iccid}/topup
```
Create a new top-up order for an existing eSIM.

## eSIM Management

### Get eSIM
```
GET /v2/esims/{iccid}
```
Retrieve information about a specific eSIM.

### Get Installation Instructions
```
GET /v2/esims/{iccid}/installation-instructions
```
Retrieve installation instructions for a specific eSIM.

### Get eSIM QR Code
```
GET /v2/esims/{iccid}/qr-code
```
Retrieve QR code for a specific eSIM.

### Get eSIM Status
```
GET /v2/esims/{iccid}/status
```
Check the status of a specific eSIM.

## Notification Management

### Get Notification Settings
```
GET /v2/notifications/settings
```
Retrieve notification settings for your account.

### Update Notification Settings
```
PUT /v2/notifications/settings
```
Update notification settings for your account.

## Webhook Management

### Simulate Webhook
```
POST /v2/simulator/webhook
```
Simulate a webhook notification to test your webhook endpoint.

**Parameters:**
- `event` (required) - Event type to simulate (e.g., "low_data_notification")
- `type` (required) - Notification type (e.g., "expire_1", "data_80")
- `iccid` (optional) - ICCID of the eSIM to use in the notification

**Available Event Types:**
- `low_data_notification` - Simulates notifications for low data threshold reached
- `expiration_notification` - Simulates notifications for upcoming eSIM expiration
- `order_activated` - Simulates notification when an order is activated

**Available Type Values:**
- For expiration: `expire_1`, `expire_3`, `expire_7` (days before expiration)
- For low data: `data_20`, `data_50`, `data_80` (percentage of data used)

**Response:**
```
{
  "success": "Notification sent"
}
```

