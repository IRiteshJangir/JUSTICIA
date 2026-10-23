# JUSTICIA – Advocates & Legal Consultants

A full-stack MERN legal consultancy website with a premium dark theme, gold accents, and complete admin dashboard.

## 🏛️ Features

### Public Website
- **Home** – Hero section, practice areas, testimonials, blog preview, statistics
- **About Us** – Firm profile, mission/vision, core values, team preview
- **Practice Areas** – 9 legal specializations with detail pages
- **Case Studies** – Filterable case studies with outcomes
- **Blog & Articles** – Full blog with categories, search, pagination
- **Contact Us** – Contact form, Google Maps, WhatsApp integration
- **Book Appointment** – Full consultation booking with date/time slots
- **FAQ** – Searchable accordion FAQ
- **Our Team** – Lawyer profiles with social links

### Admin Dashboard
- Dashboard overview with analytics charts
- Appointment management (approve/reject/complete)
- Practice Areas, Case Studies, Blog CRUD
- Contact enquiries management
- FAQ, Testimonials, Team CRUD
- Website settings management
- Admin profile & password change

## 🛠️ Tech Stack

### Frontend
- React.js 18 with Vite
- Tailwind CSS
- Redux Toolkit + RTK Query
- React Router DOM v6
- React Hook Form + Zod validation
- Framer Motion animations
- Lucide React icons
- Swiper.js for carousels

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs password hashing
- Zod request validation
- Cloudinary image uploads
- Nodemailer email notifications
- Rate limiting + Helmet security

## 📁 Project Structure

```
JUSTICIA/
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/     # Reusable UI & common components
│       ├── features/       # Redux slices
│       ├── hooks/          # Custom hooks
│       ├── layouts/        # Public & Admin layouts
│       ├── pages/          # Public & Admin pages
│       ├── routes/         # App routing
│       ├── services/       # RTK Query API
│       ├── store/          # Redux store
│       └── utils/          # Helpers
│
├── server/                 # Express Backend
│   └── src/
│       ├── config/         # DB, Cloudinary, Email config
│       ├── controllers/    # Route controllers
│       ├── middlewares/     # Auth, validation, error handling
│       ├── models/         # Mongoose schemas (11 models)
│       ├── routes/         # API routes
│       ├── seeds/          # Database seeders
│       ├── services/       # Business logic layer
│       ├── templates/      # Email templates
│       ├── utils/          # Utilities
│       └── validators/     # Zod schemas
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account
- SMTP email service (Gmail, SendGrid, etc.)

### 1. Clone and Install

```bash
# Install server dependencies
cd JUSTICIA/server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Variables

Copy `server/.env.example` to `server/.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/justicia
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=noreply@justicia.com
SMTP_FROM_NAME=JUSTICIA

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database

```bash
cd server

# Create admin user
npm run seed
# Admin credentials: admin@justicia.com / Admin@123

# Seed sample data (practice areas, FAQs, testimonials, etc.)
npm run seed:data
```

### 4. Start Development

```bash
# Terminal 1: Start server
cd server
npm run dev

# Terminal 2: Start client
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin/login

## 📡 API Endpoints

| Resource | Method | Endpoint | Access |
|----------|--------|----------|--------|
| Auth | POST | `/api/auth/login` | Public |
| Auth | GET | `/api/auth/me` | Admin |
| Auth | PATCH | `/api/auth/change-password` | Admin |
| Appointments | POST | `/api/appointments` | Public |
| Appointments | GET | `/api/appointments` | Admin |
| Appointments | PATCH | `/api/appointments/:id/status` | Admin |
| Practice Areas | GET | `/api/practice-areas/public` | Public |
| Practice Areas | CRUD | `/api/practice-areas` | Admin |
| Case Studies | GET | `/api/case-studies/public` | Public |
| Case Studies | CRUD | `/api/case-studies` | Admin |
| Blogs | GET | `/api/blogs/public` | Public |
| Blogs | CRUD | `/api/blogs` | Admin |
| Contact | POST | `/api/contact` | Public |
| Contact | GET/PATCH/DELETE | `/api/contact` | Admin |
| FAQs | GET | `/api/faqs/public` | Public |
| FAQs | CRUD | `/api/faqs` | Admin |
| Testimonials | GET | `/api/testimonials/public` | Public |
| Testimonials | CRUD | `/api/testimonials` | Admin |
| Team | GET | `/api/team/public` | Public |
| Team | CRUD | `/api/team` | Admin |
| Settings | GET | `/api/settings` | Public |
| Settings | PUT | `/api/settings` | Admin |
| Dashboard | GET | `/api/dashboard/stats` | Admin |
| Upload | POST | `/api/upload` | Admin |

## 🎨 Design System

| Token | Color | Usage |
|-------|-------|-------|
| Primary | `#080D10` | Dark backgrounds |
| Secondary | `#11191D` | Cards, sidebar |
| Gold | `#D99A32` | Accents, CTAs |
| Gold Light | `#F0B84C` | Hover states |
| Cream | `#F7F4ED` | Alt sections |
| White | `#FFFFFF` | Content areas |
| Text | `#252525` | Body text |

**Typography**: Playfair Display (headings) + Inter (body)

## 🚢 Deployment

### Frontend → Vercel
```bash
cd client
npm run build
# Deploy dist/ to Vercel
```

### Backend → Render
- Set environment variables in Render dashboard
- Set build command: `npm install`
- Set start command: `npm start`

### Database → MongoDB Atlas
- Create free cluster at mongodb.com/atlas
- Update `MONGODB_URI` in production env

### Images → Cloudinary
- Create free account at cloudinary.com
- Update Cloudinary credentials in env

## 📝 Admin Credentials (Development)

- **Email**: admin@justicia.com
- **Password**: Admin@123

⚠️ Change these credentials in production!

## 📄 License

This project is proprietary. All rights reserved.
# JUSTICIA
