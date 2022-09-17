import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="h-36 bg-white flex justify-center items-center">
      © 2022 | Proudly powered by&nbsp;
      <Link href="https://www.nextjs.cn/">
        <a className="underline"> NEXT </a>
      </Link>
      &nbsp;Theme by&nbsp;
      <Link href="https://www.tailwindcss.cn/">
        <a className="underline"> Tailwind </a>
      </Link>
    </footer>
  );
};

export default Footer;
