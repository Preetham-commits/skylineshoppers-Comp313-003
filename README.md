Description
This is a full-stack e-commerce platform for electronic products. The application allows users to browse, search, and purchase various electronic items. It includes features such as user authentication, product management, and secure checkout.

Getting Started:

Backend Setup
Navigate to the backend directory
npm i
npm start


Frontend Setup
Navigate to the Frontend directory
npm i
npm start

Features
User authentication (login, registration)
Product listing and categorization
Shopping cart and checkout
Order history and tracking


Technologies Used
Backend: Node.js, Express, MongoDB
Frontend: React


## Data Models

### User Model
The User model represents the application's user structure with the following key features:
- Basic user information (name, lastName, email)
- Secure password handling with bcrypt hashing
- Contact details (address, city, phoneNumber)
- Role-based access control (isAdmin flag)
- Timestamps for user creation and updates
- Custom methods for password validation
- Middleware for automatic password hashing

Key functionalities:
- Password encryption using bcrypt
- Password comparison for authentication
- Unique email constraint
- Admin role designation

### Product Model
The Product model manages the e-commerce product catalog with a comprehensive structure:
- Product details (name, brand, category, description)
- Inventory management (countInStock)
- Pricing information
- Image handling
- Nested review schema for product reviews
- Rating system with average calculations
- User references for product ownership

Features:
- Embedded review schema for product ratings and comments
- Automated timestamp tracking
- Stock management
- User relationship tracking
- Review aggregation (rating average, number of reviews)
- Category and brand organization

Both models utilize Mongoose schemas and include timestamp tracking for data management and auditing purposes.

![image](https://github.com/user-attachments/assets/a8da00f7-f768-4002-83b3-6455a612f48a)
