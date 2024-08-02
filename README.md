# Galactic Trading Network

### Proposal: Creating investment portfolios in different companies and investing in them!

### Easy Setup Video Guide: https://www.youtube.com/watch?v=UmG87EpC-pI

## 1) What was used?

- Monorepo (TurboRepo) - https://turbo.build/
- NestJS - https://nestjs.com/
- PostgreSQL - https://www.postgresql.org/
- Prisma ORM - https://www.prisma.io/
- React JS - https://pt-br.reactjs.org/
- Vite - https://vitejs.dev/
- Firebase - https://firebase.google.com/?hl=pt-br
- Swagger - https://swagger.io/
- Tailwind - https://tailwindcss.com/
- Docker - https://www.docker.com/
- NodeJS - You need Node > 18 for this project.

### Things to Remember:

You need Docker and Firebase to run the project.
Every time the project is taken down, all the PostgreSQL tables are dropped, and you should take down Firebase Auth Emulator and restart it if you restart the project. This is only required for development environments.

## 2) Demo

### 2.1) Sign In Page (Firebase Auth)

![Sign In Page](https://i.imgur.com/J4YrfUZ.png)

### 2.2) Sign Up Page (Firebase Auth)

![Sign Up Page](https://i.imgur.com/UmAwB9I.png)

### 2.3) Portfolios Page

![Portfolios Page](https://i.imgur.com/2XtHVjD.png)
![Portfolios Page](https://i.imgur.com/hThueBJ.png)
![Portfolios Page](https://i.imgur.com/Y5GhcFl.png)

### 2.4) Portfolio Details Page

![Portfolio Details Page](https://i.imgur.com/op0Cplu.png)
![Portfolio Details Page](https://i.imgur.com/LYKrpAU.png)

### 2.5) Companies Page

![Companies Page](https://i.imgur.com/lLN4Uno.png)

### 2.6) Swagger API

![Swagger API](https://i.imgur.com/ML3nTUB.png)

## 3) Installation

### 3.1) Enter the root of the project and run "yarn" to start installing the default project dependencies.

```sh
npm run install-all
```

### 3.2) Create an .env file  in the root of the web project for API access with the following:

```sh
VITE_API_URL="http://localhost:3000"
VITE_FIREBASE_API_KEY="AIzaSyBd8WNfi7cZWLAZX3BxyT-5qbnUUR6GgJY"
VITE_FIREBASE_AUTH_DOMAIN="bossa-challenge.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="bossa-challenge"
VITE_FIREBASE_STORAGE_BUCKET="bossa-challenge.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="695175764590"
VITE_FIREBASE_APP_ID="1:695175764590:web:7df0d48bcc9564beaea47f"
```

### 3.3) Create an .env file in the root of the api project for database access with the following:

```sh
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bossa_challenge?schema=public"
NODE_ENV="development"
FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClVhOF2tm9z6l3\nP7HWwXcF8PHNvMlAskk1deDsVuPxk0KK6ScmFznDvevGY997Ldx3n8rBo9c5FuEK\n4mNtSr38QgKxZCt8AvFrhAhwa0sgUlam/5GSEsgubg4KyY3htDLWezEnKJYa03Lo\nvJqPY+l3RGspEt5aNaytmS1ciUs71rPpBhc6h8CUiHJ0gj9BbB3g4Meo0fMoqkdb\ncFno8/884ZnZZgiZPTNiji9RmqO4nIqqqzsMB+l/kVTob8p+fhKiVYQ+H/N09v+d\nhi+PBMu5OSRogatazK4fQZRR5koXPwMYVFhdVJ0Dr4TtGOfeIL+CQBoEFUC1OOsI\nxdevDckzAgMBAAECggEACxFijYTeK6XcTIElOLZLGfOMXv9CzQPCVoOqyBd0UJEm\nP2H76Wxc77y7LP+K5SuSRShwwcVj3HdVdE2TEKy+tXApJFKLff89GxCZIgbEs4gK\nM0lg0ib+DexMdgNnwz1gDoSWVe6ScdRILnVQYXCeSd94zvnrjEgTOax14WpyxgbD\nXA6cDLLP3ZipGtWKzxLTWF+xJmW4qwms5/1uhekC+7yI52MhMnvCjwryWt9q9UEF\njiZn4Cgo4Y6M9LWpsKVXeru22k6QS1FNJK/e4dPdCvKf9pB23GBZCvPkSDmmLNLv\nUeIvjreBfTV3WK+JlWXGGQ/4Q31sztIIoYq1lwsV6QKBgQDTYmGw7xQjk9coaouu\nsiaHjLiLvsDzHscq4oWXFuGLD7KsH8u6CbLEs/1N2wWczKny1AEUGlIgr8Fgnhv5\nIYiDjtBBw/kV3F+XmrC6ECwBPcr1QI2aGvzpeT4KQL+QwtmrDyXv72eGzQrGpl1x\nC9hsPYJK0ScAsDcEWTMvIFnbCQKBgQDIO5pxwK3dQ2qh9M1NLP/LETwmb4FpVtLd\nCzSL3zf9dtyEhVi5WRdSIU4cztpR+MbKpzKT377OrFkXKPFxM1BAA76V497/zBnY\nQvY9MZWMPcWP0xgnGga2F3G5MGwXQi8CgJ4nzO3hyAe5eQxYAXBzx7fjFvCbDcd5\nYN2GrdfFWwKBgGUhOk+l8eKbhmJFpxIrFRfgkSH6XuFxpiO0P+lq/vjCx95lT9hv\nb2GAIv2ufV7o453TI7j0ZrpQm5mXyxZDnsYh+yybj32P8wPa9BXwSr1FTOZMvfIu\nWzVv1eid1YhyUCTwmFvUE5mAW1lyml3NJvuR6dXVfm1r4MZpzn0LYzHRAoGAFPvK\nD6m1jr6F6jsRWMkidVF1EEIXOcbTij6mXxIhd/qA2ZJv3dysSPsciIBU+Motawdi\nkYSdJmOBYp/zzX0nJ848ptCeiggFnVhHHdqYZX4DujLRESf1FBgY3uNoMHfLHWQF\nLv6W31ZrGNDKrl5YPonrh2zcAiPLh7jS/k4xkokCgYAgnxsYtuQTO8FSa6jgp4VC\niTgKP1/tMvVp5NOWWIMDW/m5PVED12fR6fIUZuI36dVn8JmbRdT9yrff4Tgi9wUe\nAgwInU1BVSAewLlAsyO6aA2afvQ1yXR806jpnBEXOl/oVZIfT5rzLWA/7lBC4d2x\n3y6uusJ4vQB5Fw8El95NnA==\n-----END PRIVATE KEY-----\n"
FIREBASE_PROJECT_ID="bossa-challenge"
FIREBASE_PRIVATE_KEY_ID="a99bccb165e1ea3c715e86e20243ff0ec17ed2b6"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-3mvus@bossa-challenge.iam.gserviceaccount.com"
FIREBASE_CLIENT_ID="107771954365478027112"
FIREBASE_CLIENT_CERT_URL="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3mvus%40bossa-challenge.iam.gserviceaccount.com"
```

### 3.4) Create the PostgreSQL database using Docker
```sh
docker compose up
```
### 3.5) Install Firebase Tools for Auth Emulator
```sh
npm install -g firebase-tools
```

### 3.6) Open a Terminal on the project's root and run:
```sh
firebase emulators:start
```

### 3.7) Open another terminal and run:
```sh
npm run dev
```

### 3.7) To access the API documentation, run the project and access:
http://localhost:3000/api-docs

### 3.8) Front-end runs by default on:
http://localhost:5173/
