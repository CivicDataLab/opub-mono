import { ContentCard, ProgressCard } from '../../components/Card';
import { IOverview } from './scheme-layout';
import { Text } from 'opub-ui';
import { BarChart } from 'opub-viz';

export const Overview = ({ data }: { data?: IOverview }) => {
  if (!data) return null;

  return (
    <div className="flex flex-col gap-12">
      <section>
        <Text variant="heading2xl" as="h3">
          {data.performanceTitle}
        </Text>
        <div className="mt-6 flex flex-wrap gap-4">
          {data.performances.map((performance, index) => {
            return (
              <SelectCard
                type={performance.type}
                key={index}
                data={performance}
              />
            );
          })}
        </div>
      </section>

      <section>
        <Text variant="heading2xl" as="h3">
          {data.profileTitle}
        </Text>
        <div className="mt-6 flex flex-wrap gap-4">
          {data.profiles &&
            data.profiles.map((profile, index) => {
              return (
                <SelectCard key={index} type={profile.type} data={profile} />
              );
            })}
        </div>
      </section>

      <section>
        <Text variant="heading2xl" as="h3">
          {data.targetTitle}
        </Text>
        <div className="mt-6 flex flex-wrap gap-4">
          {data.targets.map((target, index) => {
            return <SelectCard type={target.type} key={index} data={target} />;
          })}
        </div>
      </section>
    </div>
  );
};

function SelectCard({ type, data }: any) {
  switch (type) {
    case 'number':
      return (
        <ContentCard
          value={data.value}
          label={data.label}
          // description={data.description}
        />
      );
    case 'progress':
      return (
        <ProgressCard
          value={data.value}
          label={data.label}
          // description={data.description}
          min={data.min}
          max={data.max}
        />
      );
    case 'bar':
      return (
        <div className="flex flex-col md:basis-1/3 grow p-4 rounded-05 border-1 border-solid border-borderSubdued">
          <Text variant="bodyLg" fontWeight="medium">
            {data.label}
          </Text>
          <>
            <BarChart xAxis={data.data.xAxis} data={data.data.values} />
          </>
          {/* <Text variant="bodyMd">{data.description}</Text> */}
        </div>
      );
    default:
      return null;
  }
}
