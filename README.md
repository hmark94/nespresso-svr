# Nespresso SVR

This is a React web application for managing surveys, members, and results, with authentication and protected routes. The project uses React Bootstrap for UI components and React Router for navigation.

## Features
- User authentication (login, signup, forgot password)
- Protected routes for authenticated users
- Survey creation and results management
- Member management and detailed result views
- Responsive design using Bootstrap

## Main Routes
- `/` – Login page
- `/signup` – Sign up page
- `/forgot-password` – Password reset
- `/home` – Home page (protected)
- `/new-form` – Create a new form (protected)
- `/new_form_database` – Create a new form in the database (protected)
- `/success` – Success page (protected)
- `/results` – Results overview (protected)
- `/members` – Members list (protected)
- `/results/:route` – BTQ page (protected)
- `/results/:route/:uuid` – Member results (protected)
- `/results/:uuid` – Member results (protected)
- `/results/:route/:uuid/:id` – Survey result page (protected)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/` – Main source code
  - `components/` – React components
  - `context/` – Context providers (e.g., authentication)
  - `App.js` – Main app component with route definitions
- `public/` – Static assets

## Dependencies
- React
- React Router DOM
- React Bootstrap
- Bootstrap

## License
This project is for educational and internal use only.
