import { Meta } from '@storybook/react';
import { Flex } from '../Flex';
import { Text } from './Text';

/**
 * Typography helps establish hierarchy and communicate important content by creating clear visual patterns.
 *
 * Reference: https://polaris.shopify.com/components/typography/text
 */
const meta = {
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;

export const Variants = () => (
  <Flex direction="column" gap={8}>
    <Text as="h1" variant="heading4xl">
      Text with Heading4xl variant
    </Text>
    <Text as="h2" variant="heading3xl">
      Text with Heading3xl variant
    </Text>
    <Text as="h3" variant="heading2xl">
      Text with Heading2xl variant
    </Text>
    <Text as="h4" variant="headingXl">
      Text with HeadingXl variant
    </Text>
    <Text as="h5" variant="headingLg">
      Text with HeadingLg variant
    </Text>
    <Text as="h6" variant="headingMd">
      Text with HeadingMd variant
    </Text>
    <Text as="h6" variant="headingSm">
      Text with HeadingSm variant
    </Text>
    <Text as="h6" variant="headingXs">
      Text with HeadingXs variant
    </Text>
    <Text as="p" variant="bodyLg">
      Text with BodyLg variant
    </Text>
    <Text as="p" variant="bodyMd">
      Text with BodyMd variant
    </Text>
    <Text as="p" variant="bodySm">
      Text with BodySm variant
    </Text>
  </Flex>
);

export const WithAlignment = () => (
  <Flex direction="column" gap={8}>
    <Text as="p" variant="bodyLg" alignment="start">
      Manage your Shopify store on-the-go with real-time notifications, access
      to your dashboard, and order management, all from your smartphone.
    </Text>
    <Text as="p" variant="bodyLg" alignment="center">
      Manage your Shopify store on-the-go with real-time notifications, access
      to your dashboard, and order management, all from your smartphone.
    </Text>
    <Text as="p" variant="bodyLg" alignment="end">
      Manage your Shopify store on-the-go with real-time notifications, access
      to your dashboard, and order management, all from your smartphone.
    </Text>
    <Text as="p" variant="bodyLg" alignment="justify">
      Manage your Shopify store on-the-go with real-time notifications, access
      to your dashboard, and order management, all from your smartphone.
    </Text>
  </Flex>
);

export const WithFontWeight = () => (
  <Flex direction="column" gap={8}>
    <Text as="p" variant="bodyMd" fontWeight="bold">
      Sales this year
    </Text>
    <Text as="p" variant="bodyMd" fontWeight="semibold">
      Sales this year
    </Text>
    <Text as="p" variant="bodyMd" fontWeight="medium">
      Sales this year
    </Text>
    <Text as="p" variant="bodyMd" fontWeight="regular">
      Sales this year
    </Text>
  </Flex>
);

export const WithColor = () => (
  <Flex direction="column" gap={8}>
    <Text as="p" variant="bodyMd" color="subdued">
      Use to de-emphasize a piece of text that is less important to merchants
      than other nearby text. May also be used to indicate when normal content
      is absent, for example, “No supplier listed”. Don’t use only for aesthetic
      effect.
    </Text>
    <Text as="p" variant="bodyMd" color="success">
      Use in combination with a symbol showing an increasing value to indicate
      an upward trend.
    </Text>
    <Text as="p" variant="bodyMd" color="warning">
      Use to denote something that needs attention, or that merchants need to
      take action on.
    </Text>
    <Text as="p" variant="bodyMd" color="critical">
      Use in combination with a symbol showing a decreasing value to indicate a
      downward trend.
    </Text>
    <div style={{ backgroundColor: 'var(--text)', width: 'fit-content' }}>
      <Text as="p" variant="bodyMd" color="text-inverse">
        Use in situations where background is dark.
      </Text>
    </div>
  </Flex>
);

export const WithTruncate = () => (
  <Text as="p" variant="bodyMd" truncate>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt vel
    lorem nec pretium. Vestibulum ante ipsum primis in faucibus orci luctus et
    ultrices posuere cubilia curae; Morbi sollicitudin ex nec imperdiet
    pellentesque. Etiam dapibus ipsum non ligula molestie rhoncus. Vivamus eget
    iaculis lectus. Sed porttitor leo at nulla mollis malesuada. Vestibulum ante
    ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
    Vestibulum vestibulum porttitor mollis. Nam dictum ante sed lobortis
    commodo. Ut luctus ut metus vel bibendum.
  </Text>
);
