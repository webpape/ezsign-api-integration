# HubSpot Connector Installation Instructions

## 1. Create a HubSpot Developer App
1. Log in to the [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Create a new "Public App".
3. Name it **eZsign API Integration**.

## 2. Configure Scopes
Add the following scopes to your app:
- `crm.objects.contacts.read`
- `crm.objects.deals.read`
- `crm.objects.deals.write`

## 3. Setup Webhook URL
1. In HubSpot, go to **Webhooks** in the app sidebar.
2. Set the Target URL to your eZsign integration endpoint (e.g., `https://your-server.com/hubspot/webhook`).
3. Subscribe to the event `deal.propertyChange` for the `dealstage` property.

## 4. Auth Configuration
1. Copy your **Client ID** and **Client Secret**.
2. Use the OAuth2 URLs:
   - Auth: `https://app.hubspot.com/oauth/authorize`
   - Token: `https://api.hubapi.com/oauth/v1/token`
