'use client';

import { useQuery } from '@tanstack/react-query';
import { Select, Table, Text } from 'opub-ui';

import { ANALYTICS_TABLE_DATA } from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { MapComponent } from './ChoroplethMap';
import { Checkbox, Separator, IconButton } from 'opub-ui';
import {Icons} from '@/components/icons';

export function Content() {
  const { data } = useQuery([`district_table_data`], () =>
    GraphQL('analytics', ANALYTICS_TABLE_DATA)
  );

  const twoIndicators = [
    {
      label:'District boundaries',
      value:'District boundaries'
    },
    {
      label:'Revenue boundaries',
      value:'Revenue boundaries'
    },

  ]
  const columnData = [
    {
      accessorKey: 'district',
      header: 'District',
    },
    {
      accessorKey: 'govt_resp',
      header: 'Coping Capacity: gov',
    },
    {
      accessorKey: 'demo_vul',
      header: 'Demo Vulnerability',
    },
    {
      accessorKey: 'fld_proneness',
      header: 'Flood Proneness',
    },
    {
      accessorKey: 'flood_damages',
      header: 'Flood Damages',
    },
    {
      accessorKey: 'infr_access',
      header: 'Infra Access',
    },
    {
      accessorKey: 'prep_need',
      header: 'Need for Preparedness',
    },
  ];

  const frimsData = [
    {
      accessorKey: 'District',
      header: 'Districts',
    },
    {
      accessorKey: 'Population affected',
      header: 'Population Affected',
    },
    
    
  ];

  return (
    <div className="w-full h-full grid gap-4 grid-rows-2">
      
      <div className="flex flex-col">
      {/* <div className="flex items-start self-stretch"> */}

        <div className="flex flex-col items-start self-stretch gap-4">
            <div className="flex flex-row ">
                <h1>NEED FOR PREPAREDNESS</h1>
                <IconButton
                    color="highlight"
                    icon={Icons.info}
                    >
                    Info
                </IconButton>
            </div>

            <h1>Time Period: September 2022 </h1>
            
        </div>

        <Separator />
        
        <div className='flex flex-col'>

              <div className='flex flex-row' >
                {twoIndicators.map((indicator, index) =>
                <Checkbox
                        key={index}
                        value={indicator.value}
                        name="checkbox"
                        title="Select an indicator"
                      >
                        {indicator.label}
                </Checkbox>
                )}
              </div>

              <Select
                defaultValue="Select district"
                label=""
                name="select-1"
                // onChange={function Yu(){}}

                options={[
                  {
                    label: 'Select district',
                    value: 'Select district'
                  },
                  {
                    label: 'Bajali',
                    value: 'Bajali'
                  },
                  {
                    label: 'Baksa',
                    value: 'Baksa'
                  },
                  {
                    label: 'Barpeta',
                    value: 'Barpeta'
                  }
                ]}
              />

        </div>

        <div className="flex flex-row">
        {/* <div className="flex flex-row items-start self-stretch"> */}

            {/* <div className='flex flex-col '> */}

                <MapComponent />

            {/* </div> */}
            

            <div className='flex flex-col gap-4 w-72 px-3 py-3'>

                  <div className= "flex flex-row justify-between items-center self-stretch">
                    <Text variant='bodySm' fontWeight='bold'>Population affected(FRIMS)
                      <a href="">Switch</a>
                    </Text>
                  </div>
                  <Separator />

                  <Table
                    columnContentTypes={['text', 'text']}
                    columns={frimsData}
                    rows={data?.districtViewTableData}
                    hideFooter={true}
                  />

            </div>

        </div>
        
      </div>
      
      
      <Table
        columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
        columns={columnData}
        rows={data?.districtViewTableData}
      />
    </div>
  );
}
