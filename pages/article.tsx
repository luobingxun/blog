import dayjs from 'dayjs';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import DescriptionItem from '../components/article/DescriptionItem';
import Layout from '../components/Layout';
import { formmatDatetime } from '../libs/date';
import { getColor } from '../libs/getColor';
import { getHomeDescription } from '../libs/getHomeDescription';
import type { StaticDataProps } from '../types/interface';

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ articleData }) => {
  const topData = articleData.sort((prev, next) => dayjs(prev.date).unix() - dayjs(next.date).unix()).slice(0, 5);
  return (
    <Layout description="" keywords="" title="" BGTitle={<h1 className="article-title">文章</h1>}>
      <div className="article-wrapper common-animation article-panel">
        <ul className="article-list">
          <h1 className="article-list-title">系列文章</h1>
          {articleData.map(v => (
            <li key={v.id}>
              <DescriptionItem itemData={v} />
            </li>
          ))}
        </ul>
        <div className="article-side">
          <h3 className="text-base p-4">最新文章</h3>
          <ul className="text-sm">
            {topData.map(v => (
              <Link href="/[id]" as={`/${v.id}`} key={v.id}>
                <a>
                  <li className="article-side-item" key={v.id} title={v.title}>
                    <div className="inline-block">
                      <h3 className="font-normal text-sm ">{v.title}</h3>
                      <div className=" text-xs text-gray-600">{formmatDatetime(v.date)}</div>
                    </div>
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const articleData: StaticDataProps[] = (await getHomeDescription()) ?? [];
  const finalData = articleData.map(v => ({
    ...v,
    tags: v.tags.map(i => ({ name: i, color: getColor() }))
  }));

  return {
    props: { articleData: finalData },
    notFound: false
  };
};
