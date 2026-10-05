import React from "react";

// Minimal inline SVG icon set — no external dependencies.

const base = (props) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...props,
});

export const IconStar = (p) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M12 2l2.9 6.26 6.6.56-5 4.36 1.5 6.45L12 16.9 5.99 19.63l1.5-6.45-5-4.36 6.6-.56L12 2z" />
  </svg>
);

export const IconHome = (p) => (
  <svg {...base(p)}>
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9 21v-6h6v6" />
  </svg>
);

export const IconBook = (p) => (
  <svg {...base(p)}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z" />
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
  </svg>
);

export const IconCards = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="14" height="16" rx="2" />
    <path d="M7 5V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-1" />
  </svg>
);

export const IconTarget = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
  </svg>
);

export const IconFlame = (p) => (
  <svg {...base(p)}>
    <path d="M12 22c4.4 0 7.5-3 7.5-7.2 0-3.1-1.9-5.3-3.6-7C14.3 6.2 13 4.6 13 2c-3 2-4.5 4.3-5.3 6.6C6.4 9.4 4.5 11.4 4.5 14.8 4.5 19 7.6 22 12 22z" />
  </svg>
);

export const IconChart = (p) => (
  <svg {...base(p)}>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-5 3 3 5-7" />
  </svg>
);

export const IconArrowRight = (p) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = (p) => (
  <svg {...base(p)}>
    <path d="M19 12H5" />
    <path d="M11 18l-6-6 6-6" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...base(p)} strokeWidth={2.6}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const IconX = (p) => (
  <svg {...base(p)} strokeWidth={2.6}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconSearch = (p) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const IconTrophy = (p) => (
  <svg {...base(p)}>
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v6a5 5 0 0 1-10 0V4z" />
    <path d="M7 6H4a1 1 0 0 0-1 1c0 2.5 2 4 4 4" />
    <path d="M17 6h3a1 1 0 0 1 1 1c0 2.5-2 4-4 4" />
  </svg>
);

export const IconRotate = (p) => (
  <svg {...base(p)}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </svg>
);

export const IconEye = (p) => (
  <svg {...base(p)}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconShuffle = (p) => (
  <svg {...base(p)}>
    <path d="M16 3h5v5" />
    <path d="M4 20L21 3" />
    <path d="M21 16v5h-5" />
    <path d="M15 15l6 6" />
    <path d="M4 4l5 5" />
  </svg>
);

export const IconChevronDown = (p) => (
  <svg {...base(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconClock = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconSparkle = (p) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);

export const IconList = (p) => (
  <svg {...base(p)}>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" strokeWidth={3.2} />
  </svg>
);
