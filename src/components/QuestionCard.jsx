import React, { useState, useEffect } from "react";
import {
  Clock,
  CircleCheck,
  CircleXmark,
  TriangleExclamation,
  Bulb,
  ArrowRight,
  Code,
  Copy,
  Check,
} from "@gravity-ui/icons";

export const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  timerEnabled,
  timeRemaining,
  isTimedOut,
  selectedAnswerIndex,
  hasAnswered,
  onNext,
  isLastQuestion,
}) => {
  const [copied, setCopied] = useState(false);

  // Copy code snippet to clipboard
  const handleCopyCode = () => {
    if (!question.codeSnippet) return;
    navigator.clipboard.writeText(question.codeSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const progressPercentage = Math.round(
    ((currentIndex + 1) / totalQuestions) * 100
  );

  // Keyboard shortcut listener for options (1-4 or A-D) and Enter for Next
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!hasAnswered && !isTimedOut) {
        if (e.key === "1" || e.key.toLowerCase() === "a") onAnswer(0);
        else if (e.key === "2" || e.key.toLowerCase() === "b") onAnswer(1);
        else if (e.key === "3" || e.key.toLowerCase() === "c") onAnswer(2);
        else if (e.key === "4" || e.key.toLowerCase() === "d") onAnswer(3);
      } else if (hasAnswered || isTimedOut) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasAnswered, isTimedOut, onAnswer, onNext]);

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="question-card-wrapper max-w-3xl mx-auto flex flex-col gap-3 sm:gap-4 animate-fade-in w-full">
      {/* Top Progress & HUD bar */}
      <div className="card-top-hud flex flex-wrap items-center justify-between gap-2.5">
        <div className="hud-meta-left flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="question-counter text-xs sm:text-sm text-slate-300">
            Question <strong className="text-white font-bold">{currentIndex + 1}</strong> of {totalQuestions}
          </span>
          <span className="badge-tag text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
            {question.category}
          </span>
          <span className="badge-diff text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-[#191b26] text-slate-400 border border-white/10">
            {question.difficulty}
          </span>
        </div>

        {/* 60-Second Timer Gauge */}
        {timerEnabled && (
          <div
            className={`timer-gauge flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border transition-all ${
              timeRemaining <= 10 && !hasAnswered
                ? "bg-red-500/15 border-red-500/50 text-red-400 animate-pulse"
                : isTimedOut
                ? "bg-amber-500/15 border-amber-500/50 text-amber-400"
                : "bg-[#14151e] border-white/10 text-white"
            }`}
            title="Time remaining for this question"
          >
            <Clock width={14} height={14} className={timeRemaining <= 10 && !hasAnswered ? "text-red-400" : "text-orange-500"} />
            <span className="timer-digits font-mono font-bold">
              {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}s
            </span>
            <div className="timer-linear-track w-10 sm:w-14 h-1.5 bg-[#272a38] rounded-full overflow-hidden">
              <div
                className={`timer-linear-fill h-full rounded-full transition-all duration-1000 ${
                  timeRemaining <= 10 && !hasAnswered ? "bg-red-500" : "bg-gradient-to-r from-orange-500 to-orange-400"
                }`}
                style={{
                  width: `${(timeRemaining / 60) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="question-progress-bar w-full h-1.5 bg-[#14151e] rounded-full overflow-hidden border border-white/5">
        <div
          className="progress-fill h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="question-main-card rounded-2xl border border-white/10 bg-[#14151e]/85 backdrop-blur-md p-4 sm:p-7 shadow-2xl flex flex-col gap-4 sm:gap-6">
        {/* Timeout Banner if time ran out */}
        {isTimedOut && !hasAnswered && (
          <div className="timeout-alert-banner bg-amber-500/15 border border-amber-500/40 text-amber-300 p-3 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-shake">
            <TriangleExclamation width={17} height={17} className="shrink-0" />
            <span>Time expired! Score decremented by 1 point.</span>
          </div>
        )}

        {/* Question Statement */}
        <h2 className="question-text text-base sm:text-xl lg:text-2xl font-bold text-white leading-snug">
          {question.question}
        </h2>

        {/* Code Snippet Block */}
        {question.codeSnippet && (
          <div className="code-block-container rounded-xl overflow-hidden border border-[#232532] bg-[#090a0e]">
            <div className="code-header bg-[#12141c] px-3 py-1.5 flex items-center justify-between border-b border-[#232532]">
              <div className="code-header-left flex items-center gap-1.5">
                <span className="code-dot red w-2 h-2 rounded-full bg-red-500" />
                <span className="code-dot yellow w-2 h-2 rounded-full bg-amber-500" />
                <span className="code-dot green w-2 h-2 rounded-full bg-emerald-500" />
                <span className="code-lang ml-1.5 text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Code width={12} height={12} />
                  <span>Code Snippet</span>
                </span>
              </div>
              <button
                type="button"
                className="code-copy-btn text-[11px] text-slate-400 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                onClick={handleCopyCode}
                title="Copy code"
              >
                {copied ? <Check width={12} height={12} className="text-emerald-400" /> : <Copy width={12} height={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="code-content p-3 sm:p-4 text-xs sm:text-sm font-mono text-orange-200 overflow-x-auto leading-relaxed">
              <code>{question.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Answer Options Buttons */}
        <div className="options-grid flex flex-col gap-2.5 sm:gap-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswerIndex === idx;
            const isCorrect = idx === question.correctIndex;
            const showFeedback = hasAnswered || isTimedOut;

            let buttonClass = "option-btn w-full p-3 sm:p-4 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer min-h-[52px] relative touch-manipulation select-none active:scale-[0.99] ";
            if (showFeedback) {
              if (isCorrect) {
                buttonClass += "bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/20";
              } else if (isSelected && !isCorrect) {
                buttonClass += "bg-red-500/15 border-red-500 text-white shadow-lg shadow-red-500/20";
              } else {
                buttonClass += "bg-[#14151e]/50 border-white/5 opacity-40 cursor-default text-slate-400";
              }
            } else {
              buttonClass += "bg-[#191b26] border-white/10 hover:border-orange-500/50 hover:bg-[#202230] text-slate-200 hover:text-white";
            }

            return (
              <button
                key={idx}
                type="button"
                className={buttonClass}
                onClick={() => onAnswer(idx)}
                disabled={showFeedback}
                aria-pressed={isSelected}
              >
                <div
                  className={`option-letter-badge w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 border transition-all ${
                    showFeedback && isCorrect
                      ? "bg-emerald-500 border-emerald-400 text-white"
                      : showFeedback && isSelected && !isCorrect
                      ? "bg-red-500 border-red-400 text-white"
                      : "bg-[#14151e] border-white/10 text-slate-400"
                  }`}
                >
                  {optionLetters[idx]}
                </div>

                <div className="option-text flex-1 text-xs sm:text-base font-medium leading-snug break-words">
                  {option}
                </div>

                {/* Instant Feedback Badges */}
                {showFeedback && (
                  <div className="feedback-status-badge shrink-0">
                    {isCorrect ? (
                      <span className="status-label status-correct inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <CircleCheck width={13} height={13} />
                        <span className="hidden xs:inline">{isSelected ? "Correct" : "Correct Answer"}</span>
                      </span>
                    ) : isSelected ? (
                      <span className="status-label status-incorrect inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                        <CircleXmark width={13} height={13} />
                        <span className="hidden xs:inline">Incorrect</span>
                      </span>
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {(hasAnswered || isTimedOut) && (
          <div className="explanation-drawer rounded-xl border border-orange-500/30 bg-gradient-to-br from-[#1e1812]/70 to-[#14161f]/80 p-3.5 sm:p-5 flex flex-col gap-1.5 animate-fade-in shadow-lg">
            <div className="explanation-header flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-400">
              <Bulb width={16} height={16} className="text-orange-500 shrink-0" />
              <span>Explanation & Key Concept</span>
            </div>
            <p className="explanation-text text-xs sm:text-sm text-slate-300 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Bottom Actions Row (Stacked on mobile, row on tablet/desktop) */}
        {(hasAnswered || isTimedOut) && (
          <div className="card-actions-row flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 animate-fade-in">
            <div className="shortcut-hint text-center sm:text-left text-xs text-slate-500">
              Press <kbd className="px-1.5 py-0.5 rounded bg-[#191b26] border border-white/10 text-slate-300 font-mono text-[11px]">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-[#191b26] border border-white/10 text-slate-300 font-mono text-[11px]">Space</kbd> to continue
            </div>

            <button
              type="button"
              className="btn-next-question w-full sm:w-auto py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[50px] touch-manipulation select-none active:scale-[0.98]"
              onClick={onNext}
              autoFocus
            >
              <span>{isLastQuestion ? "View Final Results" : "Next Question"}</span>
              <ArrowRight width={17} height={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
