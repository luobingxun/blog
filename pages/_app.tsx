import React from 'react';
import '../styles/index.less';
import ThemeProvider from '../theme/ThemeProvider';

const App = ({ Component, pageProps }) => {
  return <ThemeProvider chidlren={<Component {...pageProps} />} />;
};

export default App;
