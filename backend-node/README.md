# Deptverse Backend (Node.js/Express)

## Setup

```bash
cd backend-node
npm install
npm run dev
```

## API Endpoints

- `POST /api/auth/login` - Login (returns JWT token)
- `GET /api/auth/me` - Get current user (requires JWT)
- `GET /api/health` - Health check

## Default Users

| Username | Password   | Role    |
|----------|------------|---------|
| admin    | admin123   | admin   |
| faculty  | faculty123 | faculty |
| student  | student123 | student |

## Login Example

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## Protected Route Example

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your-token>"
```
