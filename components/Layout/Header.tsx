import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import BlackMode from '../../public/icons/black.svg';
import WhiteMode from '../../public/icons/white.svg';
import GitHub from '../../public/icons/github.svg';
import classnames from 'classnames';
import useScrollTop from '../../hooks/useScrollTop';

const tabs: {
  name?: string;
  link?: string;
  icon?: ReactNode;
}[] = [
  {
    link: '/home',
    name: '主页'
  },
  {
    link: '/tags',
    name: '标签'
  },
  {
    link: '/time-line',
    name: '时间线'
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
      className={classnames('h-20 w-full fixed z-10 duration-700', {
        ['bg-none text-white']: isHeaderScrollTop,
        ['opacity-1 text-black bg-white shadow-lg ']: !isHeaderScrollTop
      })}
    >
      <nav className="h-full mx-2 md:mx-40 flex justify-between items-center">
        <Link href="/">
          <a className="ml-5 md:text-2xl">{`BLOG`}</a>
        </Link>
        <ul className="float-right text-sm md:text-base">
          {tabs.map(({ name, link }) => (
            <li className="float-left ml-8" key={link}>
              <Link href={link}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
          <li className="float-left ml-8">
            <a href="https://github.com/xlz-cloud/blog" target="_black">
              <GitHub
                className="hidden md:block transform translate-y-px w-6 h-6"
                fill={isHeaderScrollTop ? 'white' : 'black'}
              />
            </a>
          </li>
          <li className="float-left ml-8 " onClick={onClick}>
            {isDark ? (
              <BlackMode
                className="cursor-pointer w-4 h-4 md:w-6 md:h-6 transform translate-y-px text-white"
                fill={isHeaderScrollTop ? 'white' : 'black'}
              />
            ) : (
              <WhiteMode
                fill={isHeaderScrollTop ? 'white' : 'black'}
                className="cursor-pointer  w-4 h-4 md:w-6 md:h-6 transform translate-y-px text-white"
              />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
