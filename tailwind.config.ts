import type {Config} from 'tailwindcss';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require('tailwindcss/plugin');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {blackA, mauve, violet, indigo, purple} = require('@radix-ui/colors');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        ...purple,
        ...indigo,
      },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      keyframes: {
        enterFromRight: {
          from: {opacity: '0', transform: 'translateX(200px)'},
          to: {opacity: '1', transform: 'translateX(0)'},
        },
        enterFromLeft: {
          from: {opacity: '0', transform: 'translateX(-200px)'},
          to: {opacity: '1', transform: 'translateX(0)'},
        },
        exitToRight: {
          from: {opacity: '1', transform: 'translateX(0)'},
          to: {opacity: '0', transform: 'translateX(200px)'},
        },
        exitToLeft: {
          from: {opacity: '1', transform: 'translateX(0)'},
          to: {opacity: '0', transform: 'translateX(-200px)'},
        },
        scaleIn: {
          from: {opacity: '0', transform: 'rotateX(-10deg) scale(0.9)'},
          to: {opacity: '1', transform: 'rotateX(0deg) scale(1)'},
        },
        scaleOut: {
          from: {opacity: '1', transform: 'rotateX(0deg) scale(1)'},
          to: {opacity: '0', transform: 'rotateX(-10deg) scale(0.95)'},
        },
        fadeIn: {
          from: {opacity: '0'},
          to: {opacity: '1'},
        },
        fadeOut: {
          from: {opacity: '1'},
          to: {opacity: '0'},
        },
        hide: {
          from: {opacity: '1'},
          to: {opacity: '0'},
        },
        slideIn: {
          from: {transform: 'translateX(calc(100% + var(--viewport-padding)))'},
          to: {transform: 'translateX(0)'},
        },
        swipeOut: {
          from: {transform: 'translateX(var(--radix-toast-swipe-end-x))'},
          to: {transform: 'translateX(calc(100% + var(--viewport-padding)))'},
        },
        slideDownAndFade: {
          from: {opacity: '0', transform: 'translateY(-2px)'},
          to: {opacity: '1', transform: 'translateY(0)'},
        },
        slideLeftAndFade: {
          from: {opacity: '0', transform: 'translateX(2px)'},
          to: {opacity: '1', transform: 'translateX(0)'},
        },
        slideUpAndFade: {
          from: {opacity: '0', transform: 'translateY(2px)'},
          to: {opacity: '1', transform: 'translateY(0)'},
        },
        slideRightAndFade: {
          from: {opacity: '0', transform: 'translateX(-2px)'},
          to: {opacity: '1', transform: 'translateX(0)'},
        },
      },
    },
    animation: {
      scaleIn: 'scaleIn 200ms ease',
      scaleOut: 'scaleOut 200ms ease',
      fadeIn: 'fadeIn 200ms ease',
      fadeOut: 'fadeOut 200ms ease',
      enterFromLeft: 'enterFromLeft 250ms ease',
      enterFromRight: 'enterFromRight 250ms ease',
      exitToLeft: 'exitToLeft 250ms ease',
      exitToRight: 'exitToRight 250ms ease',
      hide: 'hide 100ms ease-in',
      slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      swipeOut: 'swipeOut 100ms ease-out',
      spinAround: 'spin 1s linear infinite',
      slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideRightAndFade:
        'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  plugins: [
    // eslint-disable-next-line no-empty-pattern
    plugin(({matchUtilities}: {matchUtilities: ({}) => unknown}) => {
      matchUtilities({
        perspective: (value: unknown) => ({
          perspective: value,
        }),
      });
    }),
  ],
};
export default config;
