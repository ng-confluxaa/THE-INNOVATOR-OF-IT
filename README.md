# 🎓 THE INNOVATOR OF IT — Full Web Application & Dynamic Admin CMS

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Welcome to the official web application repository for **THE INNOVATOR OF IT** — a modern, high-converting, fully responsive web portal and dynamic Content Management System (CMS) Admin Panel engineered for IT training institutes.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/GNikhil-7/THE-INNOVATOR-OF-IT.git](https://github.com/GNikhil-7/THE-INNOVATOR-OF-IT.git)
- **Local Application URL**: `http://localhost:5173/`

---

## ✨ Features & Architecture Highlights

### 1. 🌐 Public Website & Landing Page
- **Hero Banner & Live Search**: Catchy gradient typography, real-time interactive course search bar with auto-suggestions, and live counters (*1250+ Placements, 500+ Hiring Partners, 8.5 LPA Avg Package, 32 LPA Highest Package*).
- **Infinite Scrolling Corporate Marquee**: Left-to-right marquee displaying corporate tie-up companies (*Google, Microsoft, Amazon, TCS, Infosys, Wipro, etc.*). **100% Dynamic**: Admin can add or remove hiring partner logos live!
- **Industry Tech Courses**: Filterable categories (*Full Stack, Web Dev, Data & AI, Cloud*), syllabus breakdown popups, duration, fee structure, and direct enrollment triggers.
- **Placed Students & Testimonials**: Student success cards displaying student avatars, CTC packages (*e.g., ₹24 LPA, ₹18 LPA*), hired company, role, and quote.
- **Active Internships Hub**: Open internship role listings with stipends, duration, and instant application modal.
- **Student Lead Registration & Validation**: Captures Student Name, Email ID, Mobile No, Course, Batch, Message. Includes strict field validation, celebration confetti effect, and instant WhatsApp quick-connect.
- **Automated Email Dispatch Logging**: Automatically dispatches and logs notification alerts sent to the director's email address.

---

### 2. 🔒 Private Dynamic Admin Panel (CMS Dashboard)
- **Zero Visible Admin Triggers**: Public website layout contains no visible admin icons or buttons for privacy.
- **URL & Secret Access Triggers**:
  - `http://localhost:5173/?admin=true`
  - `http://localhost:5173/#admin`
  - `http://localhost:5173/admin`
  - Secret Keyboard Shortcut: `Ctrl + Shift + A`
- **Default Credentials**: Username: `admin` | Password: `admin123`
- **Lead Management & 1-Click CSV Export**: View student enquiries with status badges (*New, Contacted, Enrolled, Closed*). **Export all leads into `.csv` format (`Innovator_IT_Student_Enquiries.csv`) with 1-click!**
- **Course CRUD Engine**: Add, edit, or delete courses dynamically.
- **Company Ticker Manager**: Add/remove recruiting companies from the live scrolling marquee.
- **Placement & Internship Control**: Publish student success stories and internship openings.
- **Site Configuration CMS**: Update Institute Name, Tagline, Phone, Admissions Email, Admin Recipient Email, Campus Address, and Hero Text.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core**: React 18/19, Vite
- **Styling**: Tailwind CSS, Custom CSS Glassmorphism & Animations
- **Icons**: `lucide-react`
- **State Management**: React Context + `LocalStorage` persistence
- **Export Utility**: Client-Side Dynamic CSV Exporter
- **Animations**: `canvas-confetti`

---

## 📁 Folder Structure

```
THE-INNOVATOR-OF-IT/
├── public/                 # Static assets & icons
├── src/
│   ├── components/         # Modular UI components
│   │   ├── AboutSection.jsx
│   │   ├── AdminPanel.jsx        # Full CMS Dashboard & CSV exporter
│   │   ├── CompanyTicker.jsx     # Dynamic left-to-right marquee
│   │   ├── ContactSection.jsx    # Form with full regex validations
│   │   ├── CourseModal.jsx       # Syllabus modal
│   │   ├── CoursesSection.jsx    # Filterable course cards
│   │   ├── EnquiryModal.jsx      # Quick enquiry popup
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── InternshipsSection.jsx
│   │   ├── Navbar.jsx            # URL Hash navigation & scroll spy
│   │   └── PlacementsSection.jsx
│   ├── context/
│   │   └── AppContext.jsx        # Central state & LocalStorage sync
│   ├── App.jsx                   # Main layout container
│   ├── index.css                 # Tailwind directives & marquee keyframes
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/GNikhil-7/THE-INNOVATOR-OF-IT.git
cd THE-INNOVATOR-OF-IT
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 👤 Author & Credits
Developed for **THE INNOVATOR OF IT** Educational Institute  
GitHub: [@GNikhil-7](https://github.com/GNikhil-7)
