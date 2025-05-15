
# Airalo API - Authentication

## Authentication Method

The Airalo Partner API uses API key and secret authentication. Each request must include these credentials to be validated.

## Credentials

1. **API Key** - A unique identifier for your partner account
2. **API Secret** - A secret token used to authenticate requests

## Request Headers

When making API requests, include the following headers:

```
Authorization: Bearer YOUR_API_KEY:YOUR_API_SECRET
Content-Type: application/json
Accept: application/json
```

## Security Best Practices

1. **Store Securely** - Never expose your API key and secret in client-side code
2. **Use Environment Variables** - Store credentials as environment variables
3. **Regular Rotation** - Change your API Secret periodically
4. **Access Limitation** - Restrict API access to necessary IPs or environments

## Testing Authentication

You can verify your authentication works correctly by making a request to the status endpoint:

```
GET /v2/status
```

A successful authentication will return a 200 status code and basic account information.
