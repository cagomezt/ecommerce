# E-commerce Web Application

This project is a full-stack e-commerce web application built with React, Redux, and Python. It allows users to browse products, add items to a shopping cart, and manage their orders.

## Features

- Product listing and details
- Shopping cart with quantity management
- User authentication and profile
- Order placement and history
- Responsive design using React Bootstrap

## Technologies

- Frontend: React, Redux, React Bootstrap, JavaScript
- Backend: Python
- Package management: npm

## Getting Started

1. Clone the repository: git clone https://github.com/cagomezt/ecommerce.git

### Frontend Setup: React & Redux

1. Install frontend dependencies: cd frontend npm install
2. Start the frontend development server: npm start

### Backend Setup: Django REST API

1. Install Python dependencies: pip install -r requirements.txt
2. Apply migrations: python manage.py migrate
3. Create a superuser (optional, for admin access): python manage.py createsuperuser
4. Start the development server: python manage.py runserver

The API will be available at `http://localhost:8000/`.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.