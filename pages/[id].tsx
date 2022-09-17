import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { getArticle } from '../libs/getArticle';
import { getHomeDescription } from '../libs/getHomeDescription';
import type { StaticDataProps } from '../types/interface';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/a11y-dark.css';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import remarkGfm from 'remark-gfm'; // markdown 对表格/删除线/脚注等的支持
import MarkNav from 'markdown-navbar'; // markdown 目录
import 'markdown-navbar/dist/navbar.css';

hljs.registerLanguage('javascript', javascript);

const Article: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ content, title }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <Layout description="" keywords="" title="" BGTitle={<h1 className="layout-title">{title}</h1>}>
      <div className="article-container">
        <article className="article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
        <div className="category">
          <h3 className="category-title">目录</h3>
          <div className="category-nav">
            <MarkNav headingTopOffset={-300} className="toc-list" source={content} ordered={false} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;

export const getStaticPaths: GetStaticPaths = async () => {
  const homeData: StaticDataProps[] = await getHomeDescription();
  const paths = homeData.map(v => ({ params: { id: v.id } }));
  return {
    paths: paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const title = (await getHomeDescription()).find(v => v.id === params.id).title;
  const articleData = await getArticle(params.id as string);

  if (!articleData) {
    return {
      notFound: true
    };
  }

  return {
    props: { ...articleData, title }
  };
};
