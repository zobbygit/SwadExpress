# SwadExpress
SwadExpress is your one-stop online store for quality groceries, bakery items, beverages, and more, delivered quickly with care and convenience.

# 🍔 Swad Express – Full Stack Food Ordering Platform

Swad Express is a modern and feature-rich full-stack food ordering web application built using the **MERN stack**. It provides a smooth shopping experience for users, a powerful dashboard for sellers, secure online payments, real-time cart updates, and a beautiful UI.

---

## 🚀 Live Features

### 👤 User Features
- User registration & login
- Browse food products
- Real-time cart updates
- Add / update / remove cart items
- Add and manage delivery addresses
- Cash on Delivery (COD) orders
- Stripe online payment integration
- Order history page
- Newsletter subscription
- Contact form support

### 🧑‍💼 Seller Features
- Seller authentication system
- Seller dashboard
- Add products with images
- Manage product stock
- View customer orders
- Secure seller access

### ⚙️ System Features
- Cloudinary image uploads
- Stripe payment + webhook verification
- Cookie-based authentication
- Secure CORS configuration
- Production ready setup

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- PrebuiltUI

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Tools & Services
- Stripe (Payments & Webhooks)
- Cloudinary (Image storage)
- Postman (API testing)
- JWT & Cookies authentication

---

SwadExpress/
├── client/ → Frontend (React + Vite)
└── server/ → Backend (Node + Express)


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/SwadExpress.git
cd SwadExpress

Backend:-
cd server
npm install

.env for backend

PORT=4000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLOUDINARY_API_SECRET=""
SELLER_PASSWORD=""
SELLER_EMAIL=""
NODE_ENV="production"

Start backend server:

npm run server

3️⃣ Frontend Setup
cd client
npm install
npm run dev

💳 Stripe Test Card

Use this card to test payments:

Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVV: Any 3 digits


🧪 API Testing

All APIs were tested using Postman:

User authentication

Seller authentication

Cart APIs

Order APIs

Address APIs

Payment APIs

Contact APIs

🛍 Seller Flow

Seller logs in

Access seller dashboard

Add new products with images

Products become visible to users

Users place orders

Seller views incoming orders

🌐 Deployment

Frontend: Vercel

Backend: Vercel

Database: MongoDB Atlas

Image Hosting: Cloudinary

🧠 Future Enhancements

Admin dashboard

Order tracking system

Reviews & ratings

Email notifications

Multi-vendor marketplace

Analytics for sellers

❤️ Author

Developed with passion by Zohaib

⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub!

📜 License

This project is open-source and free to use.

Happy Coding 🚀


## 📂 Project Structure

