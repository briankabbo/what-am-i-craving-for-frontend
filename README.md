# What Am I Craving? (Frontend)

A mood-based food picker that spins up meal suggestions, complete with calorie counts, so you don't have to worry about it and start eating. Built with **Vite**, styled with **Tailwind CSS**, and powered by a **.NET backend API**.

---

## Table of Contents

- Tech Stack
- Prerequisites
- Getting Started
- Project Structure
- Available Scripts
- Contributing

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React | UI library |
| Vite | Build tool & dev server |
| Tailwind CSS | latest | Utility-first styling |
| DM Sans + Playfair Display| Google Fonts  |

---

## Prerequisites

Before beginning, make sure you have the following installed on your machine:

- **Node.js** v18 or higher - [Download here](https://nodejs.org/)
- **npm** v9+ (comes bundled with Node.js)
- The **.NET backend** running locally (see the backend README for setup instructions)

To verify your versions, run:

```bash
node -v
npm -v
```

---

## Getting Started

Follow these steps to run the frontend locally.

### 1. Clone the repository

```bash
git clone https://github.com/briankabbo/what-am-i-craving-for-frontend.git
cd what-am-i-craving-for-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project. Copy the example file and fill in your values:
 
```bash
cp .env.example .env
```
 
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** by default.

> **Note:** Make sure the .NET backend is running before you start the frontend; API calls will fail otherwise.

---
## Available Scripts
 
Run these from inside the `frontend/` folder:
 
| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server with hot reload |
| `npm run build` | Bundles the app for production into the `dist/` folder |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs ESLint to catch code quality issues |
 
Run these from inside the `backend/` folder:
 
| Command | Description |
|---|---|
| `dotnet run` | Starts the API server |
| `dotnet build` | Compiles the project |
| `dotnet ef migrations add <Name>` | Creates a new database migration |
| `dotnet ef database update` | Applies pending migrations to the database |

## Contributing

To contribute to this project, please follow these steps:

### 1. Create a new branch

Always branch off `main` and give your branch a descriptive name:

```bash
git checkout -b feature/your-feature-name
or
git checkout -b fix/your-bug-fix
```

### 2. Make your changes

Write clear commit messages:

```bash
git commit -m "feat: add mood selector component"
git commit -m "fix: correct API endpoint for food suggestions"
```

### 3. Run the linter before pushing

```bash
npm run lint
```

Fix any errors or warnings before opening a pull request.

### 4. Push and open a Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub against the `main` branch. Describe what you changed and why.

---

### ⚙️ Backend | [Github Repo](https://github.com/briankabbo/what-am-i-craving-for)
