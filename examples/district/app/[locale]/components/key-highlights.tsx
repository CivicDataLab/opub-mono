import { Text } from 'opub-ui';

const content = [
  {
    value: '21',
    label: 'No. of Districts',
  },

  {
    value: '21',
    label: 'No. of sub-divisions',
  },

  {
    value: '21',
    label: 'No. of sub-Districts',
  },

  {
    value: '21',
    label: 'No. of development blocks',
  },
];

export const KeyHighlights = () => {
  return (
    <section className="pt-4 md:pt-10">
      <Text variant="headingLg" fontWeight="semibold" color="subdued">
        Key Highlights of Assam
      </Text>

      <div className="flex gap-4 flex-wrap mt-4">
        {content.map((item) => (
          <div
            key={item.label}
            className="flex flex-col grow gap-3 p-4 rounded-1 bg-surfaceHighlightSubdued border-1 border-solid border-borderHighlightDefault"
          >
            <Text variant="headingXl">{item.value}</Text>
            <Text
              variant="headingSm"
              color="subdued"
              className="uppercase"
              fontWeight="medium"
            >
              {item.label}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
};
