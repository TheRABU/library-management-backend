# 📚 Library Management API

A full-featured **RESTful API** built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** for managing books and borrowing activities in a digital library system.

---

## 🚀 Features

✅ Built with Express + TypeScript  
✅ MongoDB with Mongoose ODM  
✅ Book CRUD operations  
✅ Borrow system with business logic enforcement  
✅ Aggregation pipeline for summaries  
✅ Schema validation and error handling  
✅ Reusable error responses  
✅ Timestamped records (createdAt, updatedAt)

---

## 🧠 Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Nodemon / ts-node-dev
- Postman (for testing)

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

### 2️⃣ Install Dependencies
```
npm install
```

### 3️⃣ Environment Variables
  - Create a .env file in the root directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Start the Server
```
npm run dev
```

### 🧪 API Endpoints

📘 1. Create Book

POST /api/books
Request:
```
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

Response:
```
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

📗 2. Get All Books
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

Response:
```
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ ... ]
}
```
📕 3. Get Book By ID
GET /api/books/:bookId

Response:
```
{
  "success": true,
  "message": "Book's data found successfully",
  "data": { ... }
}
```
4. Update Book
PUT /api/books/:bookId

Request:
```
{
  "copies": 50
}
```
Response:
```
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```
❌ 5. Delete Book
DELETE /api/books/:bookId

Response:
```
{
  "success": true,
  "message": "Book Deleted Successfully!",
  "data": null
}
```

📚 6. Borrow a Book
POST /api/borrow

Request:
```
  {
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
```
Response:
```
  {
    "success": true,
    "message": "Book borrowed successfully",
    "data": { ... }
  }
```

📊 7. Borrowed Books Summary
GET /api/borrow

Response:
```
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Theory of Everything",
          "isbn": "9780553380163"
        },
        "totalQuantity": 5
      }
    ]
  }
```


⚠️ Generic Error Response Format

```
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}

```

✅ Author
Md Fazle Rabbi
Frontend & Full-Stack Developer
LinkedIn | GitHub
