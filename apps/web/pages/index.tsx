import {
  Box,
  Button,
  Calendar,
  Checkbox,
  CodeBlock,
  Divider,
  Flex,
  Icon,
  RangeCalendar,
  Select,
  Tag,
  Text,
} from '@opub-cdl/ui/src';
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import React from 'react';
import { switchTheme } from 'utils/helpers';
import styles from '../styles/pages/home.module.scss';
import { PropsVariationSection } from '../utils/helpers';

export default function Web() {
  const [selected, setSelected] = React.useState('Decrease');

  const handleSelectChange = React.useCallback(
    (value: string) => setSelected(value),
    []
  );

  const options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <Icon source={ChevronUpMinor} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <Icon source={ChevronDownMinor} />,
    },
  ];

  return (
    <div className={styles.container}>
      <Text variant="heading2xl" as="h1">
        Components
      </Text>

      <Spacer heading="Button">
        <Button primary onClick={switchTheme}>
          Primary
        </Button>
        <Button destructive>Secondary</Button>
        <Button disabled>Disabled</Button>
        <Button size="large">Large</Button>
        <Button size="slim">Slim</Button>
        <Button size="slim" url="#">
          Link
        </Button>
        <Button fullWidth>Fluid</Button>
      </Spacer>

      <Spacer heading="Calendar">
        <Calendar />
        <RangeCalendar />
      </Spacer>

      <Spacer heading="Tags" divider>
        <PropsVariationSection
          component={Tag}
          common={{ children: 'Tags' }}
          xAxis={{
            default: {},
            disabled: { disabled: true },
            'custom children': {
              children: (
                <Flex alignItems="center" gap={4}>
                  <span>Sun is up</span>
                </Flex>
              ),
            },
          }}
          yAxis={{
            default: {},
            'with remove': {
              onRemove: () => {
                console.log('Remove triggered');
              },
            },
            'with click': {
              onClick: () => {
                console.log('Remove triggered');
              },
            },
            'with link': {
              url: '#',
            },
            'removable with link': {
              url: '#',
              onRemove: () => {
                console.log('Remove triggered');
              },
            },
          }}
        />
      </Spacer>

      <Spacer heading="Checkbox">
        <PropsVariationSection
          withFormik
          component={Checkbox}
          common={{ children: 'Label' }}
          xAxis={{
            default: {},
            disabled: { disabled: true },
            error: { error: true },
          }}
          yAxis={{
            Unchecked: {},
            Checked: { checked: true },
            Indeterminate: { checked: 'indeterminate' },
          }}
        />
      </Spacer>

      <Spacer heading="Select">
        <Select
          label="Permission"
          options={options}
          onChange={handleSelectChange}
          value={selected}
        />
      </Spacer>

      <Spacer heading="Code Block">
        <CodeBlock
          shouldWrapLongLines
          language="js"
          text={`function createStyleObject(classNames, style) {
      return classNames.reduce((styleObject, className) => {
        return {...styleObject, ...style[className]};
      }, {});
    }
    
    function createClassNameString(classNames) {
      return classNames.join(' ');
    }
    
    // this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully
    
    function createChildren(style, useInlineStyles) {
      let childrenCount = 0;
      return children => {
        childrenCount += 1;
        return children.map((child, i) => createElement({
          node: child,
          style,
          useInlineStyles,
          key: 1
        }));
      }
    }
    
    function createElement({ node, style, useInlineStyles, key }) {
      const { properties, type, tagName, value } = node;
      if (type === "text") {
        return value;
      } else if (tagName) {
        const TagName = tagName;
        const childrenCreator = createChildren(style, useInlineStyles);
        const props = (
          useInlineStyles
          ? { style: createStyleObject(properties.className, style) }
          : { className: createClassNameString(properties.className) }
        );
        const children = childrenCreator(node.children);
        return <TagName key={key} {...props}>{children}</TagName>;
      }
    }`}
        />
      </Spacer>
    </div>
  );
}

const Spacer = ({ children, heading, divider }: any) => {
  return (
    <Box paddingBlockStart="8" paddingBlockEnd="4" width="fit-content">
      <Box paddingBlockEnd="2">
        <Text variant="headingLg" as="h2">
          {heading}
        </Text>
      </Box>
      <Flex alignItems="start" gap={16} wrap="wrap">
        {children}
      </Flex>
      {divider && <Divider borderStyle="divider" />}
    </Box>
  );
};
