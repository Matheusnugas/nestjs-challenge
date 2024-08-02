# Galactic Trading Network

### Proposal: Creating investment portfolios in different companies and investing in them!

## 1) What was used?

- Monorepo (TurboRepo) - https://turbo.build/
- NestJS - https://nestjs.com/
- PostgreSQL - https://www.postgresql.org/
- React JS - https://pt-br.reactjs.org/
- Vite - https://vitejs.dev/
- Firebase - https://firebase.google.com/?hl=pt-br
- Swagger - https://swagger.io/
- Tailwind - https://tailwindcss.com/

## 2) Demo

### 2.1) Sign In Page (Firebase Auth)

[[![N|Solid](https://i.imgur.com/sI615as.jpg)](https://nodesource.com/products/nsolid)](https://imgur.com/J4YrfUZ)

### 2.2) Sign Up Page (Firebase Auth)

[[![N|Solid](https://i.imgur.com/tRIRJcH.jpg)](https://nodesource.com/products/nsolid)](https://imgur.com/UmAwB9I)

### 2.3) Portfolis Page

[[![N|Solid](https://i.imgur.com/8D9wCmQ.jpg)](https://nodesource.com/products/nsolid)](https://imgur.com/2XtHVjD)
[[![N|Solid](https://i.imgur.com/ldzoRRc.jpg)](https://nodesource.com/products/nsolid)](https://imgur.com/hThueBJ)
https://imgur.com/Y5GhcFl


### 2.4) Portfolis Details Page

[[[![N|Solid](https://i.imgur.com/8D9wCmQ.jpg)](https://nodesource.com/products/nsolid)](https://imgur.com/2XtHVjD)](https://imgur.com/op0Cplu)
[[[![N|Solid](https://i.imgur.com/ldzoRRc.jpg)](https://nodesource.com/products/nsolid)](https://imgur.com/hThueBJ)](https://imgur.com/LYKrpAU)

### 2.5) Companies Page

https://imgur.com/lLN4Uno

### 2.6) Swagger API

[[![N|Solid](https://i.imgur.com/XlObMPA.jpg)](https://nodesource.com/products/nsolid)](https://imgur.com/ML3nTUB)

## 3) Installation

### 3.1) Enter the root of the project and run "yarn" to start installing the default project dependencies.

```sh
yarn
```

### 3.2) Enter the "web" project to start installing the project's dependencies.

```sh
cd packages/web
yarn
```

### 3.3) Enter the "api" project to start installing the project's dependencies.

```sh
cd packages/api
yarn
```

### 3.4) It is now possible to run all folders from the default directory.

```sh
yarn api -> Executes the API.
yarn apidev -> Runs the API in development environment.
yarn web -> Run the WEB
```

### 3.5) Create an .env file  in the root of the web project for API access with the following:

```sh
VITE_API_URL = http://localhost:3000
VITE_FIREBASE_API_KEY = AIzaSyDceH9amyB2Var1mFx0GqMO1o1bt7E_fbY
VITE_FIREBASE_AUTH_DOMAIN = drummond-e8706.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = drummond-e8706
VITE_FIREBASE_STORAGE_BUCKET = drummond-e8706.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = 279886335338
VITE_FIREBASE_MESSAGING_APPID = 1:279886335338:web:d220d616dc14bdc2ac6913
VITE_FIREBASE_MESSAGING_MEASUREMENT_ID = G-N8LKHKK1NE
```

### 3.6) Create an .env file in the root of the api project for database access with the following:

```sh
DATABASE_CONNECTION_STRING = mongodb+srv://qmguiziii:1234@cluster0.41qxb82.mongodb.net/test
```
