import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="text-center">
        © 2022 | Proudly powered by&nbsp;
        <Link href="https://www.nextjs.cn/">
          <a className="underline text-red-600"> NEXT </a>
        </Link>
        &nbsp;Theme by&nbsp;
        <Link href="https://www.tailwindcss.cn/">
          <a className="underline text-red-600"> Tailwind </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
