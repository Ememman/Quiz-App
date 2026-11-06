import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Code2,
  Copy,
  Check,
} from "lucide-react";

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
    <div className="question-card-wrapper">
      {/* Top Progress & HUD bar */}
      <div className="card-top-hud">
        <div className="hud-meta-left">
          <span className="question-counter">
            Question <strong>{currentIndex + 1}</strong> of {totalQuestions}
          </span>
          <span className="badge-tag">{question.category}</span>
          <span className="badge-diff">{question.difficulty}</span>
        </div>

        {/* 60-Second Timer Gauge */}
        {timerEnabled && (
          <div
            className={`timer-gauge ${
              timeRemaining <= 10 && !hasAnswered ? "timer-warning" : ""
            } ${isTimedOut ? "timer-expired" : ""}`}
            title="Time remaining for this question"
          >
            <Clock size={16} className="timer-icon" />
            <span className="timer-digits">
              {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}s
            </span>
            <div className="timer-linear-track">
              <div
                className="timer-linear-fill"
                style={{
                  width: `${(timeRemaining / 60) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="question-progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Question Card Box */}
      <div className="question-main-card">
        {/* Timeout Banner if time ran out */}
        {isTimedOut && !hasAnswered && (
          <div className="timeout-alert-banner">
            <AlertTriangle size={18} />
            <span>Time expired! Score decremented by 1 point.</span>
          </div>
        )}

        {/* Question Statement */}
        <h2 className="question-text">{question.question}</h2>

        {/* Optional Code Snippet Block */}
        {question.codeSnippet && (
          <div className="code-block-container">
            <div className="code-header">
              <div className="code-header-left">
                <span className="code-dot red" />
                <span className="code-dot yellow" />
                <span className="code-dot green" />
                <span className="code-lang">
                  <Code2 size={13} /> Code Snippet
                </span>
              </div>
              <button
                type="button"
                className="code-copy-btn"
                onClick={handleCopyCode}
                title="Copy code"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="code-content">
              <code>{question.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Answer Options Buttons */}
        <div className="options-grid">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswerIndex === idx;
            const isCorrect = idx === question.correctIndex;
            const showFeedback = hasAnswered || isTimedOut;

            let buttonClass = "option-btn";
            if (showFeedback) {
              if (isCorrect) {
                buttonClass += " option-correct";
              } else if (isSelected && !isCorrect) {
                buttonClass += " option-incorrect";
              } else {
                buttonClass += " option-muted";
              }
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
                <div className="option-letter-badge">
                  {optionLetters[idx]}
                </div>

                <div className="option-text">{option}</div>

                {/* Instant Feedback Badges */}
                {showFeedback && (
                  <div className="feedback-status-badge">
                    {isCorrect ? (
                      <span className="status-label status-correct">
                        <CheckCircle size={16} />
                        {isSelected ? "Correct!" : "Correct Answer"}
                      </span>
                    ) : isSelected ? (
                      <span className="status-label status-incorrect">
                        <XCircle size={16} /> Incorrect
                      </span>
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card (Appears after answer / timeout) */}
        {(hasAnswered || isTimedOut) && (
          <div className="explanation-drawer animate-fade-in">
            <div className="explanation-header">
              <Lightbulb size={18} className="text-orange" />
              <span>Explanation & Key Concept</span>
            </div>
            <p className="explanation-text">{question.explanation}</p>
          </div>
        )}

        {/* Bottom Actions Row */}
        {(hasAnswered || isTimedOut) && (
          <div className="card-actions-row animate-fade-in">
            <div className="shortcut-hint">
              Press <kbd>Enter</kbd> or <kbd>Space</kbd> to continue
            </div>

            <button
              type="button"
              className="btn-next-question"
              onClick={onNext}
              autoFocus
            >
              <span>{isLastQuestion ? "View Final Results" : "Next Question"}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
