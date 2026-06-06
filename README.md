# What Am I Craving? (Frontend)

> ### The fate of your next meal is in my wheel. No pressure. Spin it. You deserve something delicious.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-cravingwhat.vercel.app-orange?style=for-the-badge)](https://cravingwhat.vercel.app/)
[![Backend Repo](https://img.shields.io/badge/Backend%20Repo-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/briankabbo/what-am-i-craving-for)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-46E3B7?style=for-the-badge)](https://what-am-i-craving-for.onrender.com)

![App Screenshot](https://github.com/user-attachments/assets/ff061403-ad02-460f-9c3b-4848ab789c48)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

---

## Tech Stack

| Tool                       | Purpose                    |
| -------------------------- | -------------------------- |
| React                      | UI library                 |
| Vite                       | Build tool and dev server  |
| Tailwind CSS v4            | Utility-first CSS styling  |
| DM Sans + Playfair Display | Google Fonts               |

---

## Prerequisites

Before beginning, make sure you have the following installed on your machine:

- **Node.js** v22 or higher — [Download here](https://nodejs.org/)
- **npm** v10 or higher (comes bundled with Node.js)
- The **.NET backend** running locally — see the [backend README](https://github.com/briankabbo/what-am-i-craving-for) for setup instructions

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

Create a `.env` file in the root of the project:

```bash
cp .env.example .env
```

Then open the `.env` file and set the backend URL:

```env
VITE_API_BASE_URL=http://localhost:5174
```

> **Note:** The `vite.config.js` already has a proxy configured that forwards all `/api` requests from the frontend to `http://localhost:5174` automatically. So, for local development, this variable is used as the base target for that proxy.

> **Note:** If you just want to explore the app without setting up the backend locally, you can point `VITE_API_BASE_URL` to the live API instead: `https://what-am-i-craving-for.onrender.com`

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:3000** by default.

> **Note:** `strictPort` is set to `false` in `vite.config.js`, which means if port 3000 is already in use on your machine, Vite will automatically try the next available port. Make sure the .NET backend is running before starting the frontend. API calls will fail otherwise.

---

## Project Structure

```
what-am-i-craving-for-frontend/
├── src/
│   ├── assets/                      # App icons and images
│   ├── components/
│   │   └── FoodPicker/              # All FoodPicker UI components
│   │       ├── constants.js         # App-wide constants (moods, cuisines)
│   │       ├── FavouritesList.jsx   # Saved favourites list
│   │       ├── FilterPanel.jsx      # Mood and cuisine filter UI
│   │       ├── FoodPicker.css       # Component-specific styles
│   │       ├── FoodPicker.jsx       # Main food picker component
│   │       ├── Header.jsx           # Top navigation bar
│   │       ├── ResultCard.jsx       # Food result card with nutrition info
│   │       └── Wheel.jsx            # Spinning wheel component
│   ├── hooks/
│   │   ├── useFavourites.js         # Handles saving and removing favourites
│   │   ├── useFoods.js              # Fetches and filters food data
│   │   └── useSpinAnimation.js      # Controls the wheel spin animation
│   ├── services/
│   │   └── api.js                   # All API call functions
│   ├── App.jsx                      # Root component
│   ├── index.css                    # Global styles
│   └── main.jsx                     # App entry point
├── .env.example                     # Example environment variables
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies and scripts
└── vite.config.js                   # Vite configuration
```

---

## Available Scripts

Run these from the root of the project:

| Command             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Starts the local development server with hot reload    |
| `npm run build`     | Bundles the app for production into the `dist/` folder |
| `npm run preview`   | Locally previews the production build                  |
| `npm run lint`      | Runs ESLint to catch code quality issues               |

---

## Contributing

Contributions are welcome! To contribute to this project, please follow these steps.

### 1. Fork and clone the repository

```bash
git clone https://github.com/your-username/what-am-i-craving-for-frontend.git
cd what-am-i-craving-for-frontend
```

### 2. Create a new branch

Always branch off `main` and give your branch a descriptive name:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make your changes

Write clear, descriptive commit messages:

```bash
git commit -m "feat: add mood selector component."
git commit -m "fix: correct API endpoint for food suggestions."
```

### 4. Run the linter before pushing

```bash
npm run lint
```

Fix any errors or warnings before opening a pull request.

### 5. Push and open a Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub against the `main` branch. Describe what you changed and why.

---

### ⚙️ Backend Repository ➜ [what-am-i-craving-for](https://github.com/briankabbo/what-am-i-craving-for)
