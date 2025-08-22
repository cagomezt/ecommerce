## Backend: Django REST API

The backend is built with Django and Django REST Framework, providing APIs for products, users, orders, and authentication.

### Features

- Product management (CRUD)
- User registration, login, and profile
- Cart and order management
- Secure JWT authentication

### Getting Started

1. Install Python dependencies: pip install -r requirements.txt
2. Apply migrations: python manage.py migrate
3. Create a superuser (optional, for admin access): python manage.py createsuperuser
4. Start the development server: python manage.py runserver

The API will be available at `http://localhost:8000/`.

### API Documentation

See the `backend/README.md` or browse the API endpoints using Django REST Framework's browsable API.