from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import get_user_by_identifier, get_user_by_id

auth_bp = Blueprint('auth', __name__)

ALLOWED_DOMAIN = "@ksrce.ac.in"

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json() or {}
        
        identifier = str(
            data.get('identifier') or 
            data.get('username') or 
            data.get('email') or 
            data.get('registerNumber') or 
            ''
        ).strip()
        
        password = str(data.get('password') or '').strip()

        if not identifier or not password:
            return jsonify({'error': 'Credentials and password are required'}), 400

        user = get_user_by_identifier(identifier)
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid credentials'}), 401

        # Enforce domain check for students
        if getattr(user, 'role', 'student') == 'student':
            user_email = str(getattr(user, 'email', '')).lower()
            if not user_email.endswith(ALLOWED_DOMAIN) and not identifier.lower().endswith(ALLOWED_DOMAIN):
                return jsonify({'error': f'Access restricted. Students must use {ALLOWED_DOMAIN} email.'}), 403

        # 🔒 Fix: Pass string identity to avoid Flask-JWT crash
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        # Print actual error in your terminal so you can see it
        print("INTERNAL LOGIN ERROR:", str(e))
        return jsonify({'error': f'Server Error: {str(e)}'}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = get_user_by_id(int(user_id)) if user_id else None
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.to_dict()), 200