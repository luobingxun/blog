import dayjs from 'dayjs';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import DescriptionItem from '../components/home/DescriptionItem';
import Layout from '../components/Layout';
import { formmatDatetime } from '../libs/date';
import { getColor } from '../libs/getColor';
import { getHomeDescription } from '../libs/getHomeDescription';
import type { StaticDataProps } from '../types/interface';

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ homeData }) => {
  const topData = homeData.sort((prev, next) => dayjs(prev.date).unix() - dayjs(next.date).unix()).slice(0, 5);
  return (
    <Layout description="" keywords="" title="" BGTitle={<h1 className="text-white text-xl md:text-3xl">主页</h1>}>
      <div className="flex m-auto z-10 py-2 md:py-4  article-panel dark:bg-black">
        <ul className="mx-2 md:mx-4 flex-1 bg-white rounded flex-1 ">
          <h1 className="text-base p-4 border-b border-gray-200 ">系列文章</h1>
          {homeData.map(v => (
            <li key={v.id}>
              <DescriptionItem itemData={v} />
            </li>
          ))}
        </ul>
        <div className=" hidden md:block w-60 h-80 bg-white sticky top-24 rounded divide-y">
          <h3 className="text-base p-4">最新发布</h3>
          <ul className="text-sm">
            {topData.map(v => (
              <Link href="/[id]" as={`/${v.id}`} key={v.id}>
                <a>
                  <li
                    className="py-2 px-4 w-full truncate text-gray-600 hover:bg-gray-50 flex flex-col justify-center"
                    key={v.id}
                    title={v.title}
                  >
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
  const homeData: StaticDataProps[] = (await getHomeDescription()) ?? [];
  const finalData = homeData.map(v => ({
    ...v,
    tags: v.tags.map(i => ({ name: i, color: getColor() }))
  }));

  return {
    props: { homeData: finalData },
    notFound: false
  };
};
