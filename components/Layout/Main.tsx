import React, { ReactNode, useEffect, useState } from 'react';

import styles from '../index.module.css';
import classNames from 'classnames';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
  BGTitle?: ReactNode;
}

const Main: React.FC<LayoutProps> = ({ children, BGTitle }) => {
  const { pathname } = useRouter();
  const isIndex = pathname === '/';

  return (
    <main>
      <div
        className={classNames('pt-20', styles.main, {
          ['h-96 flex justify-center items-center']: !isIndex,
          ['h-screen ']: isIndex
        })}
      >
        {isIndex ? (
          <div className="h-full relative overflow-hidden">{children}</div>
        ) : (
          <div className="transform -translate-y-10">{BGTitle}</div>
        )}
      </div>
      {!isIndex && (
        <div className="relative" style={{ minHeight: 'calc(100vh - 24rem - 9rem' }}>
          {children}
        </div>
      )}
    </main>
  );
};

export default Main;
