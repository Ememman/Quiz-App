import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { QuizLogo } from "./QuizLogo";
import {
  ArrowRotateLeft,
  Sliders,
  ArrowRightFromSquare,
  CircleCheck,
  CircleXmark,
  TriangleExclamation,
  Flame,
  Clock,
  ChevronDown,
  ChevronUp,
  Check,
  CrownDiamond,
  Thunderbolt,
  Rocket,
  GraduationCap,
} from "@gravity-ui/icons";
import sounds from "../utils/soundEffects";

export const ResultsScreen = ({
  score,
  results,
  totalQuestions,
  bestStreak,
  totalTimeSeconds,
  onRestart,
  onResetSettings,
}) => {
  const [filter, setFilter] = useState("all"); // 'all' | 'correct' | 'incorrect'
  const [copied, setCopied] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const correctCount = results.filter((r) => r.isCorrect).length;
  const incorrectCount = results.filter((r) => !r.isCorrect && !r.isTimedOut).length;
  const timedOutCount = results.filter((r) => r.isTimedOut).length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Performance Rank using Gravity UI Icons (NO EMOJIS)
  let rank = { title: "Code Apprentice", icon: GraduationCap };
  if (accuracy >= 90) {
    rank = { title: "Web Mastermind", icon: CrownDiamond };
  } else if (accuracy >= 75) {
    rank = { title: "Senior Architect", icon: Thunderbolt };
  } else if (accuracy >= 50) {
    rank = { title: "Proficient Developer", icon: Rocket };
  }

  const RankIcon = rank.icon;

  // Trigger confetti on mount if score is good (> 50%)
  useEffect(() => {
    sounds.playFanfare();

    if (accuracy >= 50) {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#F97316", "#FB923C", "#FBBF24", "#FFFFFF"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#EA580C", "#FF7A00", "#10B981", "#FFF2E8"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [accuracy]);

  const handleShare = () => {
    const text = `Quiz App Results: ${score} PTS (${accuracy}% Accuracy)\nPerformance: ${correctCount}/${totalQuestions} Correct | Streak: ${bestStreak} | Rank: ${rank.title}\nTested on Dark & Orange Quiz App`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const filteredResults = results.filter((r) => {
    if (filter === "correct") return r.isCorrect;
    if (filter === "incorrect") return !r.isCorrect;
    return true;
  });

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins > 0 ? `${mins}m ` : ""}${remaining}s`;
  };

  return (
    <div className="results-container max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6 animate-fade-in w-full">
      {/* Top Banner Card */}
      <div className="results-hero-card rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-[#1c1e2a]/90 to-[#12131c]/95 p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8 shadow-2xl text-center sm:text-left relative overflow-hidden">
        <div className="results-logo-badge w-16 h-16 sm:w-20 sm:h-20 shrink-0 drop-shadow-[0_0_16px_rgba(249,115,22,0.5)]">
          <QuizLogo className="w-full h-full" />
        </div>

        <div className="results-hero-info flex-1 flex flex-col items-center sm:items-start gap-1.5 sm:gap-2">
          <div className="rank-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/15 border border-orange-500/30 text-orange-400">
            <RankIcon width={14} height={14} className="text-orange-400" />
            <span>{rank.title}</span>
          </div>
          <h1 className="results-title text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Quiz Completed
          </h1>
          <p className="results-subtitle text-xs sm:text-sm text-slate-300">
            Here is your final score breakdown and comprehensive review.
          </p>
        </div>

        {/* Big Score Display */}
        <div className="results-score-dial shrink-0 flex flex-col items-center sm:items-end">
          <div className="score-number-display flex items-baseline gap-1">
            <span className="score-value text-4xl sm:text-5xl font-black text-orange-500 tracking-tight drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              {score}
            </span>
            <span className="score-units text-sm font-extrabold text-orange-300">
              PTS
            </span>
          </div>
          <div className="score-accuracy-sub text-xs sm:text-sm font-bold text-slate-300">
            {accuracy}% Accuracy
          </div>
        </div>
      </div>

      {/* Metrics Row (2 cols mobile, 5 cols desktop) */}
      <div className="metrics-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        <div className="metric-card rounded-xl border border-white/10 bg-[#0f1016] p-3 sm:p-4 flex items-center gap-3">
          <CircleCheck width={20} height={20} className="text-emerald-400 shrink-0" />
          <div className="metric-info flex flex-col">
            <span className="metric-num text-base sm:text-xl font-extrabold text-white">{correctCount}</span>
            <span className="metric-label text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Correct</span>
          </div>
        </div>

        <div className="metric-card rounded-xl border border-white/10 bg-[#0f1016] p-3 sm:p-4 flex items-center gap-3">
          <CircleXmark width={20} height={20} className="text-red-400 shrink-0" />
          <div className="metric-info flex flex-col">
            <span className="metric-num text-base sm:text-xl font-extrabold text-white">{incorrectCount}</span>
            <span className="metric-label text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Incorrect</span>
          </div>
        </div>

        {timedOutCount > 0 && (
          <div className="metric-card rounded-xl border border-white/10 bg-[#0f1016] p-3 sm:p-4 flex items-center gap-3">
            <TriangleExclamation width={20} height={20} className="text-amber-400 shrink-0" />
            <div className="metric-info flex flex-col">
              <span className="metric-num text-base sm:text-xl font-extrabold text-white">{timedOutCount}</span>
              <span className="metric-label text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Timed Out</span>
            </div>
          </div>
        )}

        <div className="metric-card rounded-xl border border-white/10 bg-[#0f1016] p-3 sm:p-4 flex items-center gap-3">
          <Flame width={20} height={20} className="text-orange-500 shrink-0" />
          <div className="metric-info flex flex-col">
            <span className="metric-num text-base sm:text-xl font-extrabold text-white">{bestStreak}</span>
            <span className="metric-label text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Streak</span>
          </div>
        </div>

        <div className="metric-card rounded-xl border border-white/10 bg-[#0f1016] p-3 sm:p-4 flex items-center gap-3 col-span-2 sm:col-span-1">
          <Clock width={20} height={20} className="text-orange-400 shrink-0" />
          <div className="metric-info flex flex-col">
            <span className="metric-num text-base sm:text-xl font-extrabold text-white">{formatTime(totalTimeSeconds)}</span>
            <span className="metric-label text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Time</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="results-actions-bar grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        <button
          type="button"
          className="btn-action-primary py-3.5 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer min-h-[50px] touch-manipulation select-none active:scale-[0.98]"
          onClick={onRestart}
        >
          <ArrowRotateLeft width={17} height={17} />
          <span>Play Again</span>
        </button>

        <button
          type="button"
          className="btn-action-secondary py-3.5 px-5 rounded-xl bg-[#14151e] border border-white/10 hover:border-orange-500/40 text-slate-200 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[50px] touch-manipulation select-none active:scale-[0.98]"
          onClick={onResetSettings}
        >
          <Sliders width={17} height={17} />
          <span>Settings</span>
        </button>

        <button
          type="button"
          className="btn-action-share py-3.5 px-5 rounded-xl bg-[#14151e] border border-white/10 hover:border-orange-500/40 text-slate-200 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[50px] touch-manipulation select-none active:scale-[0.98]"
          onClick={handleShare}
        >
          {copied ? <Check width={17} height={17} className="text-emerald-400" /> : <ArrowRightFromSquare width={17} height={17} />}
          <span>{copied ? "Copied Results" : "Share Results"}</span>
        </button>
      </div>

      {/* Detailed Review Section */}
      <div className="results-review-card rounded-2xl border border-white/10 bg-[#14151e]/85 backdrop-blur-md p-4 sm:p-7 flex flex-col gap-4 shadow-xl">
        <div className="review-header-bar flex flex-wrap items-center justify-between gap-3">
          <h2 className="review-section-title text-base sm:text-lg font-bold text-white">
            Question Review ({results.length})
          </h2>

          <div className="filter-pills flex flex-wrap gap-1.5">
            <button
              type="button"
              className={`filter-btn px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-orange-500/20 border-orange-500 text-white"
                  : "bg-[#191b26] border-white/10 text-slate-400 hover:text-white"
              }`}
              onClick={() => setFilter("all")}
            >
              All ({results.length})
            </button>
            <button
              type="button"
              className={`filter-btn px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                filter === "correct"
                  ? "bg-emerald-500/20 border-emerald-500 text-white"
                  : "bg-[#191b26] border-white/10 text-slate-400 hover:text-white"
              }`}
              onClick={() => setFilter("correct")}
            >
              Correct ({correctCount})
            </button>
            <button
              type="button"
              className={`filter-btn px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                filter === "incorrect"
                  ? "bg-red-500/20 border-red-500 text-white"
                  : "bg-[#191b26] border-white/10 text-slate-400 hover:text-white"
              }`}
              onClick={() => setFilter("incorrect")}
            >
              Missed ({incorrectCount + timedOutCount})
            </button>
          </div>
        </div>

        <div className="review-list flex flex-col gap-2.5 sm:gap-3">
          {filteredResults.map((item, idx) => {
            const isExpanded =
              expandedId === item.question.id || filter !== "all";

            return (
              <div
                key={item.question.id}
                className={`review-item rounded-xl border overflow-hidden transition-all ${
                  item.isCorrect
                    ? "bg-[#0f1016] border-emerald-500/40 border-l-4 border-l-emerald-500"
                    : item.isTimedOut
                    ? "bg-[#0f1016] border-amber-500/40 border-l-4 border-l-amber-500"
                    : "bg-[#0f1016] border-red-500/40 border-l-4 border-l-red-500"
                }`}
              >
                <div
                  className="review-item-header p-3 sm:p-4 flex items-start gap-3 cursor-pointer hover:bg-white/[0.02]"
                  onClick={() =>
                    setExpandedId(
                      expandedId === item.question.id ? null : item.question.id
                    )
                  }
                >
                  <div className="review-status-col mt-0.5 shrink-0">
                    {item.isCorrect ? (
                      <CircleCheck width={18} height={18} className="text-emerald-400" />
                    ) : item.isTimedOut ? (
                      <TriangleExclamation width={18} height={18} className="text-amber-400" />
                    ) : (
                      <CircleXmark width={18} height={18} className="text-red-400" />
                    )}
                  </div>

                  <div className="review-title-col flex-1 flex flex-col gap-1">
                    <div className="review-meta-line flex flex-wrap items-center gap-1.5">
                      <span className="q-badge text-xs font-bold text-slate-500">Q{idx + 1}</span>
                      <span className="cat-badge text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400">
                        {item.question.category}
                      </span>
                      <span className="diff-badge text-[10px] text-slate-500">
                        {item.question.difficulty}
                      </span>
                      {item.isTimedOut && (
                        <span className="timeout-badge text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          Timed Out (-1 pt)
                        </span>
                      )}
                    </div>
                    <p className="review-question-text text-xs sm:text-sm font-semibold text-slate-200">
                      {item.question.question}
                    </p>
                  </div>

                  <div className="review-toggle-col text-slate-500 shrink-0">
                    {isExpanded ? <ChevronUp width={16} height={16} /> : <ChevronDown width={16} height={16} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="review-details bg-[#0a0b0e] border-t border-white/5 p-3.5 sm:p-4 flex flex-col gap-3 animate-fade-in text-xs sm:text-sm">
                    {/* Answers comparison */}
                    <div className="answers-comparison-box flex flex-col gap-1.5">
                      <div className="answer-row flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                        <span className="answer-label text-slate-400 font-semibold sm:w-28 shrink-0">Your Answer:</span>
                        <span
                          className={`answer-value font-medium ${
                            item.isCorrect
                              ? "text-emerald-400"
                              : item.isTimedOut
                              ? "text-amber-400"
                              : "text-red-400"
                          }`}
                        >
                          {item.isTimedOut
                            ? "No answer chosen (Time expired)"
                            : item.question.options[item.selectedAnswerIndex]}
                        </span>
                      </div>

                      {!item.isCorrect && (
                        <div className="answer-row flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                          <span className="answer-label text-slate-400 font-semibold sm:w-28 shrink-0">Correct Answer:</span>
                          <span className="answer-value text-emerald-400 font-bold">
                            {item.question.options[item.question.correctIndex]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    <div className="review-explanation rounded-lg bg-[#14151e] border border-white/5 p-3 text-slate-300 leading-relaxed">
                      <strong className="block text-orange-400 font-bold mb-1">Concept Explanation:</strong>
                      <p>{item.question.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
