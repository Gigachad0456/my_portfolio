/** @type {import('tailwindcss').Config} */
const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variableName}))`;
    }

    return `rgb(var(${variableName}) / ${opacityValue})`;
  };
};

module.exports = {
  content: ["./index.html", "./script.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed-variant": withOpacity("--color-on-tertiary-fixed-variant"),
        "error-container": withOpacity("--color-error-container"),
        "inverse-primary": withOpacity("--color-inverse-primary"),
        "on-tertiary-container": withOpacity("--color-on-tertiary-container"),
        background: withOpacity("--color-background"),
        "on-secondary-fixed": withOpacity("--color-on-secondary-fixed"),
        surface: withOpacity("--color-surface"),
        "surface-variant": withOpacity("--color-surface-variant"),
        "on-secondary-fixed-variant": withOpacity("--color-on-secondary-fixed-variant"),
        outline: withOpacity("--color-outline"),
        "surface-bright": withOpacity("--color-surface-bright"),
        "secondary-fixed": withOpacity("--color-secondary-fixed"),
        "on-primary-fixed": withOpacity("--color-on-primary-fixed"),
        "on-primary": withOpacity("--color-on-primary"),
        "surface-container-high": withOpacity("--color-surface-container-high"),
        primary: withOpacity("--color-primary"),
        "tertiary-dim": withOpacity("--color-tertiary-dim"),
        "surface-container-highest": withOpacity("--color-surface-container-highest"),
        "secondary-container": withOpacity("--color-secondary-container"),
        "on-error-container": withOpacity("--color-on-error-container"),
        "surface-container-low": withOpacity("--color-surface-container-low"),
        "secondary-fixed-dim": withOpacity("--color-secondary-fixed-dim"),
        "inverse-on-surface": withOpacity("--color-inverse-on-surface"),
        "on-surface": withOpacity("--color-on-surface"),
        error: withOpacity("--color-error"),
        "surface-dim": withOpacity("--color-surface-dim"),
        "tertiary-fixed-dim": withOpacity("--color-tertiary-fixed-dim"),
        "surface-tint": withOpacity("--color-surface-tint"),
        "outline-variant": withOpacity("--color-outline-variant"),
        "on-secondary": withOpacity("--color-on-secondary"),
        "on-surface-variant": withOpacity("--color-on-surface-variant"),
        "on-error": withOpacity("--color-on-error"),
        "primary-container": withOpacity("--color-primary-container"),
        "surface-container-lowest": withOpacity("--color-surface-container-lowest"),
        "inverse-surface": withOpacity("--color-inverse-surface"),
        tertiary: withOpacity("--color-tertiary"),
        "on-tertiary-fixed": withOpacity("--color-on-tertiary-fixed"),
        secondary: withOpacity("--color-secondary"),
        "secondary-dim": withOpacity("--color-secondary-dim"),
        "on-background": withOpacity("--color-on-background"),
        "primary-dim": withOpacity("--color-primary-dim"),
        "primary-fixed": withOpacity("--color-primary-fixed"),
        "on-primary-fixed-variant": withOpacity("--color-on-primary-fixed-variant"),
        "on-primary-container": withOpacity("--color-on-primary-container"),
        "on-secondary-container": withOpacity("--color-on-secondary-container"),
        "surface-container": withOpacity("--color-surface-container"),
        "tertiary-container": withOpacity("--color-tertiary-container"),
        "tertiary-fixed": withOpacity("--color-tertiary-fixed"),
        "error-dim": withOpacity("--color-error-dim"),
        "on-tertiary": withOpacity("--color-on-tertiary"),
        "primary-fixed-dim": withOpacity("--color-primary-fixed-dim"),
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      fontFamily: {
        headline: ["Manrope"],
        body: ["Inter"],
        label: ["Inter"],
      },
    },
  },
  plugins: [],
};
