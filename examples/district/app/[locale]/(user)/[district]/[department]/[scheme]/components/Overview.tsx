import { Text } from 'opub-ui';
import { BarChart } from 'opub-viz';

import { ContentCard, ProgressCard } from '../../components/Card';
import { IOverview } from './scheme-layout';

export const Overview = ({ data }: { data: IOverview }) => {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <Text variant="heading2xl" as="h3">
          {data.targetTitle}
        </Text>
        <div className="mt-6 flex flex-wrap gap-4">
          {data.targets.map((target, index) => {
            return (
              <ProgressCard
                key={index}
                value={target.value}
                label={target.label}
                description={target.description}
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
          {data.profiles.map((profile, index) => {
            return (
              <div
                key={index}
                className="flex flex-col md:basis-1/3 grow p-4 rounded-05 border-1 border-solid border-borderSubdued"
              >
                <Text variant="bodyLg" fontWeight="medium">
                  {profile.label}
                </Text>
                <>
                  <BarChart
                    xAxis={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                    data={[120, 200, 150, 80, 70, 110, 130]}
                  />
                </>
                <Text variant="bodyMd">{profile.description}</Text>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <Text variant="heading2xl" as="h3">
          {data.performanceTitle}
        </Text>
        <div className="mt-6 flex flex-wrap gap-4">
          {data.performances.map((profile, index) => {
            return (
              <ContentCard
                key={index}
                value={profile.value}
                label={profile.label}
                description={profile.description}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};
