import Image from 'next/image';
import { Text } from 'opub-ui';

import { ContentCard, ProgressCard } from '../../components/Card';
import { overview } from '../scheme.config';

export const Overview = () => {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <Text variant="heading2xl" as="h3">
          {overview.targetTitle}
        </Text>
        <div className="mt-6 flex flex-wrap gap-4">
          {overview.targets.map((target, index) => {
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
          {overview.profileTitle}
        </Text>
        <div className="mt-6 flex flex-wrap gap-4">
          {overview.profiles.map((profile, index) => {
            return (
              <div
                key={index}
                className="flex flex-col md:basis-1/3 grow gap-3 p-4 rounded-05 border-1 border-solid border-borderSubdued"
              >
                <Text variant="bodyLg" fontWeight="medium">
                  {profile.label}
                </Text>
                <Image src={profile.image} alt="" width={472} height={220} />
                <Text variant="bodyMd">{profile.description}</Text>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <Text variant="heading2xl" as="h3">
          {overview.performanceTitle}
        </Text>
        <div className="mt-6 flex flex-wrap gap-4">
          {overview.performances.map((profile, index) => {
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
