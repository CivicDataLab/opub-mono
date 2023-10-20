'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { AnalyticsDashboardSidebar } from './analytics-sidebar';
import styles from './styles.module.scss';
import { Text, Button, IconButton } from 'opub-ui';
import Icons from '@/components/icons';


interface DashboardLayoutProps {
  children?: React.ReactNode;
}


export function AnalyticsDashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <React.Fragment>
      <div className='flex flex-row'>
        <div className='w-80 height-[1392px]'>
          <AnalyticsDashboardSidebar /> 
        </div>
          
        <div className='flex flex-col'>

          <div className='p-8 flex items-center self-stretch var(--20, 80px)'>
            <Text variant="headingLg">Assam DRR Analytics: Map Dashboard</Text>

            <IconButton
                  color="highlight"
                  icon={Icons.IconDatabaseShare}
                  >
                  Share
            </IconButton>

            <IconButton
                  color="highlight"
                  icon={Icons.download}
                  >
                  Download
            </IconButton>

            <Button>View Charts</Button>

          </div>

          <div
            className={cn(
              'relative grow min-h-[calc(100%_-_48px)]',
              'md:flex md:gap-1'
            )}
          >
            <main className={cn(styles.Main, 'md:max-w-[calc(100vw_-_260px)]')}>
              {children}
            </main>
          </div>

        </div>
        

      </div>
      
    </React.Fragment>
  );


  
}
