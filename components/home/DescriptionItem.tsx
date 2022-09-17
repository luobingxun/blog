import Link from 'next/link';
import { formmatDatetime } from '../../libs/date';
import { getColor } from '../../libs/getColor';
import type { StaticDataProps } from '../../types/interface';

interface DescriptionItemProps extends Omit<StaticDataProps, 'tags'> {
  tags: { name: string; color: string }[];
}

const DescriptionItem: React.FC<{ itemData: DescriptionItemProps }> = ({ itemData }) => (
  <Link href="/[id]" as={`/${itemData.id}`}>
    <a>
      <div className="px-5 border-b border-gray-200 border-solid hover:bg-gray-50">
        <h1 className="text-base font-semibold mb-4 pt-4 truncate w-full" title={itemData.title}>
          {itemData.title}
        </h1>
        <p className="text-md mb-2 text-xs">{formmatDatetime(itemData.date)}</p>
        {itemData.tags.map(tag => (
          <Link href="/tags" key={tag.name}>
            <span
              key={tag.name}
              className="h-6 mb-2 inline-block box-border p-1 text-xs mr-1 bg-gray-100 rounded hover:underline"
              style={{ color: tag.color }}
            >
              {tag.name}
            </span>
          </Link>
        ))}
        <p className="pb-4 text-sm text-gray-600" title={itemData.description}>
          {itemData.description}
        </p>
      </div>
    </a>
  </Link>
);

export default DescriptionItem;
