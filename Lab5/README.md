# Lab 5 - KAMI Spa (AsyncStorage & Fetch API / Axios)

Expo + React Native app for the KAMI Spa services module.

## Features
- Login (phone/password) against the KAMI backend, token persisted with AsyncStorage
- Services list (Home)
- Add / Edit / Delete a service
- Service detail screen with a popup menu (Edit / Delete)

## API
Base URL: `https://kami-backend-5rs0.onrender.com`

- `POST /auth` — login (phone, password) -> token
- `GET /services`, `GET /services/{id}`
- `POST /services` (name, price)
- `PUT /services/{id}`, `DELETE /services/{id}`

Test account: `0373007856` / `123`

## Run
```
npm i
npx expo start
```

## Structure
```
src/
  api/           axios client + endpoint wrappers
  context/       AuthContext (token/session)
  navigation/    RootNavigator (stack)
  screens/       Login, Home, ServiceForm, ServiceDetail
  components/    ServiceCard
  theme.js, utils/format.js
```
