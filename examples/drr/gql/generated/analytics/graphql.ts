/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date with time (isoformat) */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type CustomDataPeriodList = {
  __typename?: 'CustomDataPeriodList';
  value: Scalars['String'];
};

/** Data(id, value, added, modified, indicator, geography, scheme, data_period) */
export type Data = {
  __typename?: 'Data';
  added: Scalars['DateTime'];
  dataPeriod?: Maybe<Scalars['String']>;
  geography: Geography;
  indicator: Indicators;
  scheme?: Maybe<Scheme>;
  value?: Maybe<Scalars['Int']>;
};

/** Data(id, value, added, modified, indicator, geography, scheme, data_period) */
export type DataFilter = {
  AND?: InputMaybe<DataFilter>;
  OR?: InputMaybe<DataFilter>;
  dataPeriod?: InputMaybe<Scalars['String']>;
};

/** Department(id, name, description, slug, geography) */
export type Department = {
  __typename?: 'Department';
  description?: Maybe<Scalars['String']>;
  geography: Geography;
  name: Scalars['String'];
};

/** Geography(id, name, code, type, parentId, geom) */
export type GeoFilter = {
  AND?: InputMaybe<GeoFilter>;
  OR?: InputMaybe<GeoFilter>;
  code?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Geography(id, name, code, type, parentId, geom) */
export type Geography = {
  __typename?: 'Geography';
  code?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentId?: Maybe<Geography>;
  type: Scalars['String'];
};

/** Indicators(id, name, long_description, short_description, category, type, slug, unit, geography, department, data_source, scheme, parent, display_order, is_visible) */
export type IndicatorFilter = {
  AND?: InputMaybe<IndicatorFilter>;
  OR?: InputMaybe<IndicatorFilter>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** Indicators(id, name, long_description, short_description, category, type, slug, unit, geography, department, data_source, scheme, parent, display_order, is_visible) */
export type Indicators = {
  __typename?: 'Indicators';
  /** Describes the type sub-indicators */
  category?: Maybe<Scalars['String']>;
  department?: Maybe<Department>;
  geography?: Maybe<Geography>;
  longDescription?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent?: Maybe<Indicators>;
  scheme?: Maybe<Scheme>;
  shortDescription?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  /** Defines the type of indicator that is Raw, Derived, etc. */
  type?: Maybe<Scalars['String']>;
  unit: Unit;
};

export type Query = {
  __typename?: 'Query';
  ChartIndicators: Scalars['JSON'];
  data: Array<Data>;
  districtChartData: Scalars['JSON'];
  districtMapData: Scalars['JSON'];
  districtViewTableData: Scalars['JSON'];
  geography: Array<Geography>;
  getDataTimePeriods: Array<CustomDataPeriodList>;
  indicators: Array<Indicators>;
  indicatorsByCategory: Scalars['JSON'];
  revCircleChartData: Scalars['JSON'];
  revCircleMapData: Scalars['JSON'];
  revCircleViewTableData: Scalars['JSON'];
  scheme: Array<Scheme>;
};


export type QueryDataArgs = {
  filters?: InputMaybe<DataFilter>;
};


export type QueryDistrictChartDataArgs = {
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};


export type QueryDistrictMapDataArgs = {
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};


export type QueryDistrictViewTableDataArgs = {
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};


export type QueryGeographyArgs = {
  filters?: InputMaybe<GeoFilter>;
};


export type QueryRevCircleChartDataArgs = {
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};


export type QueryRevCircleMapDataArgs = {
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};


export type QueryRevCircleViewTableDataArgs = {
  dataFilter: DataFilter;
  forMap?: Scalars['Boolean'];
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter: IndicatorFilter;
};

/** Scheme(id, name, description, slug, department) */
export type Scheme = {
  __typename?: 'Scheme';
  department?: Maybe<Department>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
};

/** Unit(id, name, description, symbol) */
export type Unit = {
  __typename?: 'Unit';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol?: Maybe<Scalars['String']>;
};

export type RevenueCircleTableQueryVariables = Exact<{
  indcFilter: IndicatorFilter;
  dataFilter: DataFilter;
  geoFilter?: InputMaybe<GeoFilter>;
}>;


export type RevenueCircleTableQuery = { __typename?: 'Query', revCircleViewTableData: any };

export type IndicatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type IndicatorsQuery = { __typename?: 'Query', indicators: Array<{ __typename?: 'Indicators', name: string, slug?: string | null, category?: string | null, parent?: { __typename?: 'Indicators', name: string } | null }> };

export type DataTimePeriodsQueryVariables = Exact<{ [key: string]: never; }>;


export type DataTimePeriodsQuery = { __typename?: 'Query', getDataTimePeriods: Array<{ __typename?: 'CustomDataPeriodList', value: string }> };

export type GetGeographyDataQueryVariables = Exact<{
  filters: GeoFilter;
}>;


export type GetGeographyDataQuery = { __typename?: 'Query', geography: Array<{ __typename?: 'Geography', name: string }> };


export const RevenueCircleTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"revenueCircleTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndicatorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"geoFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GeoFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revCircleViewTableData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indcFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indcFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"dataFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dataFilter"}}},{"kind":"Argument","name":{"kind":"Name","value":"geoFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geoFilter"}}}]}]}}]} as unknown as DocumentNode<RevenueCircleTableQuery, RevenueCircleTableQueryVariables>;
export const IndicatorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"indicators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indicators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<IndicatorsQuery, IndicatorsQueryVariables>;
export const DataTimePeriodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dataTimePeriods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDataTimePeriods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<DataTimePeriodsQuery, DataTimePeriodsQueryVariables>;
export const GetGeographyDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGeographyData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeoFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geography"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetGeographyDataQuery, GetGeographyDataQueryVariables>;