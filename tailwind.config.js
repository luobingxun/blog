const darkHeaderBgColor = '#242526';
const darkBodyBgColor = '#18191b';
const darkArticleBgColor = '#242424';
const lightArticleBgColor = '#f8f8f8';
const darkFooterBgColor = '#303846';
const lightPreBgColor = '#1d1d25';
const lightTextColor = '#ffffff';

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'header-bg': darkHeaderBgColor,
        'footer-bg': darkFooterBgColor,
        'body-bg': darkBodyBgColor,
        'l-pre-bg': lightPreBgColor,
        'd-pre-bg': darkArticleBgColor,
        'd-article-bg': darkArticleBgColor,
        'l-article-bg': lightArticleBgColor,
        'text-bg': lightTextColor
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
