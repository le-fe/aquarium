"use client";

export default function OceanBackground() {
  return (
    <>
      {/* SVG Definitions for clip paths */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="waterSurfaceWave" clipPathUnits="objectBoundingBox">
            <path d="M0,0.3 Q0.25,0 0.5,0.3 T1,0.3 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Caustic light effect layer */}
      <div className="caustic-light-layer"></div>

      {/* Underwater water surface texture with animated effects */}
      <div className="underwater-surface-layer">
        <div className="surface-texture-primary"></div>
        <div className="surface-texture-secondary"></div>
        <div className="surface-caustics-overlay"></div>
      </div>

      {/* Water surface refraction layer */}
      <div className="water-surface-refraction">
        <svg
          width="100%"
          height="60"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient
              id="surfaceGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(150, 220, 255, 0.2)" />
              <stop offset="50%" stopColor="rgba(100, 200, 255, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="surfaceBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
          <ellipse
            cx="20%"
            cy="10"
            rx="80"
            ry="15"
            fill="url(#surfaceGradient)"
            filter="url(#surfaceBlur)"
            opacity="0.6"
          >
            <animate
              attributeName="rx"
              values="80;95;80"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0.8;0.6"
              dur="4s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse
            cx="55%"
            cy="8"
            rx="100"
            ry="18"
            fill="url(#surfaceGradient)"
            filter="url(#surfaceBlur)"
            opacity="0.5"
          >
            <animate
              attributeName="rx"
              values="100;115;100"
              dur="5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;0.75;0.5"
              dur="5s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse
            cx="85%"
            cy="12"
            rx="75"
            ry="14"
            fill="url(#surfaceGradient)"
            filter="url(#surfaceBlur)"
            opacity="0.55"
          >
            <animate
              attributeName="rx"
              values="75;88;75"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.55;0.78;0.55"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
      </div>

      {/* Caustic light particles */}
      <div className="light-particles">
        <span className="light-particle"></span>
        <span className="light-particle"></span>
        <span className="light-particle"></span>
        <span className="light-particle"></span>
        <span className="light-particle"></span>
        <span className="light-particle"></span>
      </div>

      {/* Ocean waves */}
      <div className="ocean-waves">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
      </div>

      {/* Bubbles */}
      <div className="bubbles-container">
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
        <span className="bubble"></span>
      </div>

      {/* Cinematic vignette for cozy atmosphere */}
      <div className="cinematic-vignette"></div>
    </>
  );
}
