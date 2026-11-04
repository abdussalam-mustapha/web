/**
 * Original anime-style portrait of Mustapha for the Anime note on /fun:
 * cornrow braids, goatee, a confident grin and a hoodie with a four-leaf-clover badge
 * ("Never miss a lucky day"). Inked like the rest of the board. Not based on any existing character.
 */
const INK = "#2a2418";
const SKIN = "#7a4a2a";
const SKIN_SHADE = "#5e3820";
const SKIN_LIGHT = "#9a6440";
const HAIR = "#1c1512";
const HOODIE = "#2a9d8f";
const HOODIE_SHADE = "#1f7a6f";

export function AnimeHero() {
  return (
    <svg className="art" viewBox="0 0 200 200" role="img" aria-label="An original anime-style drawing of Mustapha">
      <defs>
        <clipPath id="ah-frame"><circle cx="100" cy="100" r="96" /></clipPath>
        <radialGradient id="ah-glow" cx="50%" cy="42%" r="60%">
          <stop offset="0" stopColor="#fff7d6" />
          <stop offset="1" stopColor="#ffe27a" />
        </radialGradient>
      </defs>

      <g clipPath="url(#ah-frame)">
        {/* Manga focus lines */}
        <rect width="200" height="200" fill="url(#ah-glow)" />
        <g stroke={INK} strokeOpacity=".18" strokeWidth="2" strokeLinecap="round">
          {Array.from({ length: 28 }, (_, i) => {
            const a = (i / 28) * Math.PI * 2;
            const r1 = 70 + (i % 3) * 8;
            return (
              <line
                key={i}
                x1={(100 + Math.cos(a) * r1).toFixed(1)}
                y1={(92 + Math.sin(a) * r1).toFixed(1)}
                x2={(100 + Math.cos(a) * 140).toFixed(1)}
                y2={(92 + Math.sin(a) * 140).toFixed(1)}
              />
            );
          })}
        </g>

        {/* Hoodie and shoulders */}
        <path d="M20 200 Q26 160 62 150 L82 144 Q100 156 118 144 L138 150 Q174 160 180 200 Z" fill={HOODIE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M62 150 Q72 170 70 200 M138 150 Q128 170 130 200" fill="none" stroke={HOODIE_SHADE} strokeWidth="4" strokeLinecap="round" />
        {/* Hood collar */}
        <path d="M70 146 Q100 172 130 146 Q120 162 100 164 Q80 162 70 146 Z" fill={HOODIE_SHADE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        {/* Drawstrings */}
        <path d="M90 162 L87 184 M110 162 L113 184" stroke="#f7f3ea" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="87" cy="186" r="2.6" fill="#f7f3ea" stroke={INK} strokeWidth="1.2" />
        <circle cx="113" cy="186" r="2.6" fill="#f7f3ea" stroke={INK} strokeWidth="1.2" />
        {/* Four-leaf-clover badge */}
        <g transform="translate(146 178) rotate(-12)">
          <circle r="11" fill="#ffd23f" stroke={INK} strokeWidth="2" />
          <g fill="#1b9e5a" stroke={INK} strokeWidth="1">
            <circle cx="-3" cy="-3" r="3.4" /><circle cx="3" cy="-3" r="3.4" />
            <circle cx="-3" cy="3" r="3.4" /><circle cx="3" cy="3" r="3.4" />
          </g>
          <path d="M1 4 Q3 8 6 9" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Neck */}
        <path d="M84 128 L84 148 Q100 158 116 148 L116 128 Z" fill={SKIN_SHADE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />

        {/* Ears */}
        <ellipse cx="58" cy="96" rx="7" ry="11" fill={SKIN} stroke={INK} strokeWidth="2.5" />
        <ellipse cx="142" cy="96" rx="7" ry="11" fill={SKIN} stroke={INK} strokeWidth="2.5" />
        <path d="M58 90 Q55 96 59 102 M142 90 Q145 96 141 102" fill="none" stroke={SKIN_SHADE} strokeWidth="2" strokeLinecap="round" />

        {/* Face: anime proportions, a defined jaw that tapers to the chin */}
        <path
          d="M60 78 Q60 44 100 42 Q140 44 140 78 L139 100 Q136 124 116 138 Q100 147 84 138 Q64 124 61 100 Z"
          fill={SKIN}
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Cheek shading and highlight */}
        <path d="M64 104 Q70 124 86 136 Q74 122 70 104 Z" fill={SKIN_SHADE} opacity=".55" />
        <path d="M128 70 Q134 80 133 94" fill="none" stroke={SKIN_LIGHT} strokeWidth="3" strokeLinecap="round" opacity=".8" />

        {/* Cornrow braids: a dark cap with braided rows running back from the hairline */}
        <path d="M56 86 Q50 34 100 28 Q150 34 144 86 Q140 66 128 60 Q100 52 72 60 Q60 66 56 86 Z" fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <g fill="none" stroke="#4a3a30" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="3.5 2.6">
          <path d="M64 70 Q62 52 74 38" />
          <path d="M76 60 Q76 44 86 33" />
          <path d="M89 56 Q90 41 95 30" />
          <path d="M102 55 Q102 40 104 29" />
          <path d="M115 56 Q114 42 113 31" />
          <path d="M127 60 Q126 46 122 35" />
          <path d="M137 70 Q138 54 130 40" />
        </g>
        {/* Crisp hairline */}
        <path d="M60 78 Q62 62 74 58 Q100 50 126 58 Q138 62 140 78" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />

        {/* Eyebrows: thick and determined */}
        <path d="M70 76 Q80 70 93 76 L92 80 Q81 76 71 80 Z" fill={HAIR} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M130 76 Q120 70 107 76 L108 80 Q119 76 129 80 Z" fill={HAIR} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />

        {/* Eyes */}
        {[{ cx: 82, flip: 1 }, { cx: 118, flip: -1 }].map(({ cx, flip }) => (
          <g key={cx}>
            <path
              d={`M${cx - 12 * flip} 90 Q${cx} 81 ${cx + 12 * flip} 88 Q${cx + 2 * flip} 97 ${cx - 12 * flip} 90 Z`}
              fill="#fff"
              stroke={INK}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx={cx + 1 * flip} cy="89.5" r="5.6" fill="#3b2314" />
            <circle cx={cx + 1 * flip} cy="89.5" r="2.6" fill="#120b06" />
            <circle cx={cx - 1 * flip} cy="87.2" r="1.7" fill="#fff" />
            <circle cx={cx + 3.2 * flip} cy="91.6" r=".9" fill="#fff" opacity=".85" />
            {/* Heavy upper lash line */}
            <path d={`M${cx - 13 * flip} 90 Q${cx} 79 ${cx + 13 * flip} 87.5`} fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
          </g>
        ))}

        {/* Nose */}
        <path d="M100 92 L97 108 Q100 111 104 108" fill="none" stroke={SKIN_SHADE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Moustache */}
        <path d="M86 116 Q93 111 100 114 Q107 111 114 116 Q107 115 100 117 Q93 115 86 116 Z" fill={HAIR} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        {/* Confident grin */}
        <path d="M88 120 Q100 131 113 119 Q101 124 88 120 Z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <path d="M88 120 Q90 118 92 120" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M113 119 L116 116" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />

        {/* Goatee */}
        <path d="M90 131 Q100 138 110 131 Q110 141 100 145 Q90 141 90 131 Z" fill={HAIR} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
        {/* Stubble along the jaw */}
        <g fill={HAIR} opacity=".5">
          {[[70, 118], [74, 124], [79, 129], [126, 124], [121, 129], [130, 118], [84, 133], [116, 133]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" />
          ))}
        </g>

        {/* Sparkles */}
        <g fill="#fff" stroke={INK} strokeWidth="1.5" strokeLinejoin="round">
          <path d="M168 44 L171 52 L179 55 L171 58 L168 66 L165 58 L157 55 L165 52 Z" />
          <path d="M34 60 L36 65 L41 67 L36 69 L34 74 L32 69 L27 67 L32 65 Z" />
        </g>
      </g>
      {/* Inked frame */}
      <circle cx="100" cy="100" r="96" fill="none" stroke={INK} strokeWidth="4" />
    </svg>
  );
}
