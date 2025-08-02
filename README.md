#  SINOPE Blogging App

A full-stack blogging platform where users can register, create, read, update, and delete blog posts. Built using the **MERN stack** with authentication, state management, and clean UI components.

##  Live Demo

<!-- Add your deployed frontend URL here -->
[View Live App]([https://your-deployed-app-link.com](https://sinope-blogingapp-2.onrender.com/))

---

##  Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Redux Persist
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcrypt
- dotenv

---


## Installation & Setup

### Clone the Repository


git clone https://github.com/aghil2003/SINOPE-BLOGINGAPP.git
cd SINOPE-BLOGINGAPP

##Setup Backend
cd backend
npm install

# Create a .env file and add your environment variables:
# MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FRONTEND_URL
npm start

##Setup Frontend
cd frontend
npm install
npm run dev

## Environment Variables
Backend .env example:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173

## API Endpoints Overview

Auth
POST /api/auth/register - Register

POST /api/auth/login - Login

GET /api/auth/user - Get logged-in user info

GET /auth/google - Google OAuth

Blogs
POST /api/blogs - Create Blog

GET /api/blogs - Get all blogs

GET /api/blogs/:id - Get single blog

PUT /api/blogs/:id - Update blog

DELETE /api/blogs/:id - Delete blog


Edit

---
