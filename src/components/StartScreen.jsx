import React from "react";
import { QuizLogo } from "./QuizLogo";
import {
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Layers,
  Flag,
  ChevronRight,
  Zap,
} from "lucide-react";
import { CATEGORIES, DIFFICULTIES } from "../data/quizQuestions";

export const StartScreen = ({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  timerEnabled,
  setTimerEnabled,
  questionCount,
  setQuestionCount,
  availableCount,
  onStart,
}) => {
  return (
    <div className="start-screen-container">
      {/* Hero Header with Q Branding */}
      <div className="hero-branding-card">
        <div className="hero-logo-col">
          <div className="hero-logo-box">
            <QuizLogo className="hero-logo-svg" />
            <div className="hero-logo-glow" />
          </div>
        </div>

        <div className="hero-content-col">
          {/* Top Tags as shown in reference */}
          <div className="hero-tags-row">
            <div className="tech-tags">
              <span className="tag-pill tag-html">HTML</span>
              <span className="tag-pill tag-css">CSS</span>
              <span className="tag-pill tag-js">JavaScript</span>
              <span className="tag-pill tag-fw">Frameworks</span>
            </div>
            <span className="tag-pill tag-difficulty">
              <Award size={13} /> {difficulty === "All" ? "Intermediate" : difficulty}
            </span>
          </div>

          <h1 className="hero-title">Quiz App</h1>
          <p className="hero-subtitle">
            Build a browser-based quiz application to test any knowledge
          </p>
        </div>
      </div>

      {/* Community Progress Banner (from the specification design) */}
      <div className="community-banner">
        <p className="community-text">
          Start building, submit solution and get feedback from the community.
        </p>

        <div className="stepper-track">
          <div className="step-item step-active">
            <div className="step-badge step-pill">
              <Play size={14} className="fill-current" />
              <span>Start Working</span>
            </div>
          </div>
          <div className="step-line" />

          <div className="step-item">
            <div className="step-badge step-number">2</div>
            <span className="step-label">Submit Solution</span>
          </div>
          <div className="step-line" />

          <div className="step-item">
            <div className="step-badge step-flag">
              <Flag size={13} />
            </div>
            <span className="step-label">5 upvotes</span>
          </div>
          <div className="step-line" />

          <div className="step-item">
            <div className="step-badge step-flag">
              <Flag size={13} />
            </div>
            <span className="step-label">10 upvotes</span>
          </div>
        </div>
      </div>

      {/* Main Spec & Config Grid */}
      <div className="start-grid">
        {/* Left Column: Requirements & Overview */}
        <div className="card requirements-card">
          <h2 className="card-section-title">
            <Sparkles size={18} className="text-orange" />
            Project Overview & Rules
          </h2>
          <p className="card-intro">
            In this project, we will be making a browser based quiz. The app presents users with a series of multiple-choice questions, and after each question, provides immediate feedback on whether the selected answer is correct or incorrect.
          </p>

          <div className="requirements-list">
            <div className="req-item">
              <CheckCircle2 size={16} className="req-icon" />
              <div className="req-text">
                <strong>Card-based questions:</strong> Questions are presented as sleek cards with answer buttons.
              </div>
            </div>

            <div className="req-item">
              <CheckCircle2 size={16} className="req-icon" />
              <div className="req-text">
                <strong>Instant feedback:</strong> When you pick an answer, buttons immediately turn <span className="highlight-green">green (correct)</span> or <span className="highlight-red">red (incorrect)</span>, revealing the right answer.
              </div>
            </div>

            <div className="req-item">
              <CheckCircle2 size={16} className="req-icon" />
              <div className="req-text">
                <strong>Dynamic score tally:</strong> Answering correctly increments score; streaks trigger bonus multipliers.
              </div>
            </div>

            <div className="req-item">
              <CheckCircle2 size={16} className="req-icon" />
              <div className="req-text">
                <strong>Optional 1-minute timer:</strong> 60s per question countdown. If unattempted in time, it skips to next question with a <span className="highlight-orange">-1 point</span> penalty.
              </div>
            </div>

            <div className="req-item">
              <CheckCircle2 size={16} className="req-icon" />
              <div className="req-text">
                <strong>Results & Review:</strong> Complete review showing all questions, your responses, and detailed explanations.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quiz Configuration & Launch */}
        <div className="card config-card">
          <h2 className="card-section-title">
            <Zap size={18} className="text-orange" />
            Customize Challenge
          </h2>

          {/* Category Select */}
          <div className="config-group">
            <label className="config-label">
              <Layers size={15} /> Topic Category
            </label>
            <div className="pill-group">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`pill-option ${category === cat ? "selected" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Select */}
          <div className="config-group">
            <label className="config-label">
              <Award size={15} /> Difficulty Level
            </label>
            <div className="pill-group">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  className={`pill-option ${difficulty === diff ? "selected" : ""}`}
                  onClick={() => setDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Timer Mode Toggle */}
          <div className="config-group timer-config-group">
            <div className="timer-config-header">
              <div className="timer-config-title">
                <Clock size={16} className="text-orange" />
                <span>1-Minute Question Timer</span>
              </div>
              <label className="switch" aria-label="Toggle 1-minute question timer">
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                />
                <span className="slider round" />
              </label>
            </div>
            <p className="config-hint">
              {timerEnabled
                ? "Active: 60 seconds per question. Timeout deducts 1 pt and advances automatically."
                : "Disabled: Untimed mode. Take your time on each question."}
            </p>
          </div>

          {/* Question Count Select */}
          <div className="config-group">
            <label className="config-label">Questions per Quiz</label>
            <div className="count-selector-row">
              {[5, 10, "all"].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  className={`count-btn ${
                    questionCount === cnt ? "selected" : ""
                  }`}
                  onClick={() => setQuestionCount(cnt)}
                >
                  {cnt === "all" ? "All Pool" : `${cnt} Qs`}
                </button>
              ))}
            </div>
          </div>

          {/* Available Questions Notice */}
          <div className="ready-indicator">
            <span className="indicator-dot" />
            <span>Ready with <strong>{availableCount}</strong> curated questions</span>
          </div>

          {/* Start Working Button */}
          <button
            type="button"
            className="btn-start-working"
            onClick={onStart}
            autoFocus
          >
            <span className="btn-glow-layer" />
            <span className="btn-content">
              <Play size={18} className="fill-current" />
              <span>Start Working</span>
              <ChevronRight size={18} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
