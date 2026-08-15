/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container": "#00aeef",
        "surface-container-high": "#ebe7e9",
        "on-tertiary-fixed": "#04006d",
        "on-tertiary": "#ffffff",
        "inverse-surface": "#313032",
        "surface-variant": "#e5e1e4",
        "error": "#ba1a1a",
        "on-tertiary-fixed-variant": "#373a9b",
        "on-primary-fixed-variant": "#004c6b",
        "surface-dim": "#dcd9db",
        "surface-container-lowest": "#ffffff",
        "tertiary": "#4f54b4",
        "inverse-on-surface": "#f3f0f2",
        "on-secondary-fixed": "#410002",
        "on-primary-fixed": "#001e2d",
        "outline": "#6e7881",
        "outline-variant": "#bdc8d1",
        "on-secondary": "#ffffff",
        "tertiary-fixed-dim": "#c0c1ff",
        "surface-tint": "#00658d",
        "surface-bright": "#fcf8fa",
        "on-secondary-container": "#fffbff",
        "on-surface-variant": "#3e4850",
        "secondary": "#bb0013",
        "on-secondary-fixed-variant": "#93000d",
        "primary-fixed-dim": "#82cfff",
        "surface-container-low": "#f6f2f5",
        "primary-fixed": "#c6e7ff",
        "primary": "#00658d",
        "secondary-container": "#e71520",
        "on-primary": "#ffffff",
        "on-primary-container": "#003e58",
        "on-background": "#1c1b1d",
        "error-container": "#ffdad6",
        "inverse-primary": "#82cfff",
        "tertiary-fixed": "#e1e0ff",
        "tertiary-container": "#9599ff",
        "surface-container": "#f0edef",
        "secondary-fixed": "#ffdad6",
        "on-surface": "#1c1b1d",
        "on-error-container": "#93000a",
        "surface": "#fcf8fa",
        "secondary-fixed-dim": "#ffb4ab",
        "background": "#fcf8fa",
        "surface-container-highest": "#e5e1e4",
        "on-error": "#ffffff",
        "on-tertiary-container": "#282b8c"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "base": "8px",
        "margin-desktop": "40px",
        "container-max": "1280px",
        "margin-mobile": "16px",
        "gutter": "24px"
      },
      fontFamily: {
        "headline-lg": ["Manrope", "sans-serif"],
        "headline-lg-mobile": ["Manrope", "sans-serif"],
        "body-md": ["Work Sans", "sans-serif"],
        "body-lg": ["Work Sans", "sans-serif"],
        "label-sm": ["Work Sans", "sans-serif"],
        "display-lg": ["Manrope", "sans-serif"],
        "title-md": ["Manrope", "sans-serif"],
        "manrope": ["Manrope", "sans-serif"],
        "work-sans": ["Work Sans", "sans-serif"]
      },
      fontSize: {
        "headline-lg": [
          "32px",
          {
            "lineHeight": "40px",
            "fontWeight": "600"
          }
        ],
        "headline-lg-mobile": [
          "24px",
          {
            "lineHeight": "32px",
            "fontWeight": "600"
          }
        ],
        "body-md": [
          "16px",
          {
            "lineHeight": "24px",
            "fontWeight": "400"
          }
        ],
        "body-lg": [
          "18px",
          {
            "lineHeight": "28px",
            "fontWeight": "400"
          }
        ],
        "label-sm": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.05em",
            "fontWeight": "600"
          }
        ],
        "display-lg": [
          "48px",
          {
            "lineHeight": "56px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "title-md": [
          "20px",
          {
            "lineHeight": "28px",
            "fontWeight": "600"
          }
        ]
      }
    },
  },
  plugins: [],
}
