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

/** Department(id, name, description, slug, geography) */
export type Department = {
  __typename?: 'Department';
  description?: Maybe<Scalars['String']>;
  geography: Geography;
  name: Scalars['String'];
};

/** Geography(id, name, code, type, parentId) */
export type GeoFilter = {
  AND?: InputMaybe<GeoFilter>;
  OR?: InputMaybe<GeoFilter>;
  code?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Geography(id, name, code, type, parentId) */
export type Geography = {
  __typename?: 'Geography';
  code: Scalars['String'];
  name: Scalars['String'];
  parentId?: Maybe<Geography>;
  type: Scalars['String'];
};

/** Indicators(id, name, long_description, short_description, category, type, slug, unit, geography, department, data_source, scheme, parent) */
export type IndicatorFilter = {
  AND?: InputMaybe<IndicatorFilter>;
  OR?: InputMaybe<IndicatorFilter>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** Indicators(id, name, long_description, short_description, category, type, slug, unit, geography, department, data_source, scheme, parent) */
export type Indicators = {
  __typename?: 'Indicators';
  /** Contains a list of sub-indicators. */
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
  type: Scalars['String'];
  unit: Unit;
};

export type Query = {
  __typename?: 'Query';
  data: Array<Data>;
  districtViewTableData: Scalars['JSON'];
  geography: Array<Geography>;
  indicators: Array<Indicators>;
  indicatorsByCategory: Scalars['JSON'];
  revCricleViewTableData: Scalars['JSON'];
  scheme: Array<Scheme>;
};


export type QueryDistrictViewTableDataArgs = {
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter?: InputMaybe<IndicatorFilter>;
};


export type QueryGeographyArgs = {
  filters?: InputMaybe<GeoFilter>;
};


export type QueryRevCricleViewTableDataArgs = {
  geoFilter?: InputMaybe<GeoFilter>;
  indcFilter?: InputMaybe<IndicatorFilter>;
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
  symbol: Scalars['String'];
};

export type TableDataQueryVariables = Exact<{ [key: string]: never; }>;


export type TableDataQuery = { __typename?: 'Query', districtViewTableData: any };

export type IndicatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type IndicatorsQuery = { __typename?: 'Query', indicators: Array<{ __typename?: 'Indicators', name: string, slug?: string | null }> };

export type IndicatorsByQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IndicatorsByQueryQuery = { __typename?: 'Query', indicatorsByCategory: any };


export const TableDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tableData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"districtViewTableData"}}]}}]} as unknown as DocumentNode<TableDataQuery, TableDataQueryVariables>;
export const IndicatorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"indicators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indicators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<IndicatorsQuery, IndicatorsQueryVariables>;
export const IndicatorsByQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"indicatorsByQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indicatorsByCategory"}}]}}]} as unknown as DocumentNode<IndicatorsByQueryQuery, IndicatorsByQueryQueryVariables>;