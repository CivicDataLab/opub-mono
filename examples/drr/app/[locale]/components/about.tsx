import { Text } from 'opub-ui';

export function About() {
  return (
    <section className=" flex h-[570px] w-full flex-col items-center justify-center bg-backgroundSolidDark px-16 py-12 ">
      <section className="flex gap-80 self-stretch text-surfaceDefault">
        <div className="flex w-[590px] flex-col items-start gap-5">
          <Text
            className="text-surfaceDefault"
            variant="headingXl"
            fontWeight="bold"
          >
            About IDS DRR
          </Text>
          <Text
            className="text-surfaceDefault"
            variant="bodyLg"
            fontWeight="regular"
          >
            Intelligent Data Solution for Disaster Risk Reduction is an
            initiative to create data-driven solutions to address disaster
            related issues.
          </Text>

          <Text
            className="gap-5 text-surfaceDefault"
            variant="bodyLg"
            fontWeight="regular"
          >
            <p>
              Under this initiative we at CivicDataLab have created data models
              to assess flood preparedness levels of different districts in
              Assam.
            </p>
          </Text>

          <Text
            className="gap-5 text-surfaceDefault"
            variant="bodyLg"
            fontWeight="regular"
          >
            <p>
              The data model outputs are now available on this easy-to-use
              dashboard for decision-makers to consume the insights on a near
              real-time basis. The insights from our data model can assist the
              Government authorities in identifying high risk regions within
              Assam, and in streamlining funds where they are needed the most.
            </p>
          </Text>
        </div>
        <div>IMAGE</div>
      </section>
    </section>
  );
}
