# **Multi-Client SaaS Platform**

A scalable **multi-tenant Software-as-a-Service (SaaS) platform** built using **React**, **Node.js**, **Express**, and **MongoDB**, designed to support multiple organizations with isolated data, secure authentication, and an analytics-driven dashboard interface.

---

## 🚀 **Overview**

This platform enables multiple clients (organizations) to operate independently under a single backend system.
It includes:

* Multi-tenant separation using `clientId`
* Role-based access control (Admin, Manager, Viewer)
* JWT authentication
* Dashboard analytics (KPIs, charts)
* Full CRUD operations for reports and data
* Responsive React frontend
* REST API backend with Express & MongoDB

---

## 🛠️ **Tech Stack**

### **Frontend**

* React (Vite)
* React Router
* Axios
* TailwindCSS (or custom CSS)

### **Backend**

* Node.js + Express
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* bcrypt for password hashing
* dotenv for environment configuration

### **Deployment**

* Frontend → Vercel / Netlify
* Backend → Render / Railway / VPS
* Database → MongoDB Atlas

## 🔧 **Environment Variables**

### **Backend `.env`**

```
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
TOKEN_EXPIRES_IN=1d
```

### **Frontend `.env`**

```
VITE_API_BASE=https://your-backend-url/api
```

---

## ▶️ **Installation & Setup**

### **1. Clone the Repository**

```
git clone https://github.com/your-username/multiclient-platform.git
cd multiclient-platform
```

---

## **Backend Setup**

```
cd server
npm install
npm start
```

Backend will run at:

```
http://localhost:5000
```

---

## **Frontend Setup**

```
cd client
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔐 **Authentication Flow**

1. User logs in and receives a JWT token
2. Token is stored in `localStorage`
3. All protected API requests include the token
4. Backend middleware validates the token
5. Database queries enforce tenant-level isolation

---

## 📡 **API Endpoints**

### **Auth**

```
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### **Reports**

```
GET    /api/reports
POST   /api/reports
PUT    /api/reports/:id
DELETE /api/reports/:id
```

---

## 📈 **Features**

* Multi-tenant client isolation
* JWT-based authentication
* Role-based access (Admin/Manager/Viewer)
* KPI Dashboard (analytics overview)
* CRUD operations for reports
* Secure deletion protected by `clientId`
* Real-time UI updates
* Responsive UI

