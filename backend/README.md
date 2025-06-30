# 📝 Blog API - Fullstack Junior Developer Challenge

This is a RESTful API built with Node.js, using Express, Prisma ORM, and SQLite for data persistence. It allows user registration and blog post management, with JWT-based authentication.

### 🚀 Technologies Used

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite with Prisma
- JWT for auth
- Bcrypt for hashing

### 📦 Installation and Execution

```git
# Clone repository
git clone https://github.com/seu-usuario/blog-api.git
cd blog-api/backend

# Install dependecies
yarn install

# Setup database and Prisma
yarn prisma migrate dev --name init

# Run the application
yarn dev
```

Create a .env file with the following:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
```

### 🔐 Authentication Routes

#### POST /auth/register

Creates a new user

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

#### POST /auth/login

Returns a JWT for authentication.

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

### 📚 Post Routes

All routes below require a JWT in the Authorization header: Bearer <token>

#### POST /posts

Returns a JWT for authentication.

```json
{
  "title": "My first post",
  "content": "This is the content of the post."
}
```

#### GET /posts

Lists all posts

#### GET /posts/:id

Returns a specific post by ID.

#### PUT /posts/:id

Updates a post.

```json
{
  "title": "Updated title",
  "content": "Updated content."
}
```

#### DELETE /posts/:id

Deletes a post from the database.
