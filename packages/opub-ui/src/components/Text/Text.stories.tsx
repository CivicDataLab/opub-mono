import { Meta } from '@storybook/react-vite';

import { Text } from './Text';

/**
 * Typography helps establish hierarchy and communicate important content by creating clear visual patterns.
 *
 * Reference: https://polaris.shopify.com/components/typography/text
 */
const meta = {
  title: 'Components/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;

export const Variants = () => (
  <div className="flex flex-col gap-2">
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
    <Text as="h6" variant="headingSmSpaced">
      Text with headingSmSpaced variant
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
  </div>
);

export const WithAlignment = () => (
  <div className="flex flex-col">
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
  </div>
);

export const WithFontWeight = () => (
  <div className="flex flex-col">
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
  </div>
);

export const WithColor = () => (
  <div className="flex flex-col gap-1">
    <Text as="p" variant="bodyMd" color="default">
      Default Text is used to communicate the majority of information on the
    </Text>
    <Text as="p" variant="bodyMd" color="subdued">
      Subdued Text is used to create a hierarchy of information on the page.
    </Text>
    <Text as="p" variant="bodyMd" color="disabled">
      Disabled Text is used to indicate that a field is disabled and cannot be
      interacted with.
    </Text>
    <Text as="p" variant="bodyMd" color="success">
      Use to indicate that something was successful.
    </Text>
    <Text as="p" variant="bodyMd" color="warning">
      Use to indicate that something needs attention.
    </Text>
    <Text as="p" variant="bodyMd" color="critical">
      Use to indicate that something has failed.
    </Text>
    <Text as="p" variant="bodyMd" color="highlight">
      Highlight Text is used to highlight important information on the page.
    </Text>
    <Text as="p" variant="bodyMd" color="interactive">
      Interactive Text is used to indicate that something can be interacted
      with.
    </Text>
    <div
      style={{
        backgroundColor: 'var(--background-solid-dark)',
        width: 'fit-content',
      }}
    >
      <Text as="p" variant="bodyMd" color="onBgDefault">
        Use in situations where background is dark.
      </Text>
    </div>
    <div
      style={{
        backgroundColor: 'var(--background-solid-dark)',
        width: 'fit-content',
      }}
    >
      <Text as="p" variant="bodyMd" color="onBgDisabled">
        This is the disabled version for dark background
      </Text>
    </div>
  </div>
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
