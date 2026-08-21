# Lab 6 - KAMI Spa (AsyncStorage & Fetch API / Axios - Part II)

Builds on Lab 5. Adds Customer and Transaction modules plus bottom tab navigation
(Home / Transaction / Customer / Setting).

## New features
- Customer list + add customer
- Transaction list + transaction detail (read-only)
- Setting screen with logout

## API additions
- `GET /customers`, `POST /customers` (name, phone)
- `GET /transactions`, `GET /transactions/{_id}`

Test account: `0373007856` / `123`

## Run
```
npm i
npx expo start
```
