Here is a **clean, professional, GitHub-ready README** for your project — based on your folder structure, tech stack, and the fact that it's a fully dynamic Portfolio CMS built with Next.js 15.

You can copy-paste this into your `README.md` right now ✅
If you want badges, images, or a logo added later, just tell me.

---

# 🚀 Uwi Portfolio CMS — Next.js 15 Full Dynamic Portfolio System

A fully dynamic, CMS-powered personal portfolio built with **Next.js 15**, **Supabase**, **React Query**, **TailwindCSS**, and a custom **admin dashboard**.
All portfolio content (Projects, Certificates, Hero Section, Services, Experience, Education, Testimonials, etc.) can be updated **without touching code**.

This project is designed to make managing a portfolio effortless — perfect for developers who want full control with a modern UI/UX.

---

## ✨ Features

### ✅ **Fully Dynamic Portfolio**

Update all portfolio content through an Admin CMS:

* Hero Section
* Tech Stack
* Projects
* My Services
* Certificates
* Testimonials
* Experience
* Educations
* Gallery

### ✅ **Admin Dashboard (CMS)**

Complete admin panel with CRUD:

* Create
* Read
* Update
* Delete
  Each section uses forms built with reusable components and Radix UI.

### ✅ **Modern Tech Stack**

Built using:

* **Next.js 15 (App Router)**
* **React 19**
* **Framer Motion**
* **TailwindCSS v4**
* **Supabase** (Authentication + Database)
* **TanStack React Query**
* **Tiptap Editor** (Custom nodes, toolbar, image upload)
* **Three.js + Drei + Rapier** (for 3D interactions)
* **Styled Components**
* **Lenis Smooth Scroll**

### ✅ **API Versioning**

Structured REST API:

* `/api/v1/*` – Admin CRUD endpoints
* `/api/v2/*` – Public read-only endpoints (used by frontend)

Organized using Next.js route handlers with folders like:

```
/api/v1/admin/projects/create
/api/v1/admin/projects/put/[id]
/api/v2/projects/get/[id]
```

### ✅ **Authentication System**

* Custom Admin Login
* Registration
* Supabase Auth Integration
* Protected Admin Routes

### ✅ **Reusable Component System**

Inside `/components/`:

* Admin Forms
* Tiptap Custom Editor (nodes, buttons, toolbar)
* UI Elements
* Loader & Skeletons
* Users & Admin UI components

---

## 📁 Project Structure (Overview)

```
src/
  ├── app/
  │   ├── (auth)/...
  │   ├── (users)/...
  │   ├── admin/...
  │   └── api/
  │       ├── v1/ (Admin CRUD)
  │       └── v2/ (Public APIs)
  ├── components/
  │   ├── admin/
  │   ├── users/
  │   ├── tiptap-editor/
  │   ├── ui/
  ├── config/
  ├── helpers/
  ├── hooks/
  ├── lib/
  ├── services/
  ├── styles/
  ├── types/
  └── utils/
```

Organized for scalability and maintainability.

---

## 🛠️ Installation

```bash
git clone https://github.com/YOUR-USERNAME/uwi-portofolio-nextjs.git
cd uwi-portofolio-nextjs
npm install
npm run dev
```

Create `.env.local` for environment variables (Supabase, keys, etc.).

---

## 🔗 API Technology

The CMS uses:

* **REST API**
* **Next.js route handlers**
* **Supabase database interactions**
* **React Query** for frontend fetching & caching

Admin endpoints use **server-side authentication** for security.

---

## 🧩 Core Dependencies

* `next@15.5.6`
* `react@19`
* `framer-motion`
* `tiptap`
* `supabase-js`
* `react-query`
* `three.js`
* `styled-components`
* `radix-ui`
* `tailwindcss@4`

---

## 🎯 Purpose of This CMS

This project allows me to:
✅ Update my portfolio anytime
✅ Add/Edit/Delete content without coding
✅ Maintain a clean & modern UI
✅ Use a custom-built dashboard
✅ Keep all content versioned, scalable, and dynamic

---

## 📌 Future Improvements

* Dark/Light mode improvements
* Theme customization for portfolio
* Drag-and-drop gallery manager
* Public API docs
* Admin analytics dashboard

---

## 👤 Author

**Muhammad Nahrul Hayat**
Full-stack developer focused on modern frontend, backend systems, and smooth UX.
GitHub: **BARBARBoyyHD**

---


 