import Image from 'next/image';
import { Text } from 'opub-ui';

export const FocusSection = () => {
  return (
    <section className=" align-center items-centre flex w-full flex-row gap-52 bg-backgroundSolidDark py-56 pl-72 pr-72">
      <div className="align-center flex h-[119px] w-[1184px] flex-row items-center gap-40 py-12">
        <div className=" text-textOnBG">
          <Image
            src="/logo/logo.svg"
            width={400}
            height={104}
            alt="Assam DRR Dashboard"
          />
        </div>
        <div className="flex-col">
          <Text
            className="text-surfaceDefault"
            variant="headingXl"
            fontWeight="medium"
          >
            A dashboard for data-driven disaster risk reduction. Discover
            insights, assess risks, and empower action towards disaster
            resilience!
          </Text>
        </div>
      </div>
    </section>
  );
};
