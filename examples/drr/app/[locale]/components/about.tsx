import Image from 'next/image';
import { Text } from 'opub-ui';

import {
  AboutText,
  AboutTextContentOne,
  AboutTextContentThree,
  AboutTextContentTwo,
} from '@/config/consts';

export function About() {
  return (
    <section className="flex h-[649px] w-full justify-center gap-3 bg-backgroundSolidDark">
      <div className="flex items-center gap-20 text-surfaceDefault">
        <Image
          src="/logo/climateAction.png"
          height={537}
          width={506}
          alt="Assam DRR Dashboard"
        />

        <div className="flex w-[661px] flex-col gap-5">
          <Text
            className=" text-baseAmberSolid7"
            variant="heading3xl"
            fontWeight="bold"
          >
            {AboutText}
          </Text>
          <Text
            className="text-surfaceDefault"
            variant="bodyLg"
            fontWeight="regular"
          >
            {AboutTextContentOne}
          </Text>

          <Text
            className="gap-5 text-surfaceDefault"
            variant="bodyLg"
            fontWeight="regular"
          >
            {AboutTextContentTwo}
          </Text>

          <Text
            className="gap-5 text-surfaceDefault"
            variant="bodyLg"
            fontWeight="regular"
          >
            {AboutTextContentThree}
          </Text>
        </div>
      </div>
    </section>
  );
}
