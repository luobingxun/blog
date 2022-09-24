import Layout from '../components/Layout';
import { useEffect } from 'react';
import timeline from '../package/timeline/js/timeline';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getHomeDescription } from '../libs/getHomeDescription';
import type { StaticDataProps } from '../types/interface';
import dayjs from 'dayjs';
import Link from 'next/link';

const TimeLine: React.FC<InferGetStaticPropsType<GetStaticProps>> = ({ originData }) => {
  useEffect(() => {
    timeline(document.querySelectorAll('.timeline'), {
      forceVerticalMode: 800,
      mode: 'horizontal',
      visibleItems: 4
    });
  }, []);

  return (
    <Layout description="" keywords="" title="" BGTitle={<h1 className="time-line-title">时间线</h1>}>
      <div className="time-line-container common-animation">
        <h1 className="time-line-container-title">时间线</h1>
        <div className="timeline my-4">
          <div className="timeline__wrap">
            <div className="timeline__items">
              {originData.map(v => (
                <div className="timeline__item" key={v.id}>
                  <Link href="/[id]" as={`/${v.id}`}>
                    <a>
                      <div className="timeline__content time-line-container-link">
                        <h2>{v.date}</h2>
                        <h4>{v.title}</h4>
                        <p className="text-gray-600" style={{ fontSize: '0.875rem !important' }}>
                          {v.description}
                        </p>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TimeLine;

export const getStaticProps: GetStaticProps = async () => {
  const originData: StaticDataProps[] = ((await getHomeDescription()) ?? []).sort(
    (prev, next) => dayjs(next.date).unix() - dayjs(prev.date).unix()
  );

  return {
    props: {
      originData
    },
    notFound: false
  };
};
