/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n": types.RevenueCircleTableDocument,
    "\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n": types.IndicatorsDocument,
    "\nquery dataTimePeriods{\n  getDataTimePeriods {\n    value\n  }\n}\n": types.DataTimePeriodsDocument,
    "\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n    }\n  }\n": types.GetGeographyDataDocument,
    "\nquery getDistrictchartdata ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!) {\n  districtChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) \n}\n": types.GetDistrictchartdataDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n"): (typeof documents)["\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n"): (typeof documents)["\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery dataTimePeriods{\n  getDataTimePeriods {\n    value\n  }\n}\n"): (typeof documents)["\nquery dataTimePeriods{\n  getDataTimePeriods {\n    value\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getDistrictchartdata ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!) {\n  districtChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) \n}\n"): (typeof documents)["\nquery getDistrictchartdata ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!) {\n  districtChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) \n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;