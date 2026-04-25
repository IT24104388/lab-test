STUDENT RECORDS SYSTEM
=======================

FILES IN THIS ZIP
-----------------
BACKEND files:
  server.js              → Express entry point
  Student.js             → Mongoose schema/model
  studentRoutes.js       → GET and POST route handlers
  package-backend.json   → Rename to package.json in your backend folder
  .env.example           → Copy to .env and fill in your MongoDB URI

FRONTEND files:
  App.jsx                → Main React component (form + table)
  main.jsx               → React DOM entry point
  index.html             → HTML shell (goes in the frontend root)
  vite.config.js         → Vite config
  package-frontend.json  → Rename to package.json in your frontend folder

HOW TO SET UP
--------------
Backend:
  1. Create a folder called `backend` and move backend files there.
  2. Rename package-backend.json → package.json
  3. Copy .env.example to .env and add your MONGO_URI
  4. Run: npm install
  5. Run: npm run dev

Frontend:
  1. Create a folder called `frontend` and move frontend files there.
  2. Create a subfolder `src` and move App.jsx and main.jsx inside it.
     (index.html and vite.config.js stay in the frontend root)
  3. Rename package-frontend.json → package.json
  4. Run: npm install
  5. Run: npm run dev   (opens at http://localhost:3000)

PHONE NUMBER FIELD (your task)
--------------------------------
Search for the comment "// TODO" in these files and add the phone field:

  Backend:
    Student.js       → Add field to the schema
    (No route changes needed — the route accepts any valid schema field)

  Frontend:
    App.jsx          → Add to emptyForm, add <input> in the form,
                       include in payload, add <th> and <td> in the table
