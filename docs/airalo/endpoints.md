

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

