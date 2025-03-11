# 📝 Simple NestJs Blog

## 📖 Overview

Simple NestJs Blog is a **practice project** designed to get hands-on experience with **NestJS** and **MongoDB**. This project implements a basic CRUD API with authentication using JWT and database transactions using Mongoose.

## 🚀 Tech Stack

- **NestJS** - Backend framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB (with transactions)
- **TypeScript** - Typed JavaScript
- **Docker** - Containerization
- **JWT** - Authentication
- **Swagger** - API Documentation

## 📂 Project Structure

```sh
src/
 ├── auth/        # Authentication module
 ├── users/       # User management module
 ├── database/    # Database configuration
 ├── common/      # Shared utilities & DTOs
 ├── main.ts      # Entry point
```

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/yourusername/simple-nestjs-blog.git
cd simple-nestjs-blog
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Setup Environment Variables**

Create a `.env` file with:

```env
DB_TYPE=mongo
```

## ▶️ Running the Project

### **Development Mode**

```sh
npm run start:dev
```

### **Production Mode**

```sh
npm run build
npm run start:prod
```

### **Using Docker**

```sh
docker-compose up --build
```

## 📜 API Documentation

Swagger is enabled for testing APIs. Visit:

```
http://localhost:3000/api
```

## 🔥 API Endpoints

### **User Routes**

| Method  | Endpoint       | Description                    |
| ------- | -------------- | ------------------------------ |
| `POST`  | `/auth/signup` | Register a new user            |
| `POST`  | `/auth/login`  | Authenticate user & return JWT |

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the **MIT License**.

