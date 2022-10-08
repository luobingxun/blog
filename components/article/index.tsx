import Link from 'next/link';
import { formmatDatetime } from '../../libs/date';
import type { StaticDataProps } from '../../types/interface';

interface DescriptionItemProps extends Omit<StaticDataProps, 'tags'> {
  tags: { name: string; color: string }[];
}

const DescriptionItem: React.FC<{ articleData }> = ({ articleData }) => (
  <ul className="article-list">
    {articleData.map(itemData => (
      <li key={itemData.id}>
        <div className="description-container">
          <header className="flex justify-between">
            <Link href="/[id]" as={`/${itemData.id}`}>
              <a>
                <h1 className="description-container-title" title={itemData.title}>
                  {itemData.title}
                </h1>
              </a>
            </Link>
            <div className="description-container-date">{formmatDatetime(itemData.date)}</div>
          </header>
          {itemData.tags.map(tag => (
            <Link href={`/tags?tag=${tag.name}`} key={tag.name}>
              <span key={tag.name} className="description-container-tag" style={{ color: tag.color }}>
                {tag.name}
              </span>
            </Link>
          ))}
          <p className="description-container-note" title={itemData.description}>
            {itemData.description}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

export default DescriptionItem;
