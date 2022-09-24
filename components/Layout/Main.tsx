import React from 'react';
import type { ReactNode } from 'react';
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
        className={classNames('main', {
          ['not-index']: !isIndex,
          ['is-index']: isIndex
        })}
      >
        {isIndex ? (
          <div className="is-index-container">{children}</div>
        ) : (
          <div className="not-index-bg title-animation">{BGTitle}</div>
        )}
      </div>
      {!isIndex && <div className="not-index-container">{children}</div>}
    </main>
  );
};

export default Main;
