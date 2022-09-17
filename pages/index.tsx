import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

const Index = () => {
  return (
    <Layout title="" description="" hasFooter={false} keywords="">
      <div className="absolute top-1/2  transform -translate-y-40 ml-16 md:ml-40 text-white whitespace-nowrap ">
        <p className="text-xl md:text-4xl ">活着就要学习，学习不是为了活着。</p>
        <p className="md:text-3xl mt-6">每一刻的学习，只为更好的成长 。</p>
        <p className="mt-8 ">
          <Link href="/home">
            <button className="border-2 border-white h-8 w-20 text-sm md:h-12 md:w-24 rounded-lg">立即阅读</button>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Index;
