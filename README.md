# 🍣 Sushi-Go-Round Remaster (WIP)
A modern remaster of my original bootcamp-era Sushi-Go-Round game.

Originally, when working on this project, the assignment was to demonstrate my understanding of object-oriented programming in vanilla JavaScript on the DOM.

Now, with more polished skills in the frontend, I would like to remaster this game to pay tribute to my friends who played the first rendition of this silly game; all the while talking to me and supporting my career in software engineering.


The goal: take a working prototype and evolve it into a polished, production-quality web game —  
showcasing **clean architecture, modern tooling, accessibility, and UI/UX polish.**

---

## 🚀 Tech Stack
This project is being rebuilt with **React + TypeScript + Vite**, and a custom HTML5 Canvas game engine.

- [Vite](https://vitejs.dev/) – lightning-fast dev server & build
- [React](https://react.dev/) – shell UI (menus, settings, leaderboard)
- [TypeScript](https://www.typescriptlang.org/) – typed game engine
- HTML5 Canvas – rendering layer for the game loop
- Tailwind CSS – quick UI styling
- (Planned) Supabase – global leaderboard

---

## 🛠️ Development Status
- ✅ Repo scaffolded with Vite + React + TypeScript
- ✅ Initial setup committed
- ⏳ Next: Canvas game skeleton + basic input handling
- ⏳ Later: spawning system, scoring, HUD, accessibility modes, deploy to GitHub Pages

---

## ▶️ Getting Started
Clone the repo and install dependencies:

```bash
git clone https://github.com/jennhuynh02/sushi-go-round-remaster.git
cd sushi-go-round-remaster
npm install
npm run dev
```

## Learnings
Moving off of OOP and leveraging TypeScript instead:

- TypeScript isn’t *class-first* — it uses **structural typing**, letting us model behavior with **plain data**, **functions**, **unions**, and **interfaces**.  
- **Interfaces & type aliases** provide clear shape safety without inheritance.  
- **Discriminated unions** replace complex class hierarchies with clean, type-safe branching.  
- **Generics** enable reusable, flexible helpers for shared logic.  
- **`satisfies`** and **exhaustiveness checks** ensure all cases are covered at compile time.  
- **Readonly and immutability utilities** help maintain predictable, pure logic.  
