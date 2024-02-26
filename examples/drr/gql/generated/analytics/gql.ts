/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as types from './graphql';

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 23414f70 (add css changes and fix revcircle query)
  '\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n':
    types.RevCircleViewDataDocument,
  '\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n':
    types.DistrictViewDataDocument,
  '\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n':
<<<<<<< HEAD
=======
  '\n  query revenueCircleTable(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewTableData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n':
    types.RevenueCircleTableDocument,
  '\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n':
    types.DistrictViewDataDocument,
  '\n  query indicators {\n    indicators {\n      name\n      slug\n      category\n      parent {\n        name\n      }\n    }\n  }\n':
>>>>>>> 60249c4c (right pane with one district)
=======
>>>>>>> 23414f70 (add css changes and fix revcircle query)
    types.IndicatorsDocument,
  '\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n':
    types.DataTimePeriodsDocument,
  '\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n':
    types.GetDistrictRevCircleDocument,
<<<<<<< HEAD
=======
  '\n  query districtViewChartData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtViewChartData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n':
    types.DistrictViewChartDataDocument,
>>>>>>> 23414f70 (add css changes and fix revcircle query)
  '\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n':
    types.RevenueCircleMapDataDocument,
  '\n  query factors {\n    getFactors\n  }\n': types.FactorsDocument,
  '\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n':
    types.DistrictMapDataDocument,
<<<<<<< HEAD
  '\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n':
    types.GetTimeTrendsDocument,
=======
    "\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n": types.RevenueCircleTableDocument,
    "\nquery districtViewTableData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  districtViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n": types.DistrictViewTableDataDocument,
    "\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n": types.IndicatorsDocument,
    "\nquery dataTimePeriods{\n  getDataTimePeriods {\n    value\n  }\n}\n": types.DataTimePeriodsDocument,
    "\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n      code\n    }\n  }\n": types.GetGeographyDataDocument,
    "\nquery districtViewChartData ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!) {\n  districtViewChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) \n}\n": types.DistrictViewChartDataDocument,
    "\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n": types.RevenueCircleMapDataDocument,
<<<<<<< HEAD
>>>>>>> d9a8add0 (connect map data to map component)
=======
    "\nquery factors{\n  getFactors\n}\n": types.FactorsDocument,
>>>>>>> aa077d1c (add boundary selection to url)
=======
  '\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n':
    types.RevenueCircleTableDocument,
  '\nquery districtViewTableData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  districtViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n':
    types.DistrictViewTableDataDocument,
  '\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n':
    types.IndicatorsDocument,
  '\nquery dataTimePeriods{\n  getDataTimePeriods {\n    value\n  }\n}\n':
    types.DataTimePeriodsDocument,
  '\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n      code\n    }\n  }\n':
    types.GetGeographyDataDocument,
  '\nquery districtViewChartData ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!) {\n  districtViewChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) \n}\n':
    types.DistrictViewChartDataDocument,
  '\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n':
    types.RevenueCircleMapDataDocument,
  '\nquery factors{\n  getFactors\n}\n': types.FactorsDocument,
  '\nquery districtMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  districtMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n':
    types.DistrictMapDataDocument,
>>>>>>> 3deda509 (add mapcomponent boundary filter)
=======
    "\n  query revenueCircleTable(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewTableData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n": types.RevenueCircleTableDocument,
    "\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n": types.DistrictViewDataDocument,
    "\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n": types.DataTimePeriodsDocument,
    "\n  query getDistrictRevCircle($geoFilter: GeoFilter!){\n    getDistrictRevCircle(geoFilter : $geoFilter)\n  }\n": types.GetDistrictRevCircleDocument,
    "\n  query districtViewChartData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtViewChartData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n": types.DistrictViewChartDataDocument,
    "\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n": types.RevenueCircleMapDataDocument,
    "\n  query factors {\n    getFactors\n  }\n": types.FactorsDocument,
    "\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n": types.DistrictMapDataDocument,
>>>>>>> 428be535 (update get geographies query)
=======
>>>>>>> 23414f70 (add css changes and fix revcircle query)
=======
=======
>>>>>>> de489a80 (remove districtchart data query)
=======
>>>>>>> d34f0afe (add build spec to check build status in PR)
    "\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n": types.RevCircleViewDataDocument,
    "\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n": types.DistrictViewDataDocument,
    "\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n": types.IndicatorsDocument,
    "\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n": types.DataTimePeriodsDocument,
    "\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n": types.GetDistrictRevCircleDocument,
    "\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n": types.RevenueCircleMapDataDocument,
    "\n  query factors {\n    getFactors\n  }\n": types.FactorsDocument,
    "\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n": types.DistrictMapDataDocument,
    "\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n": types.GetTimeTrendsDocument,
<<<<<<< HEAD
>>>>>>> 9feb229e (add ANALYTICS_TIME_TRENDS graphql query)
=======
=======
=======
>>>>>>> 7f6be3eb (add build spec to check build status in PR)
  '\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n':
    types.RevCircleViewDataDocument,
  '\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n':
    types.DistrictViewDataDocument,
  '\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n':
    types.IndicatorsDocument,
  '\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n':
    types.DataTimePeriodsDocument,
  '\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n':
    types.GetDistrictRevCircleDocument,
  '\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n':
    types.RevenueCircleMapDataDocument,
  '\n  query factors {\n    getFactors\n  }\n': types.FactorsDocument,
  '\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n':
    types.DistrictMapDataDocument,
<<<<<<< HEAD
>>>>>>> 88c8bcfa (remove districtchart data query)
<<<<<<< HEAD
>>>>>>> de489a80 (remove districtchart data query)
=======
=======
  '\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n':
    types.GetTimeTrendsDocument,
>>>>>>> 7f6be3eb (add build spec to check build status in PR)
>>>>>>> d34f0afe (add build spec to check build status in PR)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export function graphql(
<<<<<<< HEAD
  source: '\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'
): (typeof documents)['\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
export function graphql(
  source: '\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'
): (typeof documents)['\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'];
=======
export function graphql(source: "\nquery districtViewTableData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  districtViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n"): (typeof documents)["\nquery districtViewTableData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  districtViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n"): (typeof documents)["\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n"];
>>>>>>> aa077d1c (add boundary selection to url)
=======
  source: '\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n'
): (typeof documents)['\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
<<<<<<< HEAD
  source: '\nquery districtViewTableData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  districtViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n'
): (typeof documents)['\nquery districtViewTableData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){\n  districtViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)\n}\n'];
=======
  source: '\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'
): (typeof documents)['\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'];
>>>>>>> 60249c4c (right pane with one district)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n'
): (typeof documents)['\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n'];
>>>>>>> 3deda509 (add mapcomponent boundary filter)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
<<<<<<< HEAD
  source: '\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n'
): (typeof documents)['\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
export function graphql(
  source: '\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n'
): (typeof documents)['\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n'
): (typeof documents)['\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n'];
=======
export function graphql(source: "\n  query revenueCircleTable(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewTableData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"): (typeof documents)["\n  query revenueCircleTable(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewTableData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"];
=======
export function graphql(
  source: '\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'
): (typeof documents)['\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'];
>>>>>>> 23414f70 (add css changes and fix revcircle query)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'
): (typeof documents)['\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
export function graphql(source: "\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n"): (typeof documents)["\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n"];
=======
export function graphql(
  source: '\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n'
): (typeof documents)['\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n'
): (typeof documents)['\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n'];
>>>>>>> 23414f70 (add css changes and fix revcircle query)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n'
): (typeof documents)['\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
export function graphql(source: "\n  query districtViewChartData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtViewChartData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"): (typeof documents)["\n  query districtViewChartData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtViewChartData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"];
>>>>>>> 428be535 (update get geographies query)
=======
export function graphql(
  source: '\n  query districtViewChartData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtViewChartData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n'
): (typeof documents)['\n  query districtViewChartData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtViewChartData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n'];
>>>>>>> 23414f70 (add css changes and fix revcircle query)
=======
export function graphql(source: "\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"): (typeof documents)["\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"];
=======
export function graphql(
  source: '\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'
): (typeof documents)['\n  query revCircleViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    revCircleViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'];
>>>>>>> d34f0afe (add build spec to check build status in PR)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'
): (typeof documents)['\n  query districtViewData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter\n  ) {\n    districtViewData(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n'
): (typeof documents)['\n  query indicators($indcFilter: IndicatorFilter) {\n    indicators(indcFilter: $indcFilter)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n'
): (typeof documents)['\n  query dataTimePeriods {\n    getDataTimePeriods {\n      value\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n'
): (typeof documents)['\n  query getDistrictRevCircle($geoFilter: GeoFilter!) {\n    getDistrictRevCircle(geoFilter: $geoFilter)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
<<<<<<< HEAD
export function graphql(source: "\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"): (typeof documents)["\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"];
>>>>>>> 9feb229e (add ANALYTICS_TIME_TRENDS graphql query)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query factors {\n    getFactors\n  }\n"): (typeof documents)["\n  query factors {\n    getFactors\n  }\n"];
=======
=======
>>>>>>> 7f6be3eb (add build spec to check build status in PR)
export function graphql(
  source: '\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n'
): (typeof documents)['\n  query revenueCircleMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n'];
>>>>>>> 88c8bcfa (remove districtchart data query)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query factors {\n    getFactors\n  }\n'
): (typeof documents)['\n  query factors {\n    getFactors\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d34f0afe (add build spec to check build status in PR)
export function graphql(
  source: '\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n'
): (typeof documents)['\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'
): (typeof documents)['\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n'];
<<<<<<< HEAD
=======
export function graphql(source: "\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n      code\n    }\n  }\n"): (typeof documents)["\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n      code\n    }\n  }\n"];
=======
  source: '\nquery dataTimePeriods{\n  getDataTimePeriods {\n    value\n  }\n}\n'
): (typeof documents)['\nquery dataTimePeriods{\n  getDataTimePeriods {\n    value\n  }\n}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n      code\n    }\n  }\n'
): (typeof documents)['\n  query getGeographyData($filters: GeoFilter!) {\n    geography(filters: $filters) {\n      name\n      code\n    }\n  }\n'];
>>>>>>> 3deda509 (add mapcomponent boundary filter)
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\nquery districtViewChartData ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!) {\n  districtViewChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) \n}\n'
): (typeof documents)['\nquery districtViewChartData ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!) {\n  districtViewChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) \n}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< HEAD
export function graphql(source: "\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n"): (typeof documents)["\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n"];
<<<<<<< HEAD
>>>>>>> d9a8add0 (connect map data to map component)
=======
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery factors{\n  getFactors\n}\n"): (typeof documents)["\nquery factors{\n  getFactors\n}\n"];
>>>>>>> aa077d1c (add boundary selection to url)
=======
export function graphql(
  source: '\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n'
): (typeof documents)['\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\nquery factors{\n  getFactors\n}\n'
): (typeof documents)['\nquery factors{\n  getFactors\n}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\nquery districtMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  districtMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n'
): (typeof documents)['\nquery districtMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  districtMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n'];
>>>>>>> 3deda509 (add mapcomponent boundary filter)
=======
export function graphql(source: "\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"): (typeof documents)["\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n"];
>>>>>>> 428be535 (update get geographies query)
=======
export function graphql(
  source: '\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n'
): (typeof documents)['\n  query districtMapData(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n  ) {\n    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)\n  }\n'];
>>>>>>> 23414f70 (add css changes and fix revcircle query)
=======
export function graphql(source: "\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"): (typeof documents)["\n  query getTimeTrends(\n    $indcFilter: IndicatorFilter!\n    $dataFilter: DataFilter!\n    $geoFilter: GeoFilter!\n  ) {\n    getTimeTrends(\n      indcFilter: $indcFilter\n      dataFilter: $dataFilter\n      geoFilter: $geoFilter\n    )\n  }\n"];
>>>>>>> 9feb229e (add ANALYTICS_TIME_TRENDS graphql query)
=======
>>>>>>> d34f0afe (add build spec to check build status in PR)

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
