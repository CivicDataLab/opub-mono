import { Text } from 'opub-ui';

import {
  AboutText,
  AboutTextContentOne,
  AboutTextContentThree,
  AboutTextContentTwo,
} from '@/config/consts';

export function About() {
  return (
    <section className=" flex h-[570px] w-full flex-col items-center justify-center bg-backgroundSolidDark px-16 py-12 ">
      <div className="flex gap-80 self-stretch text-surfaceDefault">
        <div className="flex flex-col items-start gap-5 px-24">
          <Text
            className="text-surfaceDefault"
            variant="headingXl"
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
        <div>IMAGE</div>
      </div>
    </section>
  );
}
