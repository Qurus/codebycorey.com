import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import { FC } from 'react';

interface PageViewsProps {
  slug: string;
}

const PageViews: FC<PageViewsProps> = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);

  return <>{data?.total ? `${data.total} views` : '–––'}</>;
};

export default PageViews;
