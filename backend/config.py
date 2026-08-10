import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret-key-12345'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'super-jwt-secret-key-12345'