import { Breadcrumbs } from 'opub-ui';

export const Content = ({
  data,
  schemeData,
}: {
  data: {
    breadcrumbs: {
      label: string;
      href: string;
    }[];
  };
  schemeData: {
    title: string;
  };
}) => {
  return (
    <div>
      <Breadcrumbs crumbs={data.breadcrumbs} />
    </div>
  );
};
