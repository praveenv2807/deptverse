from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, id, username, email, password, role='student'):
        self.id = id
        self.username = username
        self.email = email
        self.password_hash = generate_password_hash(password)
        self.role = role

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role
        }

# Pre-seeded users in memory
USERS_DB = [
    User(
        id=1,
        username='2024CEUCS155',
        email='praveenpraveen2807cse24_27@ksrce.ac.in',
        password='12345',
        role='student'
    ),
    User(
        id=2,
        username='FAC001',
        email='faculty@ksrce.ac.in',
        password='12345',
        role='faculty'
    ),
    User(
        id=3,
        username='admin1',
        email='admin@ksrce.ac.in',
        password='12345',
        role='admin'
    )
]

def get_user_by_identifier(identifier):
    if not identifier:
        return None
    ident = str(identifier).strip().lower()
    for user in USERS_DB:
        if user.username.lower() == ident or user.email.lower() == ident:
            return user
    return None

def get_user_by_id(user_id):
    for user in USERS_DB:
        if user.id == user_id:
            return user
    return None