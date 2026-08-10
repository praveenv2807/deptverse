# Deptverse Backend

## Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## API Endpoints
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires JWT)
- `GET /api/health` - Health check

## Default Users
| Username | Password   | Role    |
|----------|------------|---------|
| admin    | admin123   | admin   |
| faculty  | faculty123 | faculty |
| student  | student123 | student |
