import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <Script
            id="theme"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                        var LIGHT_KEY = 'light;
                        var DARK_KEY = 'dark';
                        var currentTime = new Date().getHours();
                        var currentSysTheme = window.matchMedia('(prefers-color-scheme: dark)');
                        var storageDark = localStorage.getItem(DARK_KEY);
                        var storageLight = localStorage.getItem(LIGHT_KEY);
                        var html = document.querySelector('html');

                        function setTheme(mode){
                          if(mode === 'dark){
                            html.classList.remove(LIGHT_KEY);
                            html.classList.add(DARK_KEY);
                            localStorage.setItem(DARK_KEY, JSON.parse(true)); 
                          } else {
                            html.classList.remove(DARK_KEY);
                            html.classList.add(LIGHT_KEY);
                            localStorage.setItem(LIGHT_KEY, JSON.parse(true)); 
                          }
                        }
                        
                        if (storageDark) {
                          setTheme(DARK_KEY);
                        } else if(storageLight){
                          setTheme(LIGHT_KEY);
                        } else {
                          if (currentTime > 18 || currentTime < 6) {
                            setTheme(DARK_KEY);
                          } else if(currentSysTheme.matches){
                            setTheme(DARK_KEY);
                          } else {
                            setTheme(LIGHT_KEY);
                          }
                        }
                      `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
