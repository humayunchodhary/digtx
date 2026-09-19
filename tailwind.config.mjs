/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff7a1a',
        primaryHover: '#e35f00',
        cta: '#ff9a3c',
        ctaHover: '#ff7a1a',
        heading: '#1a1a1a',
        text: '#1a1a1a',
        border: '#e6e6e6',
        lightBorder: '#f3f3f3',
        highlight: '#e53935',
        sale: '#ff7a1a',
        newBadge: '#2e7d32',
        preorder: '#ff7a1a',
        soldout: '#999999',
        customBadge: '#ff7a1a',
        footer: '#0a0a0a',
        footerText: '#ffffff',
        secondaryText: '#6b6b6b',
        headerBg: '#ffffff',
        headerBottom: '#1a1a1a',
        buttonText: '#ffffff',
        price: '#ff7a1a',
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        baskerville: ['"Libre Baskerville"', 'serif'],
      },
      fontSize: {
        body: ['1.4rem', { lineHeight: '1.8' }],
        h1: ['3.5rem', { lineHeight: '1.2', letterSpacing: '0' }],
        h2: ['2.5rem', { lineHeight: '1.2', letterSpacing: '0' }],
        h3: ['2.2rem', { lineHeight: '1.3', letterSpacing: '0' }],
        h4: ['1.8rem', { lineHeight: '1.3', letterSpacing: '0' }],
        h5: ['1.7rem', { lineHeight: '1.4', letterSpacing: '0' }],
        h6: ['1.55rem', { lineHeight: '1.4', letterSpacing: '0' }],
        announcement: ['1.2rem', { lineHeight: '1.5' }],
        nav: ['1.3rem', { lineHeight: '1.2', letterSpacing: '0.02em' }],
      },
      container: {
        center: true,
        padding: '0 1.5rem',
      },
      maxWidth: {
        container: '1420px',
      },
      borderRadius: {
        btn: '60px',
        card: '0',
      },
      boxShadow: {
        card: '0 0 12px #0000001f',
      },
      transitionTimingFunction: {
        'out-slow': 'cubic-bezier(0,0,.3,1)',
      },
      animation: {
        'slide-in': 'slideIn 0.6s cubic-bezier(0,0,.3,1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0,0,.3,1)',
        'nav-open': 'navOpen 0.3s ease-out forwards',
        'nav-close': 'navClose 0.3s ease-out forwards',
        'drawer-enter': 'drawerEnter 0.3s ease-out forwards',
        'drawer-exit': 'drawerExit 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          'from': { transform: 'translateY(2rem)', opacity: '0.01' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0.01' },
          'to': { opacity: '1' },
        },
        navOpen: {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(0)' },
        },
        navClose: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100%)' },
        },
        drawerEnter: {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
        drawerExit: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
