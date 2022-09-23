import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

const Index = () => {
  return (
    <Layout title="" description="" hasFooter={false} keywords="">
      <div className="home-text">
        <p className="text-xl md:text-4xl ">活着就要学习，学习不是为了活着。</p>
        <p className="md:text-3xl mt-6">每一刻的学习，只为更好的成长 。</p>
        <p className="mt-8 ">
          <Link href="/home">
            <button className="btn">立即阅读</button>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Index;
