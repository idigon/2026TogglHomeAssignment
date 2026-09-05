/**
 * Icons.
 *
 * The Projects-view glyphs are Toggl's own: 16x16 solid shapes filled with
 * `currentColor`, lifted verbatim from the live app rather than redrawn as
 * outlines. The handful of line icons at the bottom belong to the older
 * Reports view and are still hand-drawn on a 24x24 grid.
 */

type IconProps = {
  size?: number;
  className?: string;
};

/** Toggl's icon frame: 16x16, solid, no stroke. */
const solid = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

/** The older Reports icons are outlines on a 24x24 grid. */
const line = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ---------- chevrons ---------- */

export const ChevronDown = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.293 6.792a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.414 0L8 8.67l3.293-3.292a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 0 1.414l-4 4.001a1 1 0 0 1-1.414 0z"
    />
  </svg>
);

export const ChevronLeft = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.208 3.293a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 0 1.414L7.33 8l3.292 3.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.414 0l-4.001-4a1 1 0 0 1 0-1.414z"
    />
  </svg>
);

export const ChevronRight = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.792 12.707a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1 0-1.414L8.67 8 5.378 4.707a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.414 0l4.001 4a1 1 0 0 1 0 1.414z"
    />
  </svg>
);

/* ---------- sidebar nav ---------- */

export const Clock = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m0 2-.117.007A1 1 0 0 0 7 3.003v4.894l.001.052L7 8c0 .556.448 1 1 1h3c.556 0 1-.448 1-1l-.007-.117A.997.997 0 0 0 11 7H9V3.003c0-.51-.386-.938-.883-.996z"
    />
  </svg>
);

export const Doc = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.406 1.024c.97 0 1.755.783 1.755 1.745v10.51a1.75 1.75 0 0 1-1.755 1.745h-8.74c-.969 0-1.755-.783-1.755-1.745V2.77a1.75 1.75 0 0 1 1.755-1.745zm-.866 7H4.532a.88.88 0 0 0-.87.875c0 .487.39.875.87.875h7.008a.88.88 0 0 0 .871-.875l-.005-.103a.87.87 0 0 0-.866-.772m0-2.625H4.532a.88.88 0 0 0-.87.875c0 .487.39.875.87.875h7.008a.88.88 0 0 0 .871-.875l-.005-.103a.87.87 0 0 0-.866-.772m0-2.625H4.532a.88.88 0 0 0-.87.875c0 .487.39.875.87.875h7.008a.88.88 0 0 0 .871-.875l-.005-.103a.87.87 0 0 0-.866-.772"
    />
  </svg>
);

export const Folder = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16 7v4.994A2 2 0 0 1 14.006 14H1.994A1.993 1.993 0 0 1 0 11.994V7zM5.055 1c1.056 0 1.921.815 1.998 1.85l.005.15h6.935c1.058 0 1.925.815 2.002 1.85L16 5H0V3a2 2 0 0 1 2.004-2z"
    />
  </svg>
);

export const Tasks = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m1 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zM8 2a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.23 8.949a1 1 0 0 1-1.54.155L.706 8.12A1 1 0 1 1 2.12 6.706l.261.261 1.412-1.411A1 1 0 1 1 5.208 6.97z"
    />
    <rect x="1" y="12" width="3" height="2" rx="1" fill="currentColor" />
    <rect x="1" y="2" width="3" height="2" rx="1" fill="currentColor" />
  </svg>
);

export const Timeline = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zM0 11a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"
    />
  </svg>
);

export const Members = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 0C5.68 0 3.8 2 3.8 4c0 2.667 2.1 3.333 2.1 4.667 0 1.94-4.616 1.37-4.888 4.992L1 14c0 1.105.94 2 2.096 2h9.808c1.09 0 1.985-.8 2.086-1.809L15 14c0-4-4.9-3.333-4.9-5.333 0-1.334 2.1-2 2.1-4.667 0-2-1.88-4-4.2-4"
    />
  </svg>
);

export const Approvals = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14M6.845 9.43l3.323-4.985a1 1 0 0 1 1.664 1.11l-4 6a1 1 0 0 1-1.54.152l-2.5-2.5a1 1 0 0 1 1.415-1.414z"
    />
  </svg>
);

export const TimeOff = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.433 1.996q.12.217.207.451c1.179-.652 2.482-.738 3.616-.285 1.814.726 2.943 2.727 2.446 5.312a.9.9 0 0 1-.15.352.9.9 0 0 1-.28.253.83.83 0 0 1-.721.044L9.528 6.45c.541 2.007.596 4.05.505 5.658a23 23 0 0 1-.448 3.362.9.9 0 0 1-.303.484.85.85 0 0 1-.524.193H6.629a.8.8 0 0 1-.414-.111.87.87 0 0 1-.31-.308.91.91 0 0 1-.038-.86c.387-.805.642-1.699.838-2.571.324-1.441.508-3.274.092-5.114l-4.612 3.08a.83.83 0 0 1-1.143-.218.9.9 0 0 1-.16-.405c-.32-2.383.61-4.504 2.188-5.62q.11-.076.222-.148L1.66 3.268a.85.85 0 0 1-.351-.247.918.918 0 0 1 .035-1.212C2.837.26 4.874-.175 6.473.38c.805.28 1.521.819 1.96 1.617"
    />
  </svg>
);

export const Star = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth={1.5}
      d="M8.005 12.279 3.678 14.5l.827-4.704L1 6.464l4.837-.684L8 1.5l2.163 4.28L15 6.464l-3.505 3.332.827 4.704z"
    />
  </svg>
);

/* ---------- sidebar rail and footer ---------- */

export const Collapse = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 13.667v-1.334h11.54v1.334zm15.046-1.156-4.194-4.2 4.172-4.178.954.956L12.76 8.31 16 11.556zM0 8.956V7.622h8.877v1.334zm0-4.623V3h11.54v1.333z"
    />
  </svg>
);

export const Bell = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.375 14h1.626a2 2 0 0 1-4 0zM8.001 0a1 1 0 0 1 1 .99V2.1c2.283.462 4 2.476 4 4.894v1.003c0 .554.2 1.401.444 1.89l1.112 2.225c.246.49-.006.888-.562.888H2.008c-.556 0-.808-.398-.563-.888l1.112-2.224c.246-.49.444-1.326.444-1.89V6.993a5 5 0 0 1 4-4.894V.99c0-.507.383-.926.883-.983z"
    />
  </svg>
);

export const Send = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.258.128.448 8.25a.91.91 0 0 0 .124 1.628l2.723 1.089 7.648-6.47c.416-.352.979.207.63.626L5.85 11.99l-.821.984a.78.78 0 0 0-.18.496v1.848a.776.776 0 0 0 1.325.548L8.85 13.19l3.906 1.562a.91.91 0 0 0 1.24-.731L15.62 1.025a.91.91 0 0 0-1.363-.897"
    />
  </svg>
);

export const Help = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m8 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7.125 6v-.002a.4.4 0 0 1 .106-.082c.162-.092.439-.166.769-.166s.607.074.769.166a.4.4 0 0 1 .106.082.5.5 0 0 1-.084.134 4.4 4.4 0 0 1-.444.445l-.089.083c-.404.375-1.133 1.051-1.133 2.09a.875.875 0 1 0 1.75 0c0-.193.12-.385.595-.828l.07-.064c.188-.173.43-.397.622-.639.228-.288.463-.695.463-1.219 0-.78-.476-1.311-.988-1.603C9.143 4.114 8.545 4 8 4s-1.143.114-1.637.397c-.512.292-.988.823-.988 1.603a.875.875 0 1 0 1.75 0"
    />
  </svg>
);

export const Download = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9 7h2.002c.55 0 .734.36.407.812L8.59 11.688c-.326.449-.853.451-1.18 0L4.59 7.813C4.262 7.363 4.451 7 4.995 7H7V1a1 1 0 0 1 2 0zm-8 9a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2z"
    />
  </svg>
);

export const Settings = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m.3-11c.387 0 .8.298.922.666l.533 1.595q.556.17 1.063.44l1.504-.751c.346-.173.85-.093 1.122.18l.425.426c.274.273.354.775.181 1.122l-.752 1.504q.27.506.442 1.064l1.594.532c.367.122.666.535.666.922v.6c0 .387-.298.8-.666.922l-1.595.533q-.17.556-.44 1.063l.751 1.504c.173.346.092.85-.18 1.122l-.426.425c-.273.274-.775.354-1.122.181l-1.504-.752q-.506.27-1.063.441l-.533 1.595C9.1 15.701 8.687 16 8.3 16h-.602c-.386 0-.798-.298-.92-.666l-.533-1.594a6 6 0 0 1-1.064-.442l-1.504.752c-.346.173-.85.092-1.122-.18l-.425-.426c-.274-.273-.354-.775-.181-1.122l.752-1.504a6 6 0 0 1-.442-1.064L.666 9.222C.299 9.1 0 8.687 0 8.3v-.602c0-.386.298-.798.666-.92l1.595-.534q.17-.556.44-1.063L1.95 3.678c-.173-.346-.093-.85.18-1.122l.426-.425c.273-.274.775-.354 1.122-.181l1.504.752q.506-.27 1.064-.442L6.778.666C6.9.299 7.313 0 7.7 0z"
    />
  </svg>
);

/** The Toggl mark: a 24px disc with the power glyph knocked through it. */
export const Power = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      fill="currentColor"
      d="M5.5 12.3027C5.5 15.6957 8.60838 18.5 12 18.5C15.393 18.5 18.5007 15.695 18.5 12.302C18.5 9.47108 16.5 7 14 6.5V8.25C15.6532 8.89874 16.75 10.4191 16.75 12.3027C16.75 14.7594 14.5 16.75 12 16.75C9.5 16.75 7.25 14.7594 7.25 12.3027C7.25 10.4198 8.34478 8.89874 10 8.25V6.5C7.5 7 5.5 9.47108 5.5 12.3027Z"
    />
    <path fill="currentColor" d="M13 13V4H11V13H13Z" />
  </svg>
);

/* ---------- toolbar ---------- */

export const Plus = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 2c.552 0 1 .456 1 1.002V7h3.998a1 1 0 0 1 .995.883L14 8c0 .552-.456 1-1.002 1H9v3.998a1 1 0 0 1-.883.995L8 14c-.552 0-1-.456-1-1.002V9H3.002a.999.999 0 1 1 0-2H7V3.002c0-.514.383-.937.883-.995z"
    />
  </svg>
);

export const ListView = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4-2.5a.999.999 0 1 0 0 2h9a.999.999 0 1 0 0-2zm0 5a.999.999 0 1 0 0 2h9a.999.999 0 1 0 0-2zm0 5a.999.999 0 1 0 0 2h9a.999.999 0 1 0 0-2zm-4 2.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M3 8.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
    />
  </svg>
);

export const Filter = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.11.813C.86.496 1.063 0 1.444 0h13.112c.38 0 .584.496.334.813L9.439 7.708a.52.52 0 0 0-.11.323v4.516c0 .13-.046.255-.13.347l-1.772 1.961c-.279.31-.756.09-.756-.346V8.03a.52.52 0 0 0-.11-.323z"
    />
  </svg>
);

export const GroupBy = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      d="M10.5 9C11.3284 9 12 9.67157 12 10.5C12 11.3284 11.3284 12 10.5 12H5.5C4.67157 12 4 11.3284 4 10.5C4 9.67157 4.67157 9 5.5 9H10.5Z"
    />
    <path
      fill="currentColor"
      d="M10.5 4C11.3284 4 12 4.67157 12 5.5C12 6.32843 11.3284 7 10.5 7H5.5C4.67157 7 4 6.32843 4 5.5C4 4.67157 4.67157 4 5.5 4H10.5Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14 0C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2C0 0.895431 0.895431 0 2 0H14ZM2 14H14V2H2V14Z"
    />
  </svg>
);

export const SortBy = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.369 9.891a1 1 0 0 1 1.407 1.406l-.07.077-2.665 2.667a1 1 0 0 1-1.34.068l-.074-.068-2.667-2.667-.069-.077a1 1 0 0 1 1.407-1.406l.076.069 1.959 1.959 1.96-1.96z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.333 13.334V2.667a1 1 0 1 1 2 0v10.667a1 1 0 0 1-2 0M4.035 1.891a1 1 0 0 1 1.339.069L8.04 4.627l.07.075a1 1 0 0 1-1.408 1.407l-.076-.068-1.96-1.96-1.959 1.96a1 1 0 0 1-1.414-1.414L3.96 1.96z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.667 13.334V2.667a1 1 0 1 1 2 0v10.667a1 1 0 0 1-2 0"
    />
  </svg>
);

export const Search = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 6.5a6.5 6.5 0 1 1 11.749 3.835l3.84 3.84a1 1 0 0 1-1.414 1.414l-3.84-3.84A6.5 6.5 0 0 1 0 6.5m2 0a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0"
    />
  </svg>
);

/** "Manage project templates" — a stack on a 24x22.5 grid. */
export const Templates = ({ size = 18, className }: IconProps) => (
  <svg
    width={size}
    height={(size / 24) * 22.5}
    viewBox="0 0 24 22.5"
    fill="none"
    className={className}
  >
    <path
      fill="currentColor"
      d="M24 13.4911V9H6V13.4911C6 15.1702 7.33916 16.5 8.99109 16.5H21.0089C22.6582 16.5 24 15.1529 24 13.4911Z"
    />
    <path
      fill="currentColor"
      d="M16.5793 2.77597C16.4645 1.22283 15.1664 0 13.5819 0H9.00564C7.34092 0 6 1.34315 6 3V6H24L23.9917 5.77597C23.8768 4.22283 22.5768 3 20.99 3H16.5875L16.5793 2.77597Z"
    />
    <path
      fill="currentColor"
      d="M0 15V7.49555C0 6.66958 0.669578 6 1.49555 6C2.32151 6 2.99109 6.66958 2.99109 7.49555V14.9911C2.99109 17.4764 5.00581 19.4911 7.49109 19.4911H17.995C18.8214 19.4911 19.4922 20.1641 19.495 20.9906C19.4977 21.8209 18.8302 22.5 17.9998 22.5H7.4991C3.35697 22.5 0 19.1421 0 15Z"
    />
  </svg>
);

/* ---------- table ---------- */

export const SortArrows = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.51 2.877a1.2 1.2 0 0 0-.512-.102c-.169 0-.362.027-.511.102l-.037.018-3.057 3.057-.018.037a1.2 1.2 0 0 0-.102.511c0 .17.027.363.102.512l.037.075.075.037c.149.074.342.101.511.101.17 0 .363-.027.512-.101l.037-.018 2.451-2.452 2.452 2.452.037.018c.149.074.342.101.511.101.17 0 .363-.027.512-.101l.075-.037.037-.075c.075-.149.101-.343.101-.512s-.027-.363-.101-.511l-.018-.037-3.057-3.057zM5.51 9.877a1.2 1.2 0 0 0-.512-.102c-.169 0-.362.027-.511.102l-.075.037-.037.075a1.2 1.2 0 0 0-.102.511c0 .17.027.363.102.512l.018.037 3.057 3.057.037.018c.149.074.342.101.511.101.17 0 .363-.027.512-.101l.037-.018 3.057-3.057.018-.037c.075-.149.101-.343.101-.512s-.027-.363-.101-.511l-.037-.075-.075-.037a1.2 1.2 0 0 0-.512-.102c-.169 0-.362.027-.511.102l-.037.018-2.452 2.452-2.451-2.452z"
    />
  </svg>
);

export const Dollar = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.5.5a1 1 0 0 1 1 1v.613c1.567.354 2.93 1.514 3.449 3.07a1 1 0 0 1-1.897.633c-.243-.728-.84-1.318-1.551-1.612v3.511C11.988 8.37 13 9.177 13 11.3c0 1.835-1.496 3.255-3.5 3.612v.588a1 1 0 1 1-2 0l-.001-.58c-1.733-.29-2.871-1.372-3.448-3.104a1 1 0 0 1 1.897-.632c.305.915.772 1.462 1.55 1.69v-3.59C5.014 8.63 4 7.824 4 5.7c0-1.835 1.495-3.255 3.5-3.613V1.5a1 1 0 0 1 1-1m1.002 9.29v3.075C10.418 12.599 11 11.979 11 11.3c0-.78-.32-1.148-1.498-1.51M6 5.7c0 .78.321 1.148 1.5 1.51V4.135C6.582 4.4 6 5.021 6 5.7"
    />
  </svg>
);

export const Checkbox = ({ size = 16, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <rect
      x="0.75"
      y="0.75"
      width="14.5"
      height="14.5"
      rx="3.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

/* ---------- reports view (24x24 outlines) ---------- */

export const BarChart = ({ size = 16, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <rect x="4" y="12" width="4" height="8" rx="1" />
    <rect x="10" y="7" width="4" height="13" rx="1" />
    <rect x="16" y="4" width="4" height="16" rx="1" />
  </svg>
);

export const Calendar = ({ size = 14, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
  </svg>
);

export const Globe = ({ size = 14, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" />
  </svg>
);

export const Info = ({ size = 12, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const Upgrade = ({ size = 16, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
    <path d="M12 16V8m0 0l-3 3m3-3l3 3" stroke="#000000" strokeWidth={2} />
  </svg>
);

export const CheckCircle = ({ size = 13, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M7.5 12.5l3 3 6-6"
      fill="none"
      stroke="#131213"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EmptyCircle = ({ size = 13, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle
      cx="12"
      cy="12"
      r="9.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
);

export const Rocket = ({ size = 13, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <path d="M5 15c-1.5 1.5-2 6-2 6s4.5-.5 6-2a3 3 0 00-4-4z" />
    <path d="M9 13l-2-2c1-5 5-8 11-8 0 6-3 10-8 11l-1-1z" />
  </svg>
);

/* ---------- calendar ----------
 *
 * Toggl's own glyphs, read out of the live app's DOM rather than redrawn by
 * eye: the same 16x16 solid frame as the rest of the icon set.
 */

/** Stopwatch — a LOGGED entry: time that actually happened. */
export const Stopwatch = ({ size = 12, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      d="M4 .75c0-.416.334-.75.75-.75h3.5c.416 0 .75.334.75.75s-.334.75-.75.75h-1v1.544a6.45 6.45 0 0 1 3.556 1.59l.913-.915a.75.75 0 0 1 1.06 1.06l-.97.968a6.499 6.499 0 0 1-5.31 10.25 6.498 6.498 0 0 1-.75-12.953V1.5h-.999A.75.75 0 0 1 4 .75M6.5 14.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10m.75-7.75V10c0 .416-.334.75-.75.75a.75.75 0 0 1-.75-.75V6.75c0-.416.334-.75.75-.75s.75.334.75.75"
    />
  </svg>
);

/** Calendar — a PLANNED entry: an estimate. Doubles as the calendar view toggle. */
export const CalendarSm = ({ size = 12, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3 1a1 1 0 0 1 2 0v1h6V1a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1zm11 5H2v8h12z"
    />
  </svg>
);

export const ViewCalendar = ({ size = 16, className }: IconProps) => (
  <CalendarSm size={size} className={className} />
);

export const ViewSplit = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.648 15h10.704C15.123 15 16 14.21 16 12.643V3.357C16 1.791 15.123 1 13.352 1H2.648C.886 1 0 1.783 0 3.357v9.286C0 14.217.886 15 2.648 15m.017-1.224c-.843 0-1.307-.403-1.307-1.194V3.418c0-.79.464-1.194 1.307-1.194h10.67c.835 0 1.307.403 1.307 1.194v9.164c0 .79-.472 1.194-1.307 1.194zm5.61.235h1.324V1.996H8.275zm4.647-8.152c.228 0 .388-.137.388-.342V4.095c0-.213-.152-.35-.388-.35h-1.594c-.22 0-.38.137-.38.35v1.422c0 .205.17.342.38.342zm0 3.194c.228 0 .388-.152.388-.342V7.274c0-.198-.152-.35-.388-.35h-1.594c-.22 0-.38.152-.38.35V8.71c0 .19.17.342.38.342zm0 3.179c.228 0 .388-.137.388-.342v-1.422c0-.206-.152-.35-.388-.35h-1.594c-.22 0-.38.144-.38.35v1.422c0 .205.17.342.38.342z"
    />
  </svg>
);

export const ViewList = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4-2.5a.999.999 0 1 0 0 2h9a.999.999 0 1 0 0-2zm0 5a.999.999 0 1 0 0 2h9a.999.999 0 1 0 0-2zm0 5a.999.999 0 1 0 0 2h9a.999.999 0 1 0 0-2zm-4 2.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M3 8.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
    />
  </svg>
);

export const ViewGrid = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm7 7h5V2H9zM2 7h5V2H2zm0 2v5h5V9zm12 0H9v5h5z"
    />
  </svg>
);

/** Toggl's own gear — replaces the outline one the Projects view used. */
export const Gear = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m.3-11c.387 0 .8.298.922.666l.533 1.595q.556.17 1.063.44l1.504-.751c.346-.173.85-.093 1.122.18l.425.426c.274.273.354.775.181 1.122l-.752 1.504q.27.506.442 1.064l1.594.532c.367.122.666.535.666.922v.6c0 .387-.298.8-.666.922l-1.595.533q-.17.556-.44 1.063l.751 1.504c.173.346.092.85-.18 1.122l-.426.425c-.273.274-.775.354-1.122.181l-1.504-.752q-.506.27-1.063.441l-.533 1.595C9.1 15.701 8.687 16 8.3 16h-.602c-.386 0-.798-.298-.92-.666l-.533-1.594a6 6 0 0 1-1.064-.442l-1.504.752c-.346.173-.85.092-1.122-.18l-.425-.426c-.274-.273-.354-.775-.181-1.122l.752-1.504a6 6 0 0 1-.442-1.064L.666 9.222C.299 9.1 0 8.687 0 8.3v-.602c0-.386.298-.798.666-.92l1.595-.534q.17-.556.44-1.063L1.95 3.678c-.173-.346-.093-.85.18-1.122l.426-.425c.273-.274.775-.354 1.122-.181l1.504.752q.506-.27 1.064-.442L6.778.666C6.9.299 7.313 0 7.7 0z"
    />
  </svg>
);

export const PanelRight = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9 2.5v11H2a.5.5 0 0 1-.5-.5V3c0-.275.225-.5.5-.5zm7 .5c0-1.103-.897-2-2-2H2C.897 1 0 1.897 0 3v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2zm-2 .75c0 .416-.334.75-.75.75h-1.5a.75.75 0 0 1-.75-.75c0-.416.334-.75.75-.75h1.5c.416 0 .75.334.75.75M13.25 6c.416 0 .75.334.75.75s-.334.75-.75.75h-1.5a.75.75 0 0 1-.75-.75c0-.416.334-.75.75-.75zM14 9.75c0 .416-.334.75-.75.75h-1.5a.75.75 0 0 1-.75-.75c0-.416.334-.75.75-.75h1.5c.416 0 .75.334.75.75"
    />
  </svg>
);

export const ArrowUp = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 15a1 1 0 0 1-1-1V4.414L3.707 7.707a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 1 1-1.414 1.414L9 4.414V14a1 1 0 0 1-1 1"
    />
  </svg>
);

export const Play = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      d="M5 3.3a.8.8 0 0 1 1.22-.68l7.3 4.7a.8.8 0 0 1 0 1.36l-7.3 4.7A.8.8 0 0 1 5 12.7z"
    />
  </svg>
);

export const Tag = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      d="M2 3.6A1.6 1.6 0 0 1 3.6 2h4.05c.42 0 .83.17 1.13.47l5.75 5.75a1.6 1.6 0 0 1 0 2.26l-4.05 4.05a1.6 1.6 0 0 1-2.26 0L2.47 8.78A1.6 1.6 0 0 1 2 7.65zM5.5 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
    />
  </svg>
);

export const Kebab = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      d="M8 4.2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6m0 5.1a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6m0 5.1a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6"
    />
  </svg>
);

export const Minus = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path fill="currentColor" d="M3 7.25h10a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5" />
  </svg>
);

export const Check = ({ size = 16, className }: IconProps) => (
  <svg {...solid(size)} className={className}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.268 9.687 12.3 3.401a.944.944 0 0 1 1.285-.25c.426.276.541.835.257 1.248l-6.66 7.2a.944.944 0 0 1-1.427.137L2.271 8.418a.88.88 0 0 1 0-1.273.946.946 0 0 1 1.31 0z"
    />
  </svg>
);

export const X = ({ size = 16, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <path d="M6 6l12 12M18 6L6 18" strokeWidth={2.2} />
  </svg>
);

export const Pencil = ({ size = 16, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16z" strokeWidth={2} />
  </svg>
);

/* Connector marks for the onboarding calendar step. Simplified stand-ins, not
 * the vendors' official artwork. */

export const GoogleCalendarMark = ({ size = 26, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect x="1" y="2" width="22" height="20" rx="3" fill="#ffffff" />
    <path d="M1 5a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v2H1z" fill="#4285f4" />
    <rect x="1" y="2" width="22" height="20" rx="3" fill="none" stroke="#dadce0" />
    <text
      x="12"
      y="17.5"
      textAnchor="middle"
      fontSize="10"
      fontWeight="700"
      fill="#4285f4"
      fontFamily="Inter, system-ui, sans-serif"
    >
      31
    </text>
  </svg>
);

export const OutlookMark = ({ size = 26, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect x="1" y="3" width="22" height="18" rx="3" fill="#0f6cbd" />
    <rect x="11" y="6" width="11" height="12" rx="1.5" fill="#ffffff" opacity="0.92" />
    <path d="M11 7.5 16.5 12 22 7.5" fill="none" stroke="#0f6cbd" strokeWidth="1.4" />
    <ellipse cx="6.6" cy="12" rx="3.6" ry="4.2" fill="#ffffff" />
    <ellipse cx="6.6" cy="12" rx="1.7" ry="2.2" fill="#0f6cbd" />
  </svg>
);

export const Restart = ({ size = 16, className }: IconProps) => (
  <svg {...line(size)} className={className}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
    <path d="M3 3.5V10h6.5" />
  </svg>
);
