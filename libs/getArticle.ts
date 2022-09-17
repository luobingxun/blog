import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// import html from 'remark-html';
import { remark } from 'remark';

const postsDirectory = path.join(process.cwd(), 'docs');

const getArticle = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // const matterResult = matter(fileContents);
  // const processedContent = await remark().process(matterResult.content);
  // const contentHtml = processedContent.toString();

  return {
    id,
    content: fileContents,
    data: {}
  };
};

export { getArticle };
