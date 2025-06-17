# 🐾 FetchMate

FetchMate is a modern, React + TypeScript web application designed to help users find their ideal furry companion from a pool of adoptable dogs. With intuitive filtering, favorites, and smart matchmaking, FetchMate brings joy to pet adoption through seamless interaction and playful design.

---

## 🚀 Live Demo

🔗 [Click here to use FetchMate](https://dog-matcher-git-master-ashwini5737s-projects.vercel.app/search)

---

## 🎯 Features

- 🔐 **Login**
  - Simple name and email-based login.
  - User info is stored using React Context and localStorage.

- 🐶 **Search and Filter Dogs**
  - Filter by **Breed**, **Age Range**, **Zip Code**, or **Name Prefix**.
  - Toggle **ascending/descending sort** by breed.

- 💖 **Favorites Drawer**
  - Heart icon to mark/unmark favorites.
  - View all favorites in a slide-out drawer.
  - Option to clear the favorites list.
  - Match button returns a dog best aligned with user’s picks.

- 🎨 **UI & Experience**
  - Beautiful, **pink-themed animated background**.
  - Responsive layout with clean header and action bar.
  - Dynamic filter chips for active filters with delete option.
  - Loading indicators, error messages, and graceful empty states.

---

## 🧰 Tech Stack

| Technology    | Description                          |
|---------------|--------------------------------------|
| React         | Frontend framework                   |
| TypeScript    | Type-safe JavaScript                 |
| Material UI   | UI component library                 |
| Axios         | API data fetching                    |
| React Router  | Page navigation                      |
| Vercel        | Free deployment platform             |
| Context API   | Session and favorite state sharing   |

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js v14+
- npm (or yarn)

### Setup

```bash
git clone https://github.com/Ashwini5737/dog-matcher.git
cd dog-matcher
npm install
npm start
```
- Open http://localhost:3000 in your browser to view the app locally.

### Project Structure
src/
│
├── components/          # Reusable UI (DogCard, Header, Sidebar, etc.)
├── context/             # UserContext for login state
├── pages/               # Main app pages (Login, Search)
├── services/            # API helpers for login and dog search
├── types/               # Shared TypeScript interfaces (Dog, User)
└── assets/              # Static files (images, icons)
