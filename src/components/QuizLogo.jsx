import * as React from "react";

/**
 * @typedef {React.SVGProps<SVGSVGElement> & {
 *   variant?: "badge" | "glyph";
 *   size?: number | string;
 * }} LogoProps
 */

export const QuizLogo = ({
  variant = "glyph",
  className = "w-full h-full",
  size,
  style,
  ...props
}) => {
  const customStyle = {
    ...style,
    ...(size ? { width: size, height: size } : {}),
  };

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={customStyle}
      {...props}
    >
      <defs>
        {/* Background gradient for badge variant */}
        <radialGradient
          id="quiz-badge-bg"
          cx="50%"
          cy="30%"
          r="80%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22232E" />
          <stop offset="60%" stopColor="#14151C" />
          <stop offset="100%" stopColor="#0B0C10" />
        </radialGradient>

        {/* Main circular ribbon - Dark Charcoal into Fiery Orange and Glowing Amber */}
        <linearGradient
          id="quiz-ring"
          x1="12"
          y1="15"
          x2="90"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFF2E8" />
          <stop offset="16%" stopColor="#FB923C" />
          <stop offset="40%" stopColor="#EA580C" />
          <stop offset="65%" stopColor="#7C2D12" />
          <stop offset="84%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>

        {/* Inner Q loop - Bright white apex down into glowing peach, orange and deep ember */}
        <linearGradient
          id="quiz-q"
          x1="32"
          y1="25"
          x2="72"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="22%" stopColor="#FED7AA" />
          <stop offset="50%" stopColor="#FB923C" />
          <stop offset="78%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        {/* Ring specular highlight */}
        <linearGradient
          id="quiz-highlight"
          x1="20"
          y1="10"
          x2="75"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Q lower tail ribbon - Brilliant golden amber down into electric fiery orange */}
        <linearGradient
          id="quiz-tail"
          x1="42"
          y1="56"
          x2="88"
          y2="78"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="28%" stopColor="#FBBF24" />
          <stop offset="68%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <filter
          id="quiz-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="4"
            floodColor="#000000"
            floodOpacity="0.65"
          />
        </filter>

        <filter
          id="inner-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2.5"
            floodColor="#431407"
            floodOpacity="0.6"
          />
        </filter>
      </defs>

      {/* ========================= */}
      {/* BADGE BACKGROUND (OPTIONAL) */}
      {/* ========================= */}
      {variant === "badge" && (
        <g>
          <rect
            x="3"
            y="3"
            width="94"
            height="94"
            rx="24"
            fill="url(#quiz-badge-bg)"
            stroke="#2F3040"
            strokeWidth="1.5"
          />
          <rect
            x="4"
            y="4"
            width="92"
            height="46"
            rx="22"
            fill="#FFFFFF"
            fillOpacity="0.03"
          />
        </g>
      )}

      {/* ========================= */}
      {/* OUTER CIRCULAR RIBBON     */}
      {/* ========================= */}
      <g filter="url(#quiz-shadow)">
        <path
          d="
            M 77 21
            C 91 33
              96 52
              89 69
            C 82 87
              63 95
              44 91
            C 25 88
              10 73
              8 54
            C 6 35
              17 18
              34 11
            C 50 4
              68 9
              77 21
          "
          stroke="url(#quiz-ring)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* subtle top light */}
        <path
          d="
            M 18 29
            C 30 10
              58 5
              77 21
          "
          stroke="url(#quiz-highlight)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* ========================= */}
      {/* INNER Q RIBBON            */}
      {/* ========================= */}
      <g filter="url(#inner-shadow)">
        {/* Main Q Loop */}
        <path
          d="
            M 50 25
            C 63 25
              73 35
              73 48
            C 73 61
              63 71
              50 71
            C 37 71
              27 61
              27 48
            C 27 35
              37 25
              50 25
          "
          stroke="url(#quiz-q)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Flowing lower Q Tail */}
        <path
          d="
            M 42 55
            C 50 62
              59 70
              68 76
            C 75 80
              82 80
              87 69
          "
          stroke="url(#quiz-tail)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner highlight curve */}
        <path
          d="
            M 35 38
            C 38 31
              44 28
              50 28
            C 56 28
              62 31
              65 38
          "
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </g>

      {/* ========================= */}
      {/* OVERLAP EFFECT            */}
      {/* ========================= */}
      <path
        d="
          M 60 74
          C 69 80
            79 79
            86 68
        "
        stroke="#FB923C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
    </svg>
  );
};

export const QLogo = QuizLogo;
export const DaymarkLogo = QuizLogo;
export const TaskLogo = QuizLogo;

export const QUIZ_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><defs><linearGradient id="quiz-ring" x1="12" y1="15" x2="90" y2="88" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FFF2E8"/><stop offset="16%" stop-color="#FB923C"/><stop offset="40%" stop-color="#EA580C"/><stop offset="65%" stop-color="#7C2D12"/><stop offset="84%" stop-color="#C2410C"/><stop offset="100%" stop-color="#F97316"/></linearGradient><linearGradient id="quiz-q" x1="32" y1="25" x2="72" y2="75" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="22%" stop-color="#FED7AA"/><stop offset="50%" stop-color="#FB923C"/><stop offset="78%" stop-color="#F97316"/><stop offset="100%" stop-color="#C2410C"/></linearGradient><linearGradient id="quiz-highlight" x1="20" y1="10" x2="75" y2="75" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/><stop offset="35%" stop-color="#FFFFFF" stop-opacity="0.15"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient><linearGradient id="quiz-tail" x1="42" y1="56" x2="88" y2="78" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FEF08A"/><stop offset="28%" stop-color="#FBBF24"/><stop offset="68%" stop-color="#F97316"/><stop offset="100%" stop-color="#EA580C"/></linearGradient><filter id="quiz-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.65"/></filter><filter id="inner-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#431407" flood-opacity="0.6"/></filter></defs><g filter="url(#quiz-shadow)"><path d="M 77 21 C 91 33 96 52 89 69 C 82 87 63 95 44 91 C 25 88 10 73 8 54 C 6 35 17 18 34 11 C 50 4 68 9 77 21" stroke="url(#quiz-ring)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><path d="M 18 29 C 30 10 58 5 77 21" stroke="url(#quiz-highlight)" stroke-width="3" stroke-linecap="round"/></g><g filter="url(#inner-shadow)"><path d="M 50 25 C 63 25 73 35 73 48 C 73 61 63 71 50 71 C 37 71 27 61 27 48 C 27 35 37 25 50 25" stroke="url(#quiz-q)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M 42 55 C 50 62 59 70 68 76 C 75 80 82 80 87 69" stroke="url(#quiz-tail)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M 35 38 C 38 31 44 28 50 28 C 56 28 62 31 65 38" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-opacity="0.6"/></g><path d="M 60 74 C 69 80 79 79 86 68" stroke="#FB923C" stroke-width="2" stroke-linecap="round" stroke-opacity="0.45"/></svg>`;

export const QUIZ_FAVICON_DATA_URI = `data:image/svg+xml,${encodeURIComponent(QUIZ_LOGO_SVG)}`;

export const DAYMARK_LOGO_SVG = QUIZ_LOGO_SVG;
export const DAYMARK_FAVICON_DATA_URI = QUIZ_FAVICON_DATA_URI;

export default QuizLogo;
