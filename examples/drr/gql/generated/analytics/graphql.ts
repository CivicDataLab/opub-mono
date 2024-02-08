/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type CustomDataPeriodList = {
  __typename?: 'CustomDataPeriodList';
  value: Scalars['String'];
};

/** Data(id, value, added, modified, indicator, geography, scheme, data_period) */
export type DataFilter = {
  AND?: InputMaybe<DataFilter>;
  OR?: InputMaybe<DataFilter>;
  dataPeriod?: InputMaybe<Scalars['String']>;
  period?: InputMaybe<Scalars['String']>;
};

/** Geography(id, name, code, type, parentId, geom) */
export type GeoFilter = {
  AND?: InputMaybe<GeoFilter>;
  OR?: InputMaybe<GeoFilter>;
  code?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Indicators(id, name, long_description, short_description, category, type, slug, unit, geography, department, data_source, scheme, parent, display_order, is_visible) */
export type IndicatorFilter = {
  AND?: InputMaybe<IndicatorFilter>;
  OR?: InputMaybe<IndicatorFilter>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
<<<<<<< HEAD
  districtMapData: Scalars['JSON'];
  districtViewData: Scalars['JSON'];
  getDataTimePeriods: Array<CustomDataPeriodList>;
  getDistrictRevCircle: Scalars['JSON'];
  getFactors: Scalars['JSON'];
  getTimeTrends: Scalars['JSON'];
  indicators: Scalars['JSON'];
  revCircleMapData: Scalars['JSON'];
  revCircleViewData: Scalars['JSON'];
};

export type QueryDistrictMapDataArgs = {
=======
  data: Array<Data>;
  districtMapData: Scalars['JSON'];
  districtViewChartData: Scalars['JSON'];
  districtViewTableData: Scalars['JSON'];
  geography: Array<Geography>;
  getDataTimePeriods: Array<CustomDataPeriodList>;
  getDistrictRevCircle: Scalars['JSON'];
  getFactors: Scalars['JSON'];
  indicators: Array<Indicators>;
  indicatorsByCategory: Scalars['JSON'];
  revCircleMapData: Scalars['JSON'];
  revCircleViewChartData: Scalars['JSON'];
  revCircleViewTableData: Scalars['JSON'];
  scheme: Array<Scheme>;
};


export type QueryDataArgs = {
  filters?: InputMaybe<DataFilter>;
};


export type QueryDistrictMapDataArgs = {
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};


export type QueryDistrictViewChartDataArgs = {
>>>>>>> aa077d1c (add boundary selection to url)
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};

export type QueryDistrictViewDataArgs = {
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};

<<<<<<< HEAD
export type QueryGetDistrictRevCircleArgs = {
  geoFilter: GeoFilter;
};
=======
export type QueryGeographyArgs = {
  filters?: InputMaybe<GeoFilter>;
};

<<<<<<< HEAD
>>>>>>> c3f64ca2 (connect map data to map component)
=======
export type QueryGetDistrictRevCircleArgs = {
  geoFilter: GeoFilter;
};
>>>>>>> d9aebf85 (fix www/ user and listing)

<<<<<<< HEAD
export type QueryGetTimeTrendsArgs = {
  dataFilter: DataFilter;
  geoFilter: GeoFilter;
  indcFilter: IndicatorFilter;
};

<<<<<<< HEAD
export type QueryIndicatorsArgs = {
  indcFilter?: InputMaybe<IndicatorFilter>;
=======
=======

<<<<<<< HEAD
>>>>>>> aa077d1c (add boundary selection to url)
<<<<<<< HEAD
export type QueryGetDistrictRevCircleArgs = {
  geoFilter: GeoFilter;
};

=======
>>>>>>> 6714281 (connect map data to map component)

export type QueryRevCircleChartDataArgs = {
=======
export type QueryRevCircleMapDataArgs = {
>>>>>>> 3c894e8 (add boundary selection to url)
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
>>>>>>> c3f64ca2 (connect map data to map component)
};

<<<<<<< HEAD
export type QueryRevCircleMapDataArgs = {
=======

export type QueryRevCircleViewChartDataArgs = {
>>>>>>> aa077d1c (add boundary selection to url)
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};

export type QueryRevCircleViewDataArgs = {
  dataFilter: DataFilter;
  forMap?: Scalars['Boolean'];
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};

export type RevCircleViewDataQueryVariables = Exact<{
  indcFilter: IndicatorFilter;
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
}>;

export type RevCircleViewDataQuery = {
  __typename?: 'Query';
  revCircleViewData: any;
};

export type DistrictViewDataQueryVariables = Exact<{
  indcFilter: IndicatorFilter;
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
}>;

<<<<<<< HEAD
export type DistrictViewDataQuery = {
  __typename?: 'Query';
  districtViewData: any;
};
=======
export type DistrictViewTableDataQueryVariables = Exact<{
  indcFilter: IndicatorFilter;
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
}>;


export type DistrictViewTableDataQuery = { __typename?: 'Query', districtViewTableData: any };

export type IndicatorsQueryVariables = Exact<{ [key: string]: never; }>;
>>>>>>> aa077d1c (add boundary selection to url)

export type IndicatorsQueryVariables = Exact<{
  indcFilter?: InputMaybe<IndicatorFilter>;
}>;

export type IndicatorsQuery = { __typename?: 'Query'; indicators: any };

export type DataTimePeriodsQueryVariables = Exact<{ [key: string]: never }>;

export type DataTimePeriodsQuery = {
  __typename?: 'Query';
  getDataTimePeriods: Array<{
    __typename?: 'CustomDataPeriodList';
    value: string;
  }>;
};

export type GetDistrictRevCircleQueryVariables = Exact<{
  geoFilter: GeoFilter;
}>;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export type GetDistrictRevCircleQuery = {
=======
=======
>>>>>>> fd8977ed (fix www/ user and listing)
=======
>>>>>>> c3f64ca2 (connect map data to map component)
=======
>>>>>>> d9aebf85 (fix www/ user and listing)
=======
>>>>>>> aa077d1c (add boundary selection to url)
<<<<<<< HEAD
export type GetGeographyDataQuery = {
>>>>>>> d9a8add0 (connect map data to map component)
  __typename?: 'Query';
  getDistrictRevCircle: any;
};
=======

export type GetGeographyDataQuery = { __typename?: 'Query', geography: Array<{ __typename?: 'Geography', name: string, code?: string | null }> };
>>>>>>> 085dc798 (connect map data to map component)
=======
=======
>>>>>>> fa733bcd (connect map data to map component)
=======
>>>>>>> 8b3b2e92 (fix www/ user and listing)
=======
>>>>>>> d90db598 (add boundary selection to url)

export type GetGeographyDataQuery = { __typename?: 'Query', geography: Array<{ __typename?: 'Geography', name: string, code?: string | null }> };
=======
export type GetGeographyDataQuery = {
  __typename?: 'Query';
  geography: Array<{ __typename?: 'Geography'; name: string }>;
};
>>>>>>> 2c5b0dd (fix www/ user and listing)
<<<<<<< HEAD
>>>>>>> 03a733f2 (fix www/ user and listing)
=======
=======

export type GetGeographyDataQuery = { __typename?: 'Query', geography: Array<{ __typename?: 'Geography', name: string, code?: string | null }> };
>>>>>>> 6714281 (connect map data to map component)
<<<<<<< HEAD
>>>>>>> fa733bcd (connect map data to map component)
=======
=======
export type GetGeographyDataQuery = {
  __typename?: 'Query';
  geography: Array<{ __typename?: 'Geography'; name: string, code?: string | null }>;
};
>>>>>>> 058b95a (fix www/ user and listing)
<<<<<<< HEAD
>>>>>>> 8b3b2e92 (fix www/ user and listing)
=======
=======
>>>>>>> 3c894e8 (add boundary selection to url)
>>>>>>> d90db598 (add boundary selection to url)

<<<<<<< HEAD
export type RevenueCircleMapDataQueryVariables = Exact<{
=======
export type GetGeographyDataQuery = { __typename?: 'Query', geography: Array<{ __typename?: 'Geography', name: string, code?: string | null }> };

export type DistrictViewChartDataQueryVariables = Exact<{
>>>>>>> aa077d1c (add boundary selection to url)
  indcFilter: IndicatorFilter;
  dataFilter: DataFilter;
}>;

<<<<<<< HEAD
<<<<<<< HEAD
export type RevenueCircleMapDataQuery = {
  __typename?: 'Query';
  revCircleMapData: any;
};

<<<<<<< HEAD
<<<<<<< HEAD
export type FactorsQueryVariables = Exact<{ [key: string]: never }>;

export type FactorsQuery = { __typename?: 'Query'; getFactors: any };

export type DistrictMapDataQueryVariables = Exact<{
=======

export type DistrictViewChartDataQuery = { __typename?: 'Query', districtViewChartData: any };

export type RevenueCircleMapDataQueryVariables = Exact<{
>>>>>>> aa077d1c (add boundary selection to url)
  indcFilter: IndicatorFilter;
  dataFilter: DataFilter;
}>;

<<<<<<< HEAD
export type DistrictMapDataQuery = {
  __typename?: 'Query';
  districtMapData: any;
};

export type GetTimeTrendsQueryVariables = Exact<{
  indcFilter: IndicatorFilter;
  dataFilter: DataFilter;
  geoFilter: GeoFilter;
}>;

export type GetTimeTrendsQuery = { __typename?: 'Query'; getTimeTrends: any };

export const RevCircleViewDataDocument = {
=======
=======
>>>>>>> fd8977ed (fix www/ user and listing)
=======
export type GetDistrictchartdataQuery = { __typename?: 'Query', districtChartData: any };
=======

export type RevenueCircleMapDataQuery = { __typename?: 'Query', revCircleMapData: any };

export type FactorsQueryVariables = Exact<{ [key: string]: never; }>;


export type FactorsQuery = { __typename?: 'Query', getFactors: any };
>>>>>>> aa077d1c (add boundary selection to url)

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> c3f64ca2 (connect map data to map component)
<<<<<<< HEAD
<<<<<<< HEAD
export const RevenueCircleTableDocument = {
>>>>>>> d9a8add0 (connect map data to map component)
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'revCircleViewData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'indcFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IndicatorFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dataFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DataFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'geoFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GeoFilter' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'revCircleViewData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'indcFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'indcFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dataFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dataFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'geoFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'geoFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RevCircleViewDataQuery,
  RevCircleViewDataQueryVariables
>;
export const DistrictViewDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'districtViewData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'indcFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IndicatorFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dataFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DataFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'geoFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GeoFilter' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'districtViewData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'indcFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'indcFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dataFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dataFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'geoFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'geoFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DistrictViewDataQuery,
  DistrictViewDataQueryVariables
>;
export const IndicatorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'indicators' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'indcFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'IndicatorFilter' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indicators' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'indcFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'indcFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IndicatorsQuery, IndicatorsQueryVariables>;
export const DataTimePeriodsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'dataTimePeriods' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getDataTimePeriods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DataTimePeriodsQuery,
  DataTimePeriodsQueryVariables
>;
export const GetDistrictRevCircleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getDistrictRevCircle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'geoFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GeoFilter' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getDistrictRevCircle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'geoFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'geoFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDistrictRevCircleQuery,
  GetDistrictRevCircleQueryVariables
>;
export const RevenueCircleMapDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'revenueCircleMapData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'indcFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IndicatorFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dataFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DataFilter' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'revCircleMapData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'indcFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'indcFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dataFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dataFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RevenueCircleMapDataQuery,
  RevenueCircleMapDataQueryVariables
>;
<<<<<<< HEAD
export const FactorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'factors' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'getFactors' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FactorsQuery, FactorsQueryVariables>;
export const DistrictMapDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'districtMapData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'indcFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IndicatorFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dataFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DataFilter' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'districtMapData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'indcFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'indcFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dataFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dataFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DistrictMapDataQuery,
  DistrictMapDataQueryVariables
>;
export const GetTimeTrendsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getTimeTrends' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'indcFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IndicatorFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dataFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DataFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'geoFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GeoFilter' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getTimeTrends' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'indcFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'indcFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dataFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dataFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'geoFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'geoFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTimeTrendsQuery, GetTimeTrendsQueryVariables>;
=======
=======
=======
>>>>>>> 03a733f2 (fix www/ user and listing)
=======
>>>>>>> fa733bcd (connect map data to map component)
=======
>>>>>>> 8b3b2e92 (fix www/ user and listing)
export type GetDistrictchartdataQuery = { __typename?: 'Query', districtChartData: any };

=======
>>>>>>> 6714281 (connect map data to map component)
export type RevenueCircleMapDataQueryVariables = Exact<{
  indcFilter: IndicatorFilter;
  dataFilter: DataFilter;
}>;


export type RevenueCircleMapDataQuery = { __typename?: 'Query', revCircleMapData: any };

=======
>>>>>>> 058b95a (fix www/ user and listing)

export const RevenueCircleTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"revenueCircleTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"geoFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GeoFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revCircleViewTableData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"geoFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geoFilter"}}}]}]}}]} as unknown as DocumentNode<RevenueCircleTableQuery, RevenueCircleTableQueryVariables>;
export const DistrictViewTableDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"districtViewTableData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"geoFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GeoFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"districtViewTableData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"geoFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geoFilter"}}}]}]}}]} as unknown as DocumentNode<DistrictViewTableDataQuery, DistrictViewTableDataQueryVariables>;
export const IndicatorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"indicators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indicators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<IndicatorsQuery, IndicatorsQueryVariables>;
export const DataTimePeriodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dataTimePeriods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDataTimePeriods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<DataTimePeriodsQuery, DataTimePeriodsQueryVariables>;
<<<<<<< HEAD
<<<<<<< HEAD
export const GetGeographyDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGeographyData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeoFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geography"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<GetGeographyDataQuery, GetGeographyDataQueryVariables>;
export const GetDistrictchartdataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDistrictchartdata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"districtChartData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}}]}]}}]} as unknown as DocumentNode<GetDistrictchartdataQuery, GetDistrictchartdataQueryVariables>;
<<<<<<< HEAD
export const RevenueCircleMapDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"revenueCircleMapData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revCircleMapData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}}]}]}}]} as unknown as DocumentNode<RevenueCircleMapDataQuery, RevenueCircleMapDataQueryVariables>;
<<<<<<< HEAD
>>>>>>> 085dc798 (connect map data to map component)
<<<<<<< HEAD
>>>>>>> d9a8add0 (connect map data to map component)
=======
=======
=======
export const RevenueCircleTableDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'revenueCircleTable' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'indcFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IndicatorFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dataFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DataFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'geoFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GeoFilter' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'revCircleViewTableData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'indcFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'indcFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dataFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dataFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'geoFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'geoFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RevenueCircleTableQuery,
  RevenueCircleTableQueryVariables
>;
export const IndicatorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'indicators' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'indicators' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'parent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IndicatorsQuery, IndicatorsQueryVariables>;
export const DataTimePeriodsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'dataTimePeriods' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getDataTimePeriods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DataTimePeriodsQuery,
  DataTimePeriodsQueryVariables
>;
export const GetGeographyDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getGeographyData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filters' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GeoFilter' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'geography' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filters' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filters' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetGeographyDataQuery,
  GetGeographyDataQueryVariables
>;
export const GetDistrictchartdataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getDistrictchartdata' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'indcFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IndicatorFilter' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dataFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DataFilter' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'districtChartData' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'indcFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'indcFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dataFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dataFilter' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDistrictchartdataQuery,
  GetDistrictchartdataQueryVariables
>;
>>>>>>> 2c5b0dd (fix www/ user and listing)
<<<<<<< HEAD
>>>>>>> 03a733f2 (fix www/ user and listing)
<<<<<<< HEAD
>>>>>>> fd8977ed (fix www/ user and listing)
=======
=======
=======
export const RevenueCircleMapDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"revenueCircleMapData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revCircleMapData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}}]}]}}]} as unknown as DocumentNode<RevenueCircleMapDataQuery, RevenueCircleMapDataQueryVariables>;
>>>>>>> 6714281 (connect map data to map component)
<<<<<<< HEAD
>>>>>>> fa733bcd (connect map data to map component)
<<<<<<< HEAD
>>>>>>> c3f64ca2 (connect map data to map component)
=======
=======
=======
export const GetGeographyDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGeographyData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeoFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geography"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetGeographyDataQuery, GetGeographyDataQueryVariables>;
export const GetDistrictchartdataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDistrictchartdata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"districtChartData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}}]}]}}]} as unknown as DocumentNode<GetDistrictchartdataQuery, GetDistrictchartdataQueryVariables>;
>>>>>>> 058b95a (fix www/ user and listing)
<<<<<<< HEAD
>>>>>>> 8b3b2e92 (fix www/ user and listing)
<<<<<<< HEAD
>>>>>>> d9aebf85 (fix www/ user and listing)
=======
=======
=======
export const GetGeographyDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGeographyData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeoFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geography"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<GetGeographyDataQuery, GetGeographyDataQueryVariables>;
export const DistrictViewChartDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"districtViewChartData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"districtViewChartData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}}]}]}}]} as unknown as DocumentNode<DistrictViewChartDataQuery, DistrictViewChartDataQueryVariables>;
export const RevenueCircleMapDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"revenueCircleMapData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revCircleMapData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}}]}]}}]} as unknown as DocumentNode<RevenueCircleMapDataQuery, RevenueCircleMapDataQueryVariables>;
export const FactorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"factors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFactors"}}]}}]} as unknown as DocumentNode<FactorsQuery, FactorsQueryVariables>;
>>>>>>> 3c894e8 (add boundary selection to url)
>>>>>>> d90db598 (add boundary selection to url)
>>>>>>> aa077d1c (add boundary selection to url)
