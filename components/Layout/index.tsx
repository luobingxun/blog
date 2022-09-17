import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import Head from 'next/head';
import Footer from './Footer';
import Main from './Main';

interface LayoutProps {
  title: string;
  keywords: string;
  description: string;
  children: ReactNode;
  hasFooter?: boolean;
  BGTitle?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, keywords, description, children, hasFooter = true, BGTitle }) => {
  // useEffect(() => {
  //   document.documentElement.classList.add('dark');
  // }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />;
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <meta name="renderer" content="webkit|ie-comp|ie-stand" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="'shortcut icon'" type="image/x-icon" href="static/favicon.ico" />
      </Head>
      <Header />
      <Main BGTitle={BGTitle}>{children}</Main>
      {hasFooter && <Footer />}
    </>
  );
};

export default Layout;
