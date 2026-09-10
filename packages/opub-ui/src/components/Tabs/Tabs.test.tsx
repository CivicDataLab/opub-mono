import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IconFileSpreadsheet } from '@tabler/icons-react';

import { Tab, TabList, TabPanel, Tabs } from './Tabs';
import styles from './Tabs.module.scss';

describe('Tabs Tests', () => {
  test('should show Component text all the time', () => {
    render(<Tabs>Component</Tabs>);

    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });

  test('applies the boxed class on TabList when boxed is set', () => {
    render(
      <Tabs defaultValue="upload">
        <TabList boxed>
          <Tab value="upload" icon={IconFileSpreadsheet}>
            File Upload
          </Tab>
          <Tab value="api">API</Tab>
        </TabList>
        <TabPanel value="upload">Upload panel</TabPanel>
        <TabPanel value="api">API panel</TabPanel>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass(styles.boxed);
    expect(
      screen.getByRole('tab', { name: 'File Upload' })
    ).toBeInTheDocument();
    expect(screen.getByText('Upload panel')).toBeVisible();
  });
});
