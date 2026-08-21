# Lab 7 - KAMI Spa (AsyncStorage & Fetch API / Axios - Part III)

Builds on Lab 6. Adds customer detail (with edit/delete) and full transaction
creation/cancellation flow.

## New features
- Customer detail screen (general info + transaction history) with a popup menu (Edit / Delete)
- Edit customer
- Add transaction: pick a customer, check services (`react-native-bouncy-checkbox`),
  adjust quantity, pick customer via dropdown (`react-native-element-dropdown`)
- Cancel transaction (from the transaction detail popup menu)

## API additions
- `POST /Customers/{_id}` — customer detail
- `PUT /Customers/{_id}` — edit customer
- `DELETE /Customers/{_id}` — delete customer
- `POST /transactions` — add transaction (CustomerId, Services[{_id, quantity}])
- `DELETE /transactions/{_id}` — cancel transaction

Test account: `0373007856` / `123`

## Run
```
npm i
npx expo start
```
