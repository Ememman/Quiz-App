import React from "react";
import { QuizLogo } from "./QuizLogo";
import {
  Play,
  CircleCheck,
  Clock,
  Sparkles,
  Medal,
  Layers,
  Flag,
  ChevronRight,
  Thunderbolt,
} from "@gravity-ui/icons";
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
    <div className="start-screen-container max-w-5xl mx-auto flex flex-col gap-4 sm:gap-6 animate-fade-in">
      {/* Hero Header with Q Branding */}
      <div className="hero-branding-card relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-[#191b26]/90 to-[#11121a]/95 p-5 sm:p-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 shadow-2xl">
        <div className="hero-logo-col shrink-0 flex items-center justify-center">
          <div className="hero-logo-box relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
            <QuizLogo className="hero-logo-svg w-full h-full drop-shadow-[0_10px_20px_rgba(249,115,22,0.45)]" />
            <div className="hero-logo-glow absolute inset-0 rounded-full bg-orange-500/20 blur-xl -z-10" />
          </div>
        </div>

        <div className="hero-content-col flex-1 flex flex-col gap-2.5 text-center sm:text-left">
          {/* Top Tags as shown in reference */}
          <div className="hero-tags-row flex flex-wrap items-center justify-center sm:justify-between gap-2">
            <div className="tech-tags flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2">
              <span className="tag-pill tag-html text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                HTML
              </span>
              <span className="tag-pill tag-css text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                CSS
              </span>
              <span className="tag-pill tag-js text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                JavaScript
              </span>
              <span className="tag-pill tag-fw text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Frameworks
              </span>
            </div>
            <span className="tag-pill tag-difficulty inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/35">
              <Medal width={13} height={13} />
              <span>{difficulty === "All" ? "Intermediate" : difficulty}</span>
            </span>
          </div>

          <h1 className="hero-title text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Quiz App
          </h1>
          <p className="hero-subtitle text-xs sm:text-base text-slate-300 font-normal leading-relaxed">
            Build a browser-based quiz application to test any knowledge
          </p>
        </div>
      </div>

      {/* Community Progress Banner */}
      <div className="community-banner rounded-xl sm:rounded-2xl border border-white/10 bg-[#0f1016]/90 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 shadow-lg">
        <p className="community-text text-xs sm:text-sm text-slate-300">
          Start building, submit solution and get feedback from the community.
        </p>

        {/* Stepper with mobile horizontal scrolling and snap */}
        <div className="stepper-track flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          <div className="step-item step-active flex items-center gap-1.5 shrink-0 snap-start">
            <div className="step-badge step-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-orange-600 text-white shadow-md shadow-purple-900/30">
              <Play width={13} height={13} />
              <span>Start Working</span>
            </div>
          </div>
          <div className="step-line hidden sm:block h-[2px] min-w-4 flex-1 bg-white/10" />

          <div className="step-item flex items-center gap-1.5 shrink-0 snap-start">
            <div className="step-badge step-number w-6 h-6 rounded-full bg-[#191b26] border border-white/10 flex items-center justify-center text-[11px] font-bold text-slate-400">
              2
            </div>
            <span className="step-label text-xs sm:text-sm font-medium text-slate-400">
              Submit Solution
            </span>
          </div>
          <div className="step-line hidden sm:block h-[2px] min-w-4 flex-1 bg-white/10" />

          <div className="step-item flex items-center gap-1.5 shrink-0 snap-start">
            <div className="step-badge step-flag w-6 h-6 rounded-full bg-[#191b26] border border-white/10 flex items-center justify-center text-slate-400">
              <Flag width={12} height={12} />
            </div>
            <span className="step-label text-xs sm:text-sm font-medium text-slate-400">
              5 upvotes
            </span>
          </div>
          <div className="step-line hidden sm:block h-[2px] min-w-4 flex-1 bg-white/10" />

          <div className="step-item flex items-center gap-1.5 shrink-0 snap-start">
            <div className="step-badge step-flag w-6 h-6 rounded-full bg-[#191b26] border border-white/10 flex items-center justify-center text-slate-400">
              <Flag width={12} height={12} />
            </div>
            <span className="step-label text-xs sm:text-sm font-medium text-slate-400">
              10 upvotes
            </span>
          </div>
        </div>
      </div>

      {/* Main Spec & Config Grid (Stack on mobile, 2 cols on desktop) */}
      <div className="start-grid grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-6">
        {/* Left Column: Requirements & Overview */}
        <div className="card requirements-card rounded-xl sm:rounded-2xl border border-white/10 bg-[#14151e]/80 backdrop-blur-md p-5 sm:p-7 flex flex-col gap-4 shadow-xl">
          <h2 className="card-section-title text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles width={18} height={18} className="text-orange-500 shrink-0" />
            <span>Project Overview & Rules</span>
          </h2>
          <p className="card-intro text-xs sm:text-sm text-slate-300 leading-relaxed">
            In this project, we will be making a browser based quiz. The app presents users with a series of multiple-choice questions, and after each question, provides immediate feedback on whether the selected answer is correct or incorrect.
          </p>

          <div className="requirements-list flex flex-col gap-3">
            <div className="req-item flex items-start gap-2.5">
              <CircleCheck width={16} height={16} className="req-icon text-orange-500 shrink-0 mt-0.5" />
              <div className="req-text text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white">Card-based questions:</strong> Questions are presented as sleek cards with answer buttons.
              </div>
            </div>

            <div className="req-item flex items-start gap-2.5">
              <CircleCheck width={16} height={16} className="req-icon text-orange-500 shrink-0 mt-0.5" />
              <div className="req-text text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white">Instant feedback:</strong> When you pick an answer, buttons immediately turn <span className="text-emerald-400 font-bold">green (correct)</span> or <span className="text-red-400 font-bold">red (incorrect)</span>, revealing the right answer.
              </div>
            </div>

            <div className="req-item flex items-start gap-2.5">
              <CircleCheck width={16} height={16} className="req-icon text-orange-500 shrink-0 mt-0.5" />
              <div className="req-text text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white">Dynamic score tally:</strong> Answering correctly increments score; streaks trigger bonus multipliers.
              </div>
            </div>

            <div className="req-item flex items-start gap-2.5">
              <CircleCheck width={16} height={16} className="req-icon text-orange-500 shrink-0 mt-0.5" />
              <div className="req-text text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white">Optional 1-minute timer:</strong> 60s per question countdown. If unattempted in time, it skips to next question with a <span className="text-orange-400 font-bold">-1 point</span> penalty.
              </div>
            </div>

            <div className="req-item flex items-start gap-2.5">
              <CircleCheck width={16} height={16} className="req-icon text-orange-500 shrink-0 mt-0.5" />
              <div className="req-text text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white">Results & Review:</strong> Complete review showing all questions, your responses, and detailed explanations.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quiz Configuration & Launch */}
        <div className="card config-card rounded-xl sm:rounded-2xl border border-white/10 bg-[#14151e]/80 backdrop-blur-md p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 shadow-xl">
          <h2 className="card-section-title text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Thunderbolt width={18} height={18} className="text-orange-500 shrink-0" />
            <span>Customize Challenge</span>
          </h2>

          {/* Category Select */}
          <div className="config-group flex flex-col gap-2">
            <label className="config-label text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers width={14} height={14} className="text-orange-400" />
              <span>Topic Category</span>
            </label>
            <div className="pill-group flex flex-wrap gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`pill-option text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer min-h-[38px] flex items-center touch-manipulation select-none active:scale-95 ${
                    category === cat
                      ? "bg-orange-500/20 border-orange-500 text-white shadow-sm shadow-orange-500/30"
                      : "bg-[#191b26] border-white/10 text-slate-300 hover:border-orange-500/40 hover:bg-[#202230]"
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Select */}
          <div className="config-group flex flex-col gap-2">
            <label className="config-label text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Medal width={14} height={14} className="text-amber-400" />
              <span>Difficulty Level</span>
            </label>
            <div className="pill-group flex flex-wrap gap-1.5 sm:gap-2">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  className={`pill-option text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer min-h-[38px] flex items-center touch-manipulation select-none active:scale-95 ${
                    difficulty === diff
                      ? "bg-orange-500/20 border-orange-500 text-white shadow-sm shadow-orange-500/30"
                      : "bg-[#191b26] border-white/10 text-slate-300 hover:border-orange-500/40 hover:bg-[#202230]"
                  }`}
                  onClick={() => setDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Timer Mode Toggle */}
          <div className="config-group timer-config-group rounded-xl border border-white/10 bg-[#191b26] p-3.5 flex flex-col gap-1.5">
            <div className="timer-config-header flex items-center justify-between">
              <div className="timer-config-title flex items-center gap-2 text-sm font-bold text-white">
                <Clock width={16} height={16} className="text-orange-500" />
                <span>1-Minute Question Timer</span>
              </div>
              <label className="switch relative inline-block w-11 h-6 shrink-0 cursor-pointer touch-manipulation" aria-label="Toggle 1-minute question timer">
                <input
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                />
                <span className="slider round" />
              </label>
            </div>
            <p className="config-hint text-[11px] sm:text-xs text-slate-400 leading-snug">
              {timerEnabled
                ? "Active: 60s per question. Timeout deducts 1 pt and advances automatically."
                : "Disabled: Untimed mode. Take your time on each question."}
            </p>
          </div>

          {/* Question Count Select */}
          <div className="config-group flex flex-col gap-2">
            <label className="config-label text-xs font-bold text-slate-400 uppercase tracking-wider">
              Questions per Quiz
            </label>
            <div className="count-selector-row grid grid-cols-3 gap-2">
              {[5, 10, "all"].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  className={`count-btn py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold border text-center transition-all cursor-pointer min-h-[42px] flex items-center justify-center touch-manipulation select-none active:scale-95 ${
                    questionCount === cnt
                      ? "bg-orange-500/20 border-orange-500 text-white font-bold"
                      : "bg-[#191b26] border-white/10 text-slate-300 hover:bg-[#202230]"
                  }`}
                  onClick={() => setQuestionCount(cnt)}
                >
                  {cnt === "all" ? "All Pool" : `${cnt} Qs`}
                </button>
              ))}
            </div>
          </div>

          {/* Ready indicator */}
          <div className="ready-indicator flex items-center gap-2 text-xs text-slate-400">
            <span className="indicator-dot w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>Ready with <strong className="text-white">{availableCount}</strong> curated questions</span>
          </div>

          {/* Start Working Button */}
          <button
            type="button"
            className="btn-start-working w-full py-3.5 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[52px] touch-manipulation select-none active:scale-[0.98]"
            onClick={onStart}
            autoFocus
          >
            <Play width={18} height={18} />
            <span>Start Working</span>
            <ChevronRight width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
