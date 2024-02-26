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
    <section className=" px-30 flex h-[649px] w-full items-center justify-center gap-3 bg-backgroundSolidDark py-14">
      <div className="flex items-center justify-center gap-20 text-surfaceDefault">
        <div>
          <Image
            src="/logo/climateAction.png"
            height={537}
            width={506}
            alt="Assam DRR Dashboard"
          />
        </div>
        <div className=" flex w-[661px] flex-grow flex-col items-start gap-5">
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
