
# Budgetly Backend API

This is the official backend API for **Budgetly**, a personal finance tracking application. The backend is built with **Node.js**, **Express**, **MongoDB**, and deployed as a serverless function using **Netlify**.

## Live API Deployment

The backend is deployed at:

**https://budgetlybackend.netlify.app**

## API Routes

| Route                                                  | Description                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| `https://budgetlybackend.netlify.app/api/user`         | Handles all user-related endpoints (e.g., registration, profile) |
| `https://budgetlybackend.netlify.app/api/auth`         | Handles authentication endpoints (e.g., login, logout)           |
| `https://budgetlybackend.netlify.app/api/transactions` | Handles transactions-related logic                               |
| `https://budgetlybackend.netlify.app/api/goals`        | Handles goal management                                          |
| `https://budgetlybackend.netlify.app/api/categories`   | Handles category CRUD                                            |

## Testing Locally

During local development, the frontend connects to:

```
http://localhost:3000/api/...
```

Make sure your local server is running and listening on port `3000`.

## Backend Folder Structure

| Folder/File                     | Purpose                                                                 |
|--------------------------------|-------------------------------------------------------------------------|
| `controllers/`                 | Business logic for each route group (auth, users, categories, etc.)    |
| ├── `AuthController.ts`        | Handles signup, login, OTP, and token flows                            |
| ├── `UserControllers.ts`       | Profile-related actions and updates                                    |
| ├── `TransactionController.ts` | CRUD operations for income/expenses                                    |
| ├── `CategoryController.ts`    | Manages budget categories and metadata                                 |
| └── `GoalController.ts`        | Logic for goal creation and progress tracking                          |
| `routers/`                     | Maps Express routes to corresponding controllers                       |
| ├── `AuthRouter.ts`            | `/api/auth` endpoints (signup, login, verify, resend)                  |
| ├── `UserRouter.ts`            | `/api/user` endpoints                                                  |
| ├── `TransactionRouter.ts`     | `/api/transactions` endpoints                                          |
| ├── `CategoryRouter.ts`        | `/api/categories` endpoints                                            |
| └── `GoalRouter.ts`            | `/api/goals` endpoints                                                 |
| `models/`                      | Mongoose schemas for database collections                              |
| ├── `User.ts`                  | User schema and account details                                        |
| ├── `Transaction.ts`           | Financial transaction structure                                        |
| ├── `Goal.ts`                  | Goal progress data schema                                              |
| └── `Category.ts`              | Categories used for budgeting and filtering                            |
| `middlewares/`                 | Custom Express middleware                                              |
| ├── `GlobalMiddleWare.ts`      | Generic handlers like error catching, token validation                 |
| └── `FindUser.ts`              | Finds user from JWT and attaches it to `req.user`                      |
| `utils/`                       | Helper utilities (e.g., token or OTP helpers)                          |
| `environments/`                | TypeScript environment configs                                         |
| ├── `environment.ts`           | Default environment configuration                                     |
| └── `environment.prod.ts`      | Production-ready overrides                                             |

## How Frontend Components Map to Backend

| Frontend File                          | Calls Backend Route                      | Description                                   |
|---------------------------------------|------------------------------------------|-----------------------------------------------|
| `Login.jsx`                            | `POST /api/auth/login`                   | User login and token return                   |
| `Signup.jsx`                           | `POST /api/auth/signup`                  | Creates user and triggers OTP email           |
| `OtpVerify.jsx`                        | `POST /api/auth/verify-otp`              | Verifies one-time password for signup         |
| `OtpVerify.jsx` (resend)               | `POST /api/auth/resend-otp`              | Triggers resend of OTP                        |
| `Homepage.jsx`                         | `GET /api/transactions`, `/api/goals`    | Loads dashboard data after login              |
| `Transactions.jsx`                     | `GET`, `POST`, `PUT`, `DELETE /api/transactions` | Manages income and expense entries   |
| `Goals.jsx`                            | `GET`, `POST`, `PUT /api/goals`          | Sets and tracks financial goals               |
| `Navbar.jsx` (logout)                  | Clears token client-side; backend optional logout

## Sample Postman Tests

### 1. Signup

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "pass123"
}
```

### 2. Verify OTP

```http
POST /api/auth/verify-otp
{
  "email": "john@example.com",
  "otp": "123456"
}
```

### 3. Login

```http
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "pass123"
}
```

### 4. Authenticated Route Example (Transactions)

```http
GET /api/transactions
Headers:
Authorization: Bearer <your_token_here>
```

## Author

Built and maintained by **Arnold Mabope**
