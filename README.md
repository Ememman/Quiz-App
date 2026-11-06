# 🎯 Quiz App — Dark & Orange Edition

> A modern, browser-based quiz application designed with a sleek **Dark & Orange** aesthetic, featuring a custom **Letter Q** ribbon monogram logo and favicon, instant answer feedback, 60-second timed challenges, live score tracking, and comprehensive post-quiz performance analytics.

---

## ✨ Features

- **🎨 Letter 'Q' Logo & Favicon**:
  - Custom SVG ribbon monogram with 3D gradients in obsidian, glowing amber, and fiery cadmium orange.
  - Exported as a React component (`<QuizLogo />`), raw SVG string (`QUIZ_LOGO_SVG`), and Favicon Data URI (`QUIZ_FAVICON_DATA_URI`).
  - Active favicon located at `/public/favicon.svg` and embedded in `/index.html`.
- **⚡ Start Challenge Screen**:
  - Clean project overview matching the challenge specifications: tags for **HTML**, **CSS**, **JavaScript**, **Frameworks**, and **Intermediate** difficulty.
  - Community progress stepper: `Start Working` ➔ `Submit Solution` ➔ `5 upvotes` ➔ `10 upvotes`.
  - Configurable topic categories, difficulty levels, question pool count, and timer toggles.
- **🃏 Card-Based Multiple Choice Questions**:
  - Multiple-choice questions presented on elevated glassmorphic cards.
  - Syntax-highlighted code snippets with copy-to-clipboard functionality.
- **🟢 Instant Visual & Audio Feedback**:
  - Selecting an answer immediately highlights it: **Green** for correct, **Red** for incorrect.
  - The correct answer is always highlighted in green with checkmarks, ensuring clear learning feedback.
  - Detailed explanation drawer slides open after each question explaining the concept.
  - Keyboard shortcuts supported: Press `1-4` or `A-D` to choose an option, and `Enter` / `Space` to proceed.
- **⏱️ 60-Second Question Timer**:
  - Live countdown gauge for each question with smooth linear progress and low-time pulsing warnings.
  - If the timer expires before an attempt, the question skips, revealing the correct answer, and **score is decremented by 1 point** (as per project requirements).
- **🏆 Results & Review Screen**:
  - Final score tally, accuracy percentage, and performance rank badges.
  - Dynamic confetti particle celebration (`canvas-confetti`).
  - Question-by-question review with filters for **All**, **Correct**, or **Missed** questions.
  - "Share Results" button to copy formatted score summaries to clipboard.
- **🔊 Zero-Latency Web Audio API Sound Effects**:
  - Synthesized chimes for correct answers, soft descending thuds for errors, countdown ticks, buzzer alerts, and celebratory fanfares.
  - Persistent mute/unmute control in the navigation bar.
- **💾 Lifetime Statistics & History**:
  - Stores high scores, total games played, lifetime accuracy, and streaks in `localStorage`.

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 3. Production Build & Preview

```bash
npm run build
npm run preview
```

### 4. Code Quality & Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
Quiz-App/
├── public/
│   ├── favicon.svg              # Dark & Orange Letter Q SVG favicon
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx           # Top header with Q logo, HUD & stats trigger
│   │   ├── QuizLogo.jsx         # Custom Letter 'Q' Dark & Orange Ribbon Logo component
│   │   ├── StartScreen.jsx      # Start screen with challenge spec & settings
│   │   ├── QuestionCard.jsx     # Card question with 60s timer & instant feedback
│   │   ├── ResultsScreen.jsx    # Final score breakdown, review accordion & confetti
│   │   └── StatsModal.jsx       # Lifetime performance modal
│   ├── data/
│   │   ├── quizQuestions.json   # Curated JSON questions (HTML, CSS, JS, Frameworks)
│   │   └── quizQuestions.js     # Question filters and helper utilities
│   ├── utils/
│   │   └── soundEffects.js      # Web Audio API synthesizer for sound effects
│   ├── App.jsx                  # Main state controller & quiz flow
│   ├── App.css                  # Dark & Orange theme stylesheet
│   ├── index.css                # Global design tokens & base reset
│   └── main.jsx                 # React root mount
├── index.html                   # HTML template with Google Fonts & favicon
├── package.json
└── vite.config.js
```

---

## 🎨 Logo Component Usage

```jsx
import { QuizLogo, QUIZ_LOGO_SVG, QUIZ_FAVICON_DATA_URI } from "./components/QuizLogo";

// Pure SVG Glyph (transparent backdrop)
<QuizLogo variant="glyph" className="w-12 h-12" />

// Badge Variant (with rounded dark container)
<QuizLogo variant="badge" className="w-16 h-16" />
```
