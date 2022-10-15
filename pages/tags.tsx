import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { getColor } from '../libs/getColor';
import { getHomeDescription } from '../libs/getHomeDescription';
import { getTagsData } from '../libs/getTagsData';
import type { StaticDataProps } from '../types/interface';

const Tags: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tagsData, tagsColors }) => {
  const { query } = useRouter();

  const handleClick = tag => () => {
    window.scrollTo({
      top: (document.querySelector(`div[id="${tag}"]`) as HTMLDivElement).offsetTop + 220
    });
  };

  useEffect(() => {
    query.tag && handleClick(query.tag)();
  }, []);

  return (
    <Layout
      description=""
      keywords=""
      title=""
      BGTitle={<h1 className="tags-title">经验丰富的人，往往只知其然而不知其所以然。</h1>}
    >
      <div className="tags-container common-animation">
        <div className="border-b border-black dark:border-white">
          <h1 className="tags-container-title">已经存在的标签</h1>
          <div className="py-10">
            <p className="py-1">—— 以下为已经写过文章中存在的标签</p>
            <p className="py-1">—— 可以通过标签检索对应的文章</p>
            <p className="py-1">—— 每篇文章可能会包含在不同的标签中</p>
          </div>
        </div>

        <div className="mt-20 ">
          <div className="text-center">
            {tagsData.map((v, idx) => (
              <a
                key={v.tag}
                className="tags-container-link"
                style={{ color: tagsColors[idx] }}
                onClick={handleClick(v.tag)}
              >
                {v.tag}
              </a>
            ))}
          </div>

          {tagsColors.length === tagsData.length && (
            <ol className="list-none mt-20">
              {tagsData.map((v, idx) => (
                <li key={v.tag} className="bg-l-article-bg dark:bg-d-article-bg  my-14 rounded ">
                  <div className="relative" id={v.tag}>
                    <h3
                      className="tags-container-tag absolute -top-4 left-2 bg-l-article-bg"
                      style={{ color: tagsColors[idx] }}
                    >
                      {v.tag}
                    </h3>
                    <ol className="list-disc py-8 px-3">
                      {v.info.map(i => (
                        <li key={i.id} className="inline-block">
                          <Link href="/[id]" as={`/${i.id}`}>
                            <a className="tags-article-link">{i.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tags;

export const getStaticProps: GetStaticProps = async () => {
  const originData: StaticDataProps[] = (await getHomeDescription()) ?? [];

  const tagsData = getTagsData(originData);

  const tagsColors = tagsData.map(v => getColor());

  return {
    props: { tagsData, tagsColors },
    notFound: false
  };
};
