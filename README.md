# 🛒 E-Commerce Platform

A modern, full-stack e-commerce application built with **Angular** (frontend) and **Spring Boot** (backend). This platform provides a seamless shopping experience with product browsing, filtering, and an admin dashboard.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Documentation](#api-documentation)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Contributing](#contributing)

---

## 📌 Overview

This e-commerce platform is a complete solution for online product sales. It features:
- **Frontend**: Interactive Angular single-page application with real-time product updates
- **Backend**: RESTful API built with Spring Boot for product management
- **Database**: Product catalog with detailed information (pricing, stock, ratings)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 21.2
- **Language**: TypeScript 5.9
- **Styling**: CSS/SCSS
- **Testing**: Vitest 4.0
- **Build Tool**: Angular CLI 21.2
- **HTTP Client**: Angular HttpClient with RxJS

### Backend
- **Framework**: Spring Boot
- **Language**: Java
- **Build Tool**: Maven
- **API**: RESTful Web Services
- **Database**: In-memory data structure

### Development Tools
- **Version Control**: Git & GitHub
- **Code Formatter**: Prettier
- **Editor**: VS Code

---

## ✨ Features

### Frontend Features
✅ **Product Catalog**
- Browse through 16+ pre-configured products across multiple categories
- Product cards with images, ratings, prices, and stock availability
- Category filtering (Electronics, Fashion, Home)

✅ **Admin Dashboard**
- Manage product inventory
- Update product details
- Real-time data synchronization with backend

✅ **Shopping Features**
- Add/remove items from shopping cart
- Order history tracking
- User profile management
- Responsive UI optimized for all devices

✅ **Performance**
- Lazy loading of components
- Efficient state management with Angular Signals
- Fast page load times

### Backend Features
✅ **Product Management API**
- RESTful endpoints for product operations
- GET products endpoint with filtering capabilities
- Product data includes: ID, name, price, image, description, category, rating, stock

✅ **Data Structure**
- Comprehensive product model with all necessary attributes
- Pre-seeded with 16 diverse products
- Scalable architecture for database integration

✅ **API Security**
- CORS configuration for frontend-backend communication
- Request validation
- Error handling

---

## 📁 Project Structure

```
E-commerce/
├── frontend/ (Angular Application)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # Reusable UI components
│   │   │   ├── services/          # API integration services
│   │   │   ├── models/            # TypeScript interfaces & types
│   │   │   └── app.config.ts      # Application configuration
│   │   ├── assets/                # Images and static files
│   │   └── main.ts                # Application entry point
│   ├── package.json               # Frontend dependencies
│   ├── angular.json               # Angular configuration
│   └── tsconfig.json              # TypeScript configuration
│
├── backend/ (Spring Boot Application)
│   ├── src/main/
│   │   ├── java/com/example/ecommerce/
│   │   │   ├── EcommerceBackendApplication.java
│   │   │   ├── Product.java       # Product data model
│   │   │   ├── ProductController.java  # REST endpoints
│   │   │   └── (Other services & configs)
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml                    # Maven configuration
│   └── README.md                  # Backend documentation
│
└── .github/                       # GitHub workflows & actions
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** 18+ with npm
- **Java** 11+
- **Maven** 3.6+
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/alexsteven311-design/E-commerce.git
cd E-commerce
```

### Step 2: Setup Frontend
```bash
# Install dependencies
npm install

# If needed, clear npm cache
npm cache clean --force
```

### Step 3: Setup Backend
```bash
cd backend

# Install Maven dependencies
mvn clean install

cd ..
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### Get All Products
```http
GET /api/products
```

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 79.99,
    "image": "https://images.unsplash.com/...",
    "description": "Premium sound quality with noise cancellation.",
    "category": "Electronics",
    "rating": 4.5,
    "stock": 10
  },
  ...
]
```

### Product Categories
- **Electronics**: Tech gadgets and accessories
- **Fashion**: Clothing and footwear
- **Home**: Household appliances and decor

---

## ▶️ Running the Application

### Start the Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Backend will run on: `http://localhost:8080`

### Start the Frontend (Angular)
```bash
ng serve
# or
npm start
```
Frontend will run on: `http://localhost:4200`

### Verify Setup
1. Open browser to `http://localhost:4200`
2. Check that products load from the backend
3. Test admin dashboard functionality
4. Verify cart and order operations

---

## 🔧 Development

### Building the Frontend
```bash
ng build
# Production build with optimizations
ng build --configuration production
```

### Running Tests
```bash
# Frontend unit tests
ng test

# Frontend with coverage
ng test --code-coverage
```

### Code Generation (Angular CLI)
```bash
# Generate a new component
ng generate component component-name

# Generate a service
ng generate service service-name

# Generate other artifacts
ng generate --help
```

### Code Formatting
```bash
# Format all files with Prettier
npm run format
# or
npx prettier --write .
```

---

## 📦 Dependencies

### Frontend Key Dependencies
- `@angular/common` - Common Angular directives and components
- `@angular/forms` - Reactive forms support
- `@angular/router` - Client-side routing
- `rxjs` - Reactive programming with observables

### Backend Key Dependencies
- `spring-boot-starter-web` - Web MVC framework
- `spring-boot-starter-data-jpa` - Data persistence
- `spring-boot-devtools` - Development productivity tools

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Alex Steven**
- GitHub: [@alexsteven311-design](https://github.com/alexsteven311-design)

---

## 🆘 Support

For issues, questions, or suggestions, please:
- Open an [Issue](https://github.com/alexsteven311-design/E-commerce/issues)
- Create a [Discussion](https://github.com/alexsteven311-design/E-commerce/discussions)

---

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Order management system
- [ ] Product search and advanced filtering
- [ ] User reviews and ratings
- [ ] Inventory management for admins
- [ ] Email notifications
- [ ] Mobile app (React Native)

---

**Happy coding! 🚀**

## 1.🎨UI/UX Highlights

![image alt](https://github.com/alexsteven311-design/E-commerce/blob/f6dffcd45f148e2f1dd0bebf6849acd9ffe37f98/Screenshot_11-5-2026_10848_localhost.jpeg)
![image alt](https://github.com/alexsteven311-design/E-commerce/blob/74cc2559e0a98fd7023de7dee2910ad76c8f66e1/screenshot-1778474380514.png)
- Modern dark-themed navigation bar
- Clean dashboard layout
- Responsive product grid
- Interactive cards and analytics
- User-friendly shopping interface
- Minimal and professional design

## 2.📊Spending Insights
   ## 💰Monthly Spending
  ![image alt](https://github.com/alexsteven311-design/E-commerce/blob/233c2b9530fe18419ef60b4d6fc2933356be9d89/Monthly%20summary_11-5-2026_83641_localhost.jpeg)
## How it works
- Displays total monthly spending
- Average order value calculation
- Total order count
- Monthly purchase trends visualization
- Spending history table for better tracking

  ## 🏷️Category-Wise spending Analysis
  ![image alt](https://github.com/alexsteven311-design/E-commerce/blob/4f9b4ce1a6129bf3df5d94e6ce8a65fb70c505e3/Category%20spending_11-5-2026_83740_localhost.jpeg)
  ## How it works
- Visual breakdown of spending by categories
- Percentage-based spending distribution
- Interactive progress indicators
- Purchase count per category
- Helps identify major spending areas

  ## 🎯Budget Tracking
  ![image alt](https://github.com/alexsteven311-design/E-commerce/blob/b86fe598106bb45f5b20e1017626d9fab10a0d1c/budget%20tracking_11-5-2026_8391_localhost.jpeg)
  ## How it Works
 - Monthly budget management
 - Remaining budget calculation
 - Budget usage percentage tracking
 - Visual spending progress bar
 - Budget alert and monitoring system

## 3.🔔 Smart Alerts & Notifications
- Low stock alerts
- Shopping notifications
- Real-time alert counter
- Inventory reminders
## 4.🛠️Admin features
- Admin control panel
- Product management
- Store monitoring tools
- Inventory handling support
## Admin dashboard
![image alt](https://github.com/alexsteven311-design/E-commerce/blob/d771f6c60de666b8c861b14aef380dda13a0dd2b/Admin%20dashboard-1778467813658.png)
