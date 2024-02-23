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
    "\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n": types.RevCircleViewDataDocument,
    "\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n": types.DistrictViewDataDocument,
    "\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n": types.IndicatorsDocument,
    "\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n": types.DataTimePeriodsDocument,
    "\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n": types.GetDistrictRevCircleDocument,
    "\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n": types.RevenueCircleMapDataDocument,
    "\n  query factors {\n    getFactors\n  }\n": types.FactorsDocument,
    "\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n": types.DistrictMapDataDocument,
    "\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n": types.GetTimeTrendsDocument,
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
export function graphql(source: "\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"): (typeof documents)["\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"): (typeof documents)["\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n"): (typeof documents)["\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n"): (typeof documents)["\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n"): (typeof documents)["\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"): (typeof documents)["\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query factors {\n    getFactors\n  }\n"): (typeof documents)["\n  query factors {\n    getFactors\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"): (typeof documents)["\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"): (typeof documents)["\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;