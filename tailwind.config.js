/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode by toggling a class
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          DEFAULT: 'var(--ant-tw-primary)',
          hover: '#4096ff',
          active: '#0958d9',
          border: '#91caff',
          bg: '#e6f4ff',
          text: '#cd1616',
        },
        secondary: {
          DEFAULT: 'var(--ant-tw-secondary)',
          hover: 'var(--ant-tw-secondary-hover)',
          text: 'var(--ant-tw-secondary-text)',
          border: 'var(--ant-tw-secondary-border)',
          active: '#495057',
          bg: '#f8f9fa',
        },
        success: {
          DEFAULT: '#52c41a',
          hover: '#73d13d',
          active: '#389e0d',
          border: '#b7eb8f',
          bg: '#f6ffed',
          text: '#ffffff',
        },
        warning: {
          DEFAULT: '#faad14',
          hover: '#ffc53d',
          active: '#d48806',
          border: '#ffe58f',
          bg: '#fffbe6',
          text: '#ffffff',
        },
        error: {
          DEFAULT: '#ff4d4f',
          hover: '#ff7875',
          active: '#d9363e',
          border: '#ffa39e',
          bg: '#fff2f0',
          text: '#ffffff',
        },
        info: {
          DEFAULT: '#1890ff',
          hover: '#40a9ff',
          active: '#096dd9',
          border: '#91d5ff',
          bg: '#e6f7ff',
          text: '#ffffff',
        },
        link: {
          DEFAULT: '#1677ff',
          hover: '#4096ff',
          active: '#0958d9',
        },
        text: {
          base: '#1a1a1a',
          heading: '#141414',
          secondary: '#676565',
          tertiary: '#8c8c8c',
          quaternary: '#bfbfbf',
          disabled: '#bfbfbf',
          label: '#595959',
          placeholder: '#bfbfbf',
          light: '#fff',
        },
        border: {
          DEFAULT: '#e5e7eb',
          secondary: '#d9d9d9',
          bg: '#f0f0f0',
          split: '#f0f0f0',
        },
        bg: {
          base: '#ffffff',
          container: '#FFFFFF',
          elevated: '#fff',
          layout: '#F5F5F5',
          mask: 'rgba(0,0,0,0.45)',
          spotlight: '#fffbe6',
          blur: 'rgba(255,255,255,0.6)',
          input: 'rgb(145 202 255 / 47%)',
          'table-row-even': '#F9F9F9',
          'table-row-odd': '#ffffff',
        },
        fill: {
          DEFAULT: 'rgba(0,0,0,0.15)',
          secondary: 'rgba(0,0,0,0.06)',
          tertiary: 'rgba(0,0,0,0.04)',
          quaternary: 'rgba(0,0,0,0.02)',
        },
        white: '#fff',
        black: '#000',
        antCard: {
          'header-text': '#696666',
          'header-text2': '#807A7A',
        },

        // Dark theme colors
        dark: {
          primary: {
            DEFAULT: 'var(--ant-tw-primary)',
            hover: '#0c3773',
            active: '#08469d',
            border: '#0f2b53',
            bg: '#0f2b53',
            text: '#01419e',
          },
          success: {
            DEFAULT: '#49aa19',
            hover: '#6abe39',
            active: '#237804',
            border: '#274c77',
            bg: '#162312',
            text: '#ffffff',
          },
          warning: {
            DEFAULT: '#d89614',
            hover: '#e8b339',
            active: '#ad6800',
            border: '#ad6800',
            bg: '#2b2612',
            text: '#ffffff',
          },
          error: {
            DEFAULT: '#a61d24',
            hover: '#cf3636',
            active: '#820014',
            border: '#820014',
            bg: '#2a1215',
            text: '#ffffff',
          },
          info: {
            DEFAULT: '#177ddc',
            hover: '#3c9ae8',
            active: '#0958d9',
            border: '#274c77',
            bg: '#111a2c',
            text: '#ffffff',
          },
          link: {
            DEFAULT: '#177ddc',
            hover: '#3c9ae8',
            active: '#0958d9',
          },
          text: {
            base: '#e6f4ff',
            heading: '#e6f4ff',
            secondary: '#b6c2cd',
            tertiary: '#8c8c8c',
            quaternary: '#434343',
            disabled: '#434343',
            label: '#b6c2cd',
            placeholder: '#434343',
            light: '#fff',
          },
          border: {
            DEFAULT: '#434343',
            secondary: '#EBEBEB',
            bg: '#1d1d1d',
            split: '#303030',
          },
          bg: {
            base: '#141414',
            container: '#1d1d1d',
            elevated: '#22272b',
            layout: '#141414',
            mask: 'rgba(0,0,0,0.65)',
            spotlight: '#2b2612',
            blur: 'rgba(20,20,20,0.6)',
          },
          fill: {
            DEFAULT: 'rgba(0,0,0,0.15)',
            secondary: 'rgba(0,0,0,0.06)',
            tertiary: 'rgba(0,0,0,0.04)',
            quaternary: 'rgba(0,0,0,0.02)',
          },
          white: '#fff',
          black: '#000',
        },
      },
      borderRadius: {
        none: '0px',
        xs: '0.125rem', // 2px
        sm: '0.25rem', // 4px
        DEFAULT: '0.375rem', // 4px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
        full: '9999px',
        outer: '12px',
      },
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        7.5: '1.875rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
        // ...custom spacing values...
        xxs: '0.25rem', // 4px
        xs: '0.5rem', // 8px
        sm: '0.75rem', // 8px
        DEFAULT: '1rem', // 16px
        md: '1.25rem', // 20px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        DEFAULT: ['0.72rem', { lineHeight: '0.72rem' }], // ~11.52px
        xxs: ['0.48rem', { lineHeight: '0.72rem' }], // ~7.68px font
        xs: ['0.72rem', { lineHeight: '0.96rem' }], // ~11.52px font, ~15.36px line-height
        sm: ['0.60rem', { lineHeight: '0.60rem' }], // ~9.6px font
        base: ['0.72rem', { lineHeight: '0.72rem' }], // same as DEFAULT
        md: ['0.84rem', { lineHeight: '1.2rem' }], // ~13.44px font, ~19.2px line-height
        lg: ['0.96rem', { lineHeight: '0.96rem' }], // ~15.36px
        xl: ['1.2rem', { lineHeight: '1.68rem' }], // ~19.2px font
        '2xl': ['1.44rem', { lineHeight: '1.92rem' }], // ~23.04px font
        '3xl': ['1.8rem', { lineHeight: '2.16rem' }], // ~28.8px font
        '4xl': ['2.16rem', { lineHeight: '2.4rem' }], // ~34.56px font
        '5xl': ['2.88rem', { lineHeight: '1' }], // ~46.08px
        '6xl': ['3.6rem', { lineHeight: '1' }], // ~57.6px
        '7xl': ['4.32rem', { lineHeight: '1' }], // ~69.12px
        '8xl': ['5.76rem', { lineHeight: '1' }], // ~92.16px
        '9xl': ['7.68rem', { lineHeight: '1' }], // ~122.88px
        icon: ['15.36px', '1'], // scaled down from 16px
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      borderWidth: {
        DEFAULT: '1px',
        base: '1px',
        0: '0px',
        none: '0px',
        thin: '1px',
        bold: '2px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      boxShadow: {
        DEFAULT: '0 2px 8px rgba(0,0,0,0.08)',
        secondary: '0 1px 4px rgba(0,0,0,0.06)',
        tertiary: '0 1.5px 6px rgba(0,0,0,0.04)',
        popover: '0 4px 16px rgba(0,0,0,0.12)',
        drawer: '0 8px 24px rgba(0,0,0,0.16)',
        modal: '0 16px 40px rgba(0,0,0,0.20)',
        dark: {
          DEFAULT: '0 2px 8px rgba(0,0,0,0.32)',
          secondary: '0 1px 4px rgba(0,0,0,0.24)',
          tertiary: '0 1.5px 6px rgba(0,0,0,0.18)',
          popover: '0 4px 16px rgba(0,0,0,0.36)',
          drawer: '0 8px 24px rgba(0,0,0,0.40)',
          modal: '0 16px 40px rgba(0,0,0,0.44)',
        },
      },
      lineHeight: {
        DEFAULT: 1.5715,
        heading1: 1,
        heading2: 1.35,
        heading3: 1.4,
        heading4: 1.45,
        heading5: 1.5,
      },
      maxHeight: {
        content: 'calc(100vh - 44px)',
      },
      height: {
        content: 'calc(100vh - 44px)',
        full: '100%',
        30: '30px',
      },
      width: {
        full: '100%',
        30: '30px',
      },
    },
  },
  plugins: [],
};
