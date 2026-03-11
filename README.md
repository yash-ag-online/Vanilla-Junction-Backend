## Goal

To develop backend api's for Vanilla Junction Project using node.js, express.js
and mongodb, also securely integrating it with the frontend, along with adding
dummy Razorpay integration.

## Requirements

1. Design the backend system based on UML diagrams to determine which API
   endpoints need to be added and how they will function.
2. Write the API endpoints.
3. Test the API endpoints.
4. Integrate the APIs with the frontend.

## API Endpoints

### Customer

`GET` - `/api/v1/customer`

`PATCH` - `/api/v1/customer`

`GET` - `/api/v1/customers`

`POST` - `/api/v1/customers/login`

`POST` - `/api/v1/customers/logout`

`GET` - `/api/v1/customers/:id`

`PATCH` - `/api/v1/customers/:id`

### Admin

`GET` - `/api/v1/admin`

`PATCH` - `/api/v1/admin`

`GET` - `/api/v1/admins`

`POST` - `/api/v1/admins/create`

`POST` - `/api/v1/admins/login`

`POST` - `/api/v1/admins/logout`

`GET` - `/api/v1/admins/:id`

`PATCH` - `/api/v1/admins/:id`

`DELETE` - `/api/v1/admins/:id`

### Ice-cream

`GET` - `/api/v1/ice-creams`

`POST` - `/api/v1/ice-creams/list`

`GET` - `/api/v1/ice-creams/:id`

`PATCH` - `/api/v1/ice-creams/:id`

`DELETE` - `/api/v1/ice-creams/:id`

### Order

`GET` - `/api/v1/orders`

`POST` - `/api/v1/orders/create`

`GET` - `/api/v1/orders/:id`

`PATCH` - `/api/v1/orders/:id`

`POST` - `/api/v1/orders/:id/generate-otp`

### Payment

`GET` - `/api/v1/payments`

`POST` - `/api/v1/payments/register`

`GET` - `/api/v1/payments/:id`

`PATCH` - `/api/v1/payments/:id`

## Links

Full Case Study Link -
[https://yash-ag-online.notion.site/Vanilla-Junction-Case-Study-31aa6c003875808da3f1cdc7c5da8f29](https://yash-ag-online.notion.site/Vanilla-Junction-Case-Study-31aa6c003875808da3f1cdc7c5da8f29)

Frontend Preview Link -
[https://vanilla-junction.netlify.app/](https://vanilla-junction.netlify.app/)
