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
    <Layout description="" keywords="" title="" BGTitle={<h1 className="tags-title">标签</h1>}>
      <div className="tags-container">
        <h1 className="tags-container-title ">标签</h1>
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
            <ol className="list-none mt-20">
              {tagsData.map((v, idx) => (
                <li key={v.tag}>
                  <div className="flex items-center clear-left">
                    <span className="flex-1 h-px bg-gray-200"></span>
                    <h3
                      className="tags-container-tag"
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
                          <a className="tags-article-link">{i.title}</a>
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
