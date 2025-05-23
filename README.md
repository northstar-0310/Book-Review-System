# 📚 Book Review System

A RESTful API built using **Node.js (ES6 Modules)**, **Express**, **MongoDB**, and **JWT** for user authentication. This service allows users to register/login, add books, write reviews, search books, and more.

---

## ⚙️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/northstar-0310/Book-Review-System.git
cd book-review-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory and add the following:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server

For development (uses `nodemon`):

```bash
npm run dev
```

For production:

```bash
npm start
```

> Ensure MongoDB is running locally or update `MONGO_URI` to your Atlas connection string.

---

## 📬 Example API Requests

### User Signup

```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```

### User Login

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Add a Book (Authenticated)

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Book Title","author":"Author Name","genre":"Fiction","description":"A great book."}'
```

### Get Books (Pagination + Filters)

```bash
curl "http://localhost:3000/api/books?page=1&limit=5&author=John&genre=Fiction"
```

### Get Book Details (with Review Pagination)

```bash
curl "http://localhost:3000/api/books/<BOOK_ID>?reviewPage=1&reviewLimit=2"
```

### Submit a Review (Authenticated)

```bash
curl -X POST http://localhost:3000/api/books/<BOOK_ID>/reviews \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Excellent read!"}'
```

### Update Your Review

```bash
curl -X PUT http://localhost:3000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":4,"comment":"Changed my mind."}'
```

### Delete Your Review

```bash
curl -X DELETE http://localhost:3000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

### Search Books

```bash
curl "http://localhost:3000/api/search?query=harry"
```

---

## ✅ Design Decisions & Assumptions

- JWT authentication is used for all protected endpoints.
- Passwords are hashed using **bcrypt** before saving.
- One review per user per book (enforced in business logic).
- Only review owner can update or delete their review.
- Pagination is supported for books and reviews.
- Error handling uses appropriate HTTP status codes/messages.
- MongoDB with **Mongoose** (no SQL/relational features).
- No file uploads (e.g., book covers/avatars) in this version.
- Simple case-insensitive search by title or author.

---

## 🗃️ Database Schema

### User

| Field    | Type     | Constraints              |
|----------|----------|--------------------------|
| `_id`    | ObjectId | Primary Key              |
| `username` | String  | Required                 |
| `email`  | String   | Required, Unique         |
| `password` | String | Required (hashed)        |

### Book

| Field       | Type     | Constraints              |
|-------------|----------|--------------------------|
| `_id`       | ObjectId | Primary Key              |
| `title`     | String   | Required                 |
| `author`    | String   | Required                 |
| `genre`     | String   | Optional                 |
| `description` | String | Optional                 |

### Review

| Field     | Type     | Constraints                                  |
|-----------|----------|----------------------------------------------|
| `_id`     | ObjectId | Primary Key                                  |
| `rating`  | Number   | Required, min: 1, max: 5                     |
| `comment` | String   | Optional                                     |
| `book`    | ObjectId | Reference to Book, Required                  |
| `user`    | ObjectId | Reference to User, Required, Unique per book |

---

## 🔗 Relationships

- A **User** can have many **Reviews**.
- A **Book** can have many **Reviews**.
- Each **Review** belongs to one **Book** and one **User**.
- Each **User** can only review a **Book** once.
