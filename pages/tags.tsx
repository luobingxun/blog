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
    const title: HTMLHtmlElement = document.querySelector(`h3[id="${tag}"]`);
    window.scrollTo({
      top: title.offsetTop + 220
    });
  };

  useEffect(() => {
    query.tag && handleClick(query.tag)();
  }, []);

  return (
    <Layout description="" keywords="" title="" BGTitle={<h1 className="tags-title">标签</h1>}>
      <div className="tags-container common-animation">
        <div className="border-b border-black mx-4">
          <h1 className="tags-container-title">已经存在的标签</h1>
          <div className="py-10 px-4">
            <p className="py-1">—— 以下为已经写过文章中存在的标签</p>
            <p className="py-1">—— 可以通过标签检索对应的文章</p>
            <p className="py-1">—— 每篇文章可能会包含在不同的标签中</p>
          </div>
        </div>

        <div className="mx-8 mt-20">
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
            <ol className="md:mx-8 list-none mt-20 ">
              {tagsData.map((v, idx) => (
                <li key={v.tag}>
                  <span className="mr-2">#</span>
                  <h3
                    className="tags-container-tag"
                    style={{ color: tagsColors[idx], scrollPaddingTop: 70 }}
                    id={v.tag}
                  >
                    {v.tag}
                  </h3>
                  <ol className="list-disc py-8 px-3">
                    {v.info.map(i => (
                      <li key={i.id} className="inline-block">
                        <Link href="/[id]" as={`/${i.id}`}>
                          <a className="tags-article-link ">{i.title}</a>
                        </Link>
                      </li>
                    ))}
                  </ol>
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
