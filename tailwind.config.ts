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
