import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Article from '../components/article';
import Layout from '../components/Layout';
import { getColor } from '../libs/getColor';
import { getHomeDescription } from '../libs/getHomeDescription';
import type { StaticDataProps } from '../types/interface';

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ articleData }) => {
  return (
    <Layout
      description=""
      keywords=""
      title=""
      BGTitle={<h1 className="article-title">如果你想攀登高峰，切莫把彩虹当作梯子。</h1>}
    >
      <div className="article-wrapper common-animation article-panel">
        <div className="border-b border-black dark:border-white mx-2">
          <h1 className="article-list-title">我写过的文章</h1>
          <div className="py-11">
            <p className="py-1">—— 以下下是我写过的一些文章，希望对你有帮助</p>
            <p className="py-1">—— 这些文章仅仅代表个人观点</p>
            <p className="py-1">—— 可以通过每个条目小的标签，查看对应文章的所属分类</p>
            <p className="py-1">
              —— 若有不对之处，欢迎到
              <a className="text-red-600 px-1 underline" href="https://github.com/xlz-cloud/blog" target="_black">
                GitHub
              </a>
              交流
            </p>
          </div>
        </div>
        <Article articleData={articleData} />
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
