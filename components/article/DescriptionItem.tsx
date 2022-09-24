import Link from 'next/link';
import { formmatDatetime } from '../../libs/date';
import type { StaticDataProps } from '../../types/interface';

interface DescriptionItemProps extends Omit<StaticDataProps, 'tags'> {
  tags: { name: string; color: string }[];
}

const DescriptionItem: React.FC<{ itemData: DescriptionItemProps }> = ({ itemData }) => (
  <Link href="/[id]" as={`/${itemData.id}`}>
    <a>
      <div className="description-container">
        <h1 className="description-container-title" title={itemData.title}>
          {itemData.title}
        </h1>
        <p className="description-container-date">{formmatDatetime(itemData.date)}</p>
        {itemData.tags.map(tag => (
          <Link href="/tags" key={tag.name}>
            <span key={tag.name} className="description-container-tag" style={{ color: tag.color }}>
              {tag.name}
            </span>
          </Link>
        ))}
        <p className="description-container-note" title={itemData.description}>
          {itemData.description}
        </p>
      </div>
    </a>
  </Link>
);

export default DescriptionItem;
