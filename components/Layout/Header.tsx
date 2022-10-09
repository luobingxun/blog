import React, { useState } from 'react';
import Link from 'next/link';
import BlackMode from '../../public/icons/black.svg';
import WhiteMode from '../../public/icons/white.svg';
import GitHub from '../../public/icons/github.svg';
import classnames from 'classnames';
import useScrollTop from '../../hooks/useScrollTop';

const tabs: {
  name?: string;
  link?: string;
}[] = [
  {
    link: '/article',
    name: '文章'
  },
  {
    link: '/tags',
    name: '标签'
  }
];

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  const onClick = () => {
    setIsDark(!isDark);
  };

  const { isHeaderScrollTop } = useScrollTop();

  return (
    <header
      className={classnames('header header-animation', {
        ['header-is-top']: isHeaderScrollTop,
        ['header-not-top']: !isHeaderScrollTop
      })}
    >
      <nav className="header-nav">
        <Link href="/">
          <a className="header-nav-logo">主页</a>
        </Link>
        <ul className="header-nav-ul">
          {tabs.map(({ name, link }) => (
            <li className="header-nav-ul-li" key={link}>
              <Link href={link}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
          <li className="header-nav-ul-github">
            <a href="https://github.com/xlz-cloud/blog" target="_black">
              <GitHub className="header-nav-ul-github-svg" fill={isHeaderScrollTop ? 'white' : 'black'} />
            </a>
          </li>
          <li className="header-nav-ul-mode" onClick={onClick}>
            <button className="header-nav-ul-mode-btn">
              {isDark ? (
                <BlackMode className="header-nav-ul-mode-black" fill={isHeaderScrollTop ? 'white' : 'black'} />
              ) : (
                <WhiteMode className="header-nav-ul-mode-dark" fill={isHeaderScrollTop ? 'white' : 'black'} />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
