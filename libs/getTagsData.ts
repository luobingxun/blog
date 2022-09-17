import type { StaticDataProps } from '../types/interface';

interface TagsDataProps {
  tag: string;
  info: {
    id: string;
    title: string;
  }[];
}

const getTagsData = (originData: StaticDataProps[]): TagsDataProps[] => {
  return originData
    .map(item =>
      item.tags.map(v => ({
        tag: v,
        id: item.id,
        title: item.title
      }))
    )
    .flat()
    .reduce((acc, curr) => {
      const memoTag = acc.find(v => v.tag === curr.tag);
      if (memoTag) {
        memoTag.info = [...memoTag.info, { title: curr.title, id: curr.id }];
        return acc;
      } else {
        return [...acc, { tag: curr.tag, info: [{ title: curr.title, id: curr.id }] }];
      }
    }, []);
};

export { getTagsData };
