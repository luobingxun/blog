import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getColor } from '../libs/getColor';
import { getHomeDescription } from '../libs/getHomeDescription';
import { getTagsData } from '../libs/getTagsData';
import type { StaticDataProps } from '../types/interface';

const Tags: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tagsData, tagsColors }) => {
  const handleClick = tag => () => {
    const title: HTMLHtmlElement = document.querySelector(`h3[id="${tag}"]`);
    window.scrollTo({
      top: title.offsetTop + 300
    });
  };

  return (
    <Layout description="" keywords="" title="" BGTitle={<h1 className="text-white text-xl md:text-3xl">标签</h1>}>
      <div className="mx-2 md:mx-auto bg-white z-10 my-2 md:my-4 rounded tag-panel">
        <h1 className="text-base p-4 border-b border-gray-200 ">标签</h1>
        <div className="mx-8 mt-20">
          <div className="text-center">
            {tagsData.map((v, idx) => (
              <a
                key={v.tag}
                className="text-sm hover:bg-gray-200 transform hover:scale-105 inline-block 
                             box-border py-2 mb-3 cursor-pointer px-4 mx-2 bg-gray-100 rounded"
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
                <li key={v.tag}>
                  <div className="flex items-center clear-left">
                    <span className="flex-1 h-px bg-gray-200"></span>
                    <h3
                      className="text-center box-border py-2 px-4 text-sm bg-gray-100 rounded"
                      style={{ color: tagsColors[idx], scrollPaddingTop: 70 }}
                      id={v.tag}
                    >
                      {v.tag}
                    </h3>
                    <span className="flex-1 h-px bg-gray-100"></span>
                  </div>

                  <ol className="list-disc py-8">
                    {v.info.map(i => (
                      <li key={i.id} style={{ color: tagsColors[idx] }}>
                        <Link href="/[id]" as={`/${i.id}`}>
                          <a
                            className="py-2 text-sm box-border py-2 px-4 m-2 bg-gray-100 rounded 
                                       hover:underline hover:bg-gray-200 transform hover:scale-105 inline-block"
                          >
                            {i.title}
                          </a>
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
