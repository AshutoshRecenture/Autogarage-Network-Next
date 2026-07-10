# Auto Garage Network Next - Project Guidelines

This file defines the overarching rules, coding standards, and behaviors for AI agents working on this project.

## Project Overview and Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose schemas).
- **Core Purpose**: A full-stack web platform offering garage management systems, custom websites, SEO services, and tools for the automotive repair industry.

## Coding Standards and Best Practices
- **Frontend**:
  - Use modern React functional components with hooks (`useState`, `useEffect`).
  - Use Tailwind CSS utility classes for styling. Avoid inline styles unless absolutely necessary.
  - Implement responsive design (mobile-first) by leveraging Tailwind's responsive prefixes (`md:`, `lg:`).
  - Use `next/image` for image optimization and `next/link` for routing.
- **Backend**:
  - Follow MVC (Model-View-Controller) pattern.
  - Keep controllers lean and handle business logic explicitly.
  - Always validate API request bodies before processing data.
  - Return standardized JSON responses (`{ status: boolean, message: string, data?: any }`).

## Folder Structure and Naming Conventions
- **Frontend (`/frontend`)**:
  - `/src/app`: Next.js App Router pages (`page.jsx`, `layout.jsx`).
  - `/src/components`: Reusable UI components grouped by feature (e.g., `/contact`, `/blog`). Use PascalCase for component files (e.g., `ContactForm.jsx`).
  - `/public/images`: Static image assets.
- **Backend (`/backend`)**:
  - `/src/controllers`: Request handlers (e.g., `contact.controller.js`).
  - `/src/routes`: API route definitions (e.g., `contact.routes.js`).
  - `/src/models`: Mongoose database schemas (e.g., `Contact.js`). Use PascalCase for model files.

## Development Workflow and Implementation Guidelines
- Prioritize creating small, focused, and reusable components.
- Ensure that backend schemas precisely map to frontend form data before making database insertions.
- Keep the UI aesthetic clean, modern, and aligned with automotive/garage themes (vibrant blues, dark slates).
- Handle UI loading and error states gracefully in forms and data-fetching components.

## Rules for Modifying Existing Code (CRITICAL)

* **Never overwrite or revert any manual changes made by the developer.**
* **If the developer manually edits the code, treat those changes as intentional.**
* **Do not restore the previous version or regenerate that section unless the developer explicitly asks you to do so.**
* **Preserve all manual modifications while making any new changes.**
* **If there is any conflict between your generated code and the developer's manual edits, ask for confirmation before modifying the affected code.**
* **Make only the minimum necessary changes to accomplish the requested task.**
* **Do not refactor unrelated code unless explicitly instructed.**
