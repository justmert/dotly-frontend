import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "sfblue": {
          DEFAULT: '#2F5061',
          100: '#C9DBE5',
          200: '#ADC9D7',
          300: '#92B7CA',
          400: '#E4EEF2',
          500: '#5B93AF',
          600: '#4A7D98',
          700: '#3C677C',
          800: '#2F5061',
          900: '#1D313B',
        },
        "sfgreen": {  
          DEFAULT: '#4297A0',    
          400: '#A9D7DC',  
          500: '#8DC9D0',  
          600: '#70BCC4',  
          700: '#53AEB8',  
          800: '#4297A0',  
          900: '#327278',  
          950: '#295F64'
        },
        "sfred": {
          500: '#FAE5E6',
          600: '#F3C3C5',
          700: '#ECA1A5',
          800: '#E57F84',
          900: '#DC5057',
          950: '#D73941'
        },
        "main" : {
          DEFAULT: "#2A3855",
          700: "#3C4D6E",
          800: "#2A3855"
        },
        "side" : {
          DEFAULT: "#DAE1ED",
          300: "#91A4C9",
          400: "#DAE1ED",
          500: "#455D8C"
        },
        "polkadotpink": {
          DEFAULT: "#E6007A"
        },
        "polkadotpurple": {
          DEFAULT: "#552BBF"
        },
        "polkadotcyan": {
          DEFAULT: "#00B2FF"
        },
        "polkadotlime":{
          DEFAULT: "#D3FF33"
        },
        "polkadotgreen":{
          DEFAULT: "#56F39A"
        },
        sfgray: "#FFCDB2",
        sfblack: "rgba(51, 51, 51, 0.5)"
      },
      fontFamily: {
        'cabin': ['"Cabin"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
