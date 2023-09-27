import styles from './carousel.module.scss';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Box, Carousel, Text } from 'opub-ui';
import React from 'react';

export function SummaryCarousel({
  indicatorList,
  displayLength = 8,
}: {
  indicatorList: { text: string; value: string }[];
  displayLength?: number;
}) {
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const [childrenLength, setChildrenLength] = React.useState(3);

  function current(data: number, length: number) {
    setCurrentSlide(data);
    setChildrenLength(length);
  }

  function chunk(items: any, size: any) {
    const chunks = [];
    items = [].concat(...items);

    while (items.length) {
      chunks.push(items.splice(0, size));
    }

    return chunks;
  }

  const variableNames = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const chunks = chunk(indicatorList, displayLength);
  const chunkedVariables: any = {};

  for (let i = 0; i < chunks.length && i < variableNames.length; i++) {
    chunkedVariables[variableNames[i]] = chunks[i];
  }

  return (
    <Box padding="5">
      <div className="flex justify-between">
        <Text as="h1" variant="headingXl" fontWeight="bold">
          <div className=" mb-2">Demographic highlights</div>
        </Text>
        <div className="rounded-sm p-2 bg-[color:var(--border-disabled)]">
          SHOWING 0{currentSlide} / 0{childrenLength}
        </div>
      </div>
      <div className={styles.Carousel}>
        <Carousel
          label=" "
          nextBtn={<IconArrowRight />}
          prevBtn={<IconArrowLeft />}
          current={current}
        >
          {Object.keys(chunkedVariables).map((variableName) => (
            <ul key={`list-${variableName}`}>
              {chunkedVariables[variableName]?.map(
                (item: any, index: number) => (
                  <li key={`summary-${variableName}-${index}`}>
                    <div></div>
                    <strong>{item.value}</strong>
                    <span>{item.text}</span>
                  </li>
                )
              )}
            </ul>
          ))}
        </Carousel>
      </div>
    </Box>
  );
}
