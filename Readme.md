Tốt lắm 👍 — dưới đây là **phiên bản đầy đủ, chi tiết và chuyên nghiệp nhất của file `README.md`** cho dự án **🛍 Easy Shop – E-commerce Web Application**.
Bạn chỉ cần **copy toàn bộ nội dung dưới đây** và **dán vào file `README.md`** trong thư mục gốc của dự án (`Ecommerce/`).

---

# 🛍 Easy Shop – E-commerce Web Application

A **fullstack e-commerce website** built with **ReactJS, NodeJS, ExpressJS, and MongoDB**, providing role-based access control (Admin, Seller, Customer), real-time communication, and responsive UI/UX.

---

## 🌟 Overview

**Easy Shop** allows users to buy and sell products online with modern, interactive features.
It includes three main modules:

- **Frontend:** User interface for buyers and sellers.
- **Dashboard:** Admin interface for managing users, products, and orders.
- **Backend:** API services, authentication, and database management.

---

## 🚀 Features

### 👤 User (Customer)

- Register, login, and manage personal account.
- Browse, search, and filter products.
- Add items to cart and wishlist.
- Checkout and track order history.
- Chat in real-time with sellers.

### 🛒 Seller

- Create and manage products (CRUD).
- Track inventory, orders, and product ratings.
- Real-time messaging with buyers.
- View performance and sales analytics.

### 🧾 Admin

- Manage all users, products, and orders.
- Approve or block sellers.
- Monitor system analytics and reports through the dashboard.

---

## 💡 Tech Stack

| Layer                   | Technology                            |
| ----------------------- | ------------------------------------- |
| Frontend                | ReactJS, TailwindCSS, DaisyUI, Axios  |
| Backend                 | NodeJS, ExpressJS, JWT Authentication |
| Database                | MongoDB, Mongoose                     |
| Real-time Communication | Socket.IO                             |
| Cloud Storage           | Cloudinary                            |
| Admin Dashboard         | React Admin / Custom UI               |
| Deployment              | Vercel (Frontend), Render (Backend)   |

---

## 🗂 Folder Structure

```
Ecommerce/
├── backend/        # RESTful API, database, authentication
├── dashboard/      # Admin dashboard for managing data
└── frontend/       # Client-side for customer & seller
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/FatPat117/E-Commerce-Web.git
cd E-Commerce-Web
```

### 2️⃣ Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

#### Dashboard

```bash
cd ../dashboard
npm install
```

### 3️⃣ Create environment variables

In each folder (`backend`, `frontend`, `dashboard`), create a file named `.env` and add your configuration:

#### `.env` example (backend)

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧩 Running the Application

### Run Backend

```bash
cd backend
npm run dev
```

### Run Frontend

```bash
cd ../frontend
npm run dev
```

### Run Dashboard

```bash
cd ../dashboard
npm run dev
```

Open your browser and visit:
👉 Frontend: [http://localhost:5173](http://localhost:5173)
👉 Dashboard: [http://localhost:5174](http://localhost:5174)

---

## 🔐 Authentication & Authorization

- **JWT (JSON Web Token)** is used for secure login sessions.
- Roles are assigned as:

     - `admin`
     - `seller`
     - `user`

- Each role has different access permissions throughout the app.

---

## 💬 Real-time Features

- Built with **Socket.IO** for:

     - Buyer–Seller messaging
     - Admin–Seller support chat

- Real-time updates on orders, messages, and notifications.

---

## 🧾 API Endpoints (Examples)

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| POST   | `/api/auth/register`   | Register a new user              |
| POST   | `/api/auth/login`      | User login                       |
| GET    | `/api/products`        | Get all products                 |
| POST   | `/api/products`        | Create new product (Seller only) |
| PUT    | `/api/products/:id`    | Update product                   |
| DELETE | `/api/products/:id`    | Delete product                   |
| GET    | `/api/orders/user/:id` | Get orders by user ID            |

---

## 📱 Responsive UI

- Built with **TailwindCSS + DaisyUI** for a clean, modern look.
- Fully responsive across desktop, tablet, and mobile.
- Supports both **light and dark themes**.

---

## 📊 Dashboard Overview

The **Admin Dashboard** provides:

- Overview of total users, sellers, and orders.
- Product management with review moderation.
- Charts and analytics for revenue tracking and user growth.

---

## 🔗 Live Demo & Repositories

🌐 **Live Website:** [https://e-commerce-web-eta-black.vercel.app/](https://e-commerce-web-eta-black.vercel.app/)
💻 **GitHub Repository:** [https://github.com/FatPat117/E-Commerce-Web](https://github.com/FatPat117/E-Commerce-Web)
🖼 **Portfolio:** [https://pitaportfolio.netlify.app/](https://pitaportfolio.netlify.app/)

---

## 🧠 Learning Outcome

Through this project, I practiced:

- Structuring a **fullstack web application** with clear module separation.
- Managing authentication and user roles using **JWT**.
- Designing responsive, reusable UI components with **TailwindCSS**.
- Implementing **real-time communication** via Socket.IO.
- Integrating **Cloudinary** for image management.
- Deploying applications to **Vercel** (frontend) and **Render** (backend).

---

## 👨‍💻 Author

**Nguyen Tan Phat**
🎓 University of Information Technology – VNUHCM
📧 Email: [ntphat110705@gmail.com](mailto:ntphat110705@gmail.com)
🌐 Portfolio: [https://pitaportfolio.netlify.app/](https://pitaportfolio.netlify.app/)
💼 GitHub: [https://github.com/FatPat117](https://github.com/FatPat117)

---

⭐ _If you like this project, please give it a star on GitHub!_
