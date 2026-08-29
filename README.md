# Dynamic Survey Analytics Platform — Backend

Backend API for the Dynamic Survey Analytics Platform, a full-stack application for creating surveys, collecting responses, and analyzing survey data.

Built with **Node.js, Express.js, TypeScript, PostgreSQL, and Prisma ORM**.

---

## 🚀 Features

- User registration and authentication
- JWT-based authentication using HTTP-only cookies
- Survey creation and management
- Dynamic survey questions
- Multiple question types
- Conditional question logic
- Survey publishing
- Public survey responses
- Response management
- Survey analytics
- Protected API routes
- Request validation
- Centralized error handling
- PostgreSQL database
- Prisma ORM
- TypeScript
- Production-ready Express architecture

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend framework |
| TypeScript | Type safety |
| PostgreSQL | Database |
| Prisma | ORM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Zod | Request validation |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin requests |

---

## 📁 Project Structure

```text
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── app.ts
│   │
│   ├── config/
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── asyncHandler.ts
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   │
│   │   ├── surveys/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   │
│   │   └── responses/
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── services/
│   │
│   ├── types/
│   │   └── ...
│   │
│   └── utils/
│       └── ...
│
├── generated/
│   └── prisma/
│
├── .env
├── package.json
├── tsconfig.json
└── vercel.json
````

---

## ⚙️ Requirements

Before running the backend, make sure you have:

* Node.js 18+
* npm
* PostgreSQL
* Git

Check your versions:

```bash
node --version
npm --version
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/prabej7/Dynamic-Survey-Analytics-Platform.git
```

Navigate to the backend:

```bash
cd Dynamic-Survey-Analytics-Platform/backend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000

DATABASE_URL="postgresql://username:password@localhost:5432/survey_db"

JWT_SECRET="your-super-secret-jwt-key"

FRONTEND_URL="http://localhost:5173"

NODE_ENV="development"
```

### Environment Variables

| Variable       | Description                               |
| -------------- | ----------------------------------------- |
| `PORT`         | Port used by the Express server           |
| `DATABASE_URL` | PostgreSQL connection string              |
| `JWT_SECRET`   | Secret used to sign authentication tokens |
| `FRONTEND_URL` | Frontend URL allowed by CORS              |
| `NODE_ENV`     | Application environment                   |

---

## 🗄️ Database Setup

After configuring your `DATABASE_URL`, generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

If you are setting up the database for the first time and don't have migrations:

```bash
npx prisma db push
```

---

## ▶️ Running the Backend

### Development

If your project has a development script:

```bash
npm run dev
```

The API will typically run at:

```text
http://localhost:5000
```

### Production Build

Compile TypeScript:

```bash
npm run build
```

The compiled application will be generated inside:

```text
dist/
```

With the current TypeScript configuration, the main application file is:

```text
dist/src/app.js
```

Run the compiled application:

```bash
node dist/src/app.js
```

---

## 📜 Available Scripts

Typical scripts used by the project:

```bash
npm run dev
npm run build
npm start
```

Example `package.json` configuration:

```json
{
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "build": "tsc",
    "start": "node dist/src/app.js"
  }
}
```

---

## 🔑 Authentication

Authentication uses JWT tokens stored in an **HTTP-only cookie**.

After successful login or registration, the server sets:

```text
accessToken
```

The cookie is configured so that JavaScript running in the browser cannot directly access the token.

Example:

```typescript
res.cookie("accessToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production"
    ? "none"
    : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

For cross-origin production deployments, the frontend must also send credentials with API requests.

For Axios:

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
```

---

## 🌐 CORS Configuration

The backend supports requests from the configured frontend URL.

Example:

```typescript
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
```

For local development:

```env
FRONTEND_URL=http://localhost:5173
```

For production:

```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

Do not use:

```typescript
origin: "*"
```

when using credential-based authentication.

---

# 📡 API Overview

## Authentication

### Register

```http
POST /auth/register
```

Example:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Login

```http
POST /auth/login
```

Example:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

The server returns the authenticated user and sets the `accessToken` HTTP-only cookie.

---

### Logout

```http
POST /auth/logout
```

Clears the authentication cookie.

---

### Get Profile

```http
GET /auth/profile
```

Requires authentication.

---

# 📋 Surveys

Authenticated users can create and manage their surveys.

### Create Survey

```http
POST /surveys
```

Example:

```json
{
  "title": "Customer Satisfaction Survey",
  "description": "Help us improve our service.",
  "slug": "customer-satisfaction-survey",
  "schema": {
    "questions": [
      {
        "id": "question-1",
        "type": "SINGLE_SELECT",
        "label": "Are you satisfied with our service?",
        "required": true,
        "options": [
          {
            "label": "Yes",
            "value": "yes"
          },
          {
            "label": "No",
            "value": "no"
          }
        ]
      }
    ]
  }
}
```

---

### Get Surveys

```http
GET /surveys
```

Returns surveys belonging to the authenticated user.

---

### Get Survey

```http
GET /surveys/:id
```

---

### Update Survey

```http
PUT /surveys/:id
```

---

### Delete Survey

```http
DELETE /surveys/:id
```

---

# 🧩 Question Types

The platform supports:

```text
TEXT
SINGLE_SELECT
MULTI_SELECT
RATING
```

Example:

```json
{
  "id": "q1",
  "type": "RATING",
  "label": "How would you rate our service?",
  "required": true
}
```

---

# 🔀 Conditional Logic

Questions can optionally depend on the answer to another question.

Example:

```json
{
  "id": "question-b",
  "type": "TEXT",
  "label": "Please tell us why.",
  "required": false,
  "condition": {
    "questionId": "question-a",
    "operator": "equals",
    "value": "no"
  }
}
```

Supported operators:

```text
equals
not_equals
contains
greater_than
less_than
```

This allows surveys such as:

```text
Question A:
Are you satisfied?

    Yes ────────────────> Continue

    No ─────────────────> Show Question B
                           "Why are you dissatisfied?"
```

---

# 📝 Responses

Users can submit responses to published surveys.

### Submit Response

```http
POST /responses
```

Example:

```json
{
  "surveyId": "survey-id",
  "answers": {
    "question-1": "yes",
    "question-2": "Great service!"
  }
}
```

---

### Get Responses

```http
GET /responses
```

Returns responses available to the authenticated user.

---

### Get Response

```http
GET /responses/:id
```

---

### Delete Response

```http
DELETE /responses/:id
```

---

# 📊 Survey Analytics

The backend processes submitted responses to provide survey-level information such as:

* Total responses
* Answer distributions
* Question-level statistics
* Rating distributions
* Response trends

Analytics can be consumed by the frontend dashboard.

---

# 🔒 Security

The backend implements several security practices:

* HTTP-only authentication cookies
* Password hashing
* JWT authentication
* Protected routes
* Request validation
* CORS restrictions
* Centralized error handling
* Environment-based configuration
* Server-side validation of survey data
* Authorization checks for protected resources

---

# 🚀 Deployment on Vercel

The backend can be deployed as a Vercel serverless application.

The TypeScript build produces:

```text
dist/src/app.js
```

A `vercel.json` file can be configured as:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/src/app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist/src/app.js"
    }
  ]
}
```

### Important

When using this configuration, Vercel's dashboard Build Command and Output Directory settings are not used because the `builds` configuration controls the deployment.

For a simpler Vercel setup, it is recommended to let Vercel build the TypeScript application instead of committing the `dist` directory.

---

## 🔧 Production Environment Variables

Configure the following variables in Vercel:

```text
DATABASE_URL
JWT_SECRET
FRONTEND_URL
NODE_ENV
```

Example:

```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
DATABASE_URL=your-production-postgresql-url
JWT_SECRET=your-production-secret
```

Never commit `.env` to Git.

Add:

```text
.env
.env.local
.env.production
```

to `.gitignore`.

---

# 🗃️ Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

Create a migration during development:

```bash
npx prisma migrate dev --name init
```

Apply migrations in production:

```bash
npx prisma migrate deploy
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

# 🧪 API Testing

The API can be tested using:

* Postman
* Insomnia
* Thunder Client
* Swagger/OpenAPI

Example local API:

```text
http://localhost:5000
```

Example production API:

```text
https://your-backend.vercel.app
```

---

# 🏗️ Architecture

The backend follows a modular architecture:

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Middleware
   │
   ├── Authentication
   ├── Validation
   └── Error Handling
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

This separation keeps business logic independent from HTTP controllers and makes the application easier to maintain and extend.

---

# 📌 Future Improvements

Potential improvements include:

* Advanced analytics
* Export responses as CSV
* Export analytics as PDF
* Survey templates
* Question branching improvements
* Email notifications
* Response pagination
* Rate limiting
* API documentation with Swagger
* Automated testing
* Background jobs for analytics processing

---

