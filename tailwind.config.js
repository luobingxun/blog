module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        page_full: 'calc(100vh - 6015rem)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
