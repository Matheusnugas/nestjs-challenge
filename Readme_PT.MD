
# Rede de Comércio Galáctico

### Proposta: Criando portfólios de investimento em diferentes empresas e investindo nelas!

### Guia de Configuração Fácil em Vídeo: [YouTube](https://www.youtube.com/watch?v=UmG87EpC-pI)

## 1) O que foi utilizado?

- Monorepo (TurboRepo) - [TurboRepo](https://turbo.build/)
- NestJS - [NestJS](https://nestjs.com/)
- PostgreSQL - [PostgreSQL](https://www.postgresql.org/)
- Prisma ORM - [Prisma](https://www.prisma.io/)
- React JS - [React JS](https://pt-br.reactjs.org/)
- Vite - [Vite](https://vitejs.dev/)
- Firebase - [Firebase](https://firebase.google.com/?hl=pt-br)
- Swagger - [Swagger](https://swagger.io/)
- Tailwind - [Tailwind](https://tailwindcss.com/)
- Docker - [Docker](https://www.docker.com/)
- NodeJS - Você precisa do Node >= 18 para este projeto.

### Coisas a Lembrar:

Você precisa do Docker e do Firebase para rodar o projeto.  
Toda vez que o projeto for derrubado e reiniciado, todas as tabelas do PostgreSQL serão apagadas, e você deve derrubar o Firebase Auth Emulator e reiniciá-lo se reiniciar o projeto. Isso é necessário apenas para ambientes de desenvolvimento.

## 2) Demo

### 2.1) Página de Login (Firebase Auth)

![Página de Login](https://i.imgur.com/J4YrfUZ.png)

### 2.2) Página de Cadastro (Firebase Auth)

![Página de Cadastro](https://i.imgur.com/UmAwB9I.png)

### 2.3) Página de Portfólios

![Página de Portfólios](https://i.imgur.com/2XtHVjD.png)
![Página de Portfólios](https://i.imgur.com/hThueBJ.png)
![Página de Portfólios](https://i.imgur.com/Y5GhcFl.png)

### 2.4) Página de Detalhes do Portfólio

![Página de Detalhes do Portfólio](https://i.imgur.com/op0Cplu.png)
![Página de Detalhes do Portfólio](https://i.imgur.com/LYKrpAU.png)

### 2.5) Página de Empresas

![Página de Empresas](https://i.imgur.com/lLN4Uno.png)

### 2.6) API do Swagger

![API do Swagger](https://i.imgur.com/ML3nTUB.png)

#### OBSERVAÇÃO:
Para testar usando a API do Swagger, primeiro você precisará fazer login com o front-end para obter o AuthId do usuário e o Token de Autorização.  
Isso acontece porque o SDK do Firebase Auth não permite que esses dados sejam retornados ao back-end no login. Basta verificar o console para obter as informações necessárias logo após o login.

![Console](https://i.imgur.com/i4fcZUq.png)

### 2.7) Emulador de Autenticação do Firebase

![Emulador de Autenticação do Firebase](https://i.imgur.com/mUDQYuJ.png)

## 3) Instalação

### 3.1) Entre na raiz do projeto e execute "npm run install-all" para começar a instalar as dependências padrão do projeto.

```sh
npm run install-all
```

### 3.2) Crie um arquivo .env na RAIZ do projeto WEB para acessar seu back-end com o seguinte conteúdo:

```sh
VITE_API_URL="http://localhost:3000"
VITE_FIREBASE_API_KEY="AIzaSyBd8WNfi7cZWLAZX3BxyT-5qbnUUR6GgJY"
VITE_FIREBASE_AUTH_DOMAIN="bossa-challenge.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="bossa-challenge"
VITE_FIREBASE_STORAGE_BUCKET="bossa-challenge.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="695175764590"
VITE_FIREBASE_APP_ID="1:695175764590:web:7df0d48bcc9564beaea47f"
```

### 3.3) Crie um arquivo .env na raiz do projeto api para acesso ao banco de dados com o seguinte conteúdo:

```sh
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bossa_challenge?schema=public"
NODE_ENV="development"
FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClVhOF2tm9z6l3
P7HWwXcF8PHNvMlAskk1deDsVuPxk0KK6ScmFznDvevGY997Ldx3n8rBo9c5FuEK
4mNtSr38QgKxZCt8AvFrhAhwa0sgUlam/5GSEsgubg4KyY3htDLWezEnKJYa03Lo
vJqPY+l3RGspEt5aNaytmS1ciUs71rPpBhc6h8CUiHJ0gj9BbB3g4Meo0fMoqkdb
cFno8/884ZnZZgiZPTNiji9RmqO4nIqqqzsMB+l/kVTob8p+fhKiVYQ+H/N09v+d
hi+PBMu5OSRogatazK4fQZRR5koXPwMYVFhdVJ0Dr4TtGOfeIL+CQBoEFUC1OOsI
xdevDckzAgMBAAECggEACxFijYTeK6XcTIElOLZLGfOMXv9CzQPCVoOqyBd0UJ...

### 3.4) Crie o banco de dados PostgreSQL usando o Docker:
```sh
docker compose up
```
### 3.5) Instale as ferramentas do Firebase para o Emulador de Auth:
```sh
npm install -g firebase-tools
```

### 3.6) Abra um terminal na raiz do projeto e execute:
```sh
firebase emulators:start
```

### 3.7) Abra outro terminal e execute:
```sh
npm run dev
```

### 3.8) Para acessar a documentação da API, execute o projeto e acesse:
http://localhost:3000/api-docs

### 3.9) O front-end roda por padrão em:
http://localhost:5173/

### 3.10) O back-end roda por padrão em:
http://localhost:3000/
