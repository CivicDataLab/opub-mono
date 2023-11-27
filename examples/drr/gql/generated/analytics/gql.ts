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
    "\nquery tableData($indcFilter: IndicatorFilter){\n  districtViewTableData(indcFilter: $indcFilter)\n}\n": types.TableDataDocument,
    "\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n": types.RevenueCircleTableDocument,
    "\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n": types.RevenueCircleMapDataDocument,
    "\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n": types.IndicatorsDocument,
    "query indicatorsByQuery{\n  indicatorsByCategory\n}\n": types.IndicatorsByQueryDocument,
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
export function graphql(source: "\nquery tableData($indcFilter: IndicatorFilter){\n  districtViewTableData(indcFilter: $indcFilter)\n}\n"): (typeof documents)["\nquery tableData($indcFilter: IndicatorFilter){\n  districtViewTableData(indcFilter: $indcFilter)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n"): (typeof documents)["\nquery revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n"): (typeof documents)["\nquery revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){\n  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n"): (typeof documents)["\nquery indicators{\n    indicators {\n      name\n      slug\n      category\n      parent{\n        name\n      }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query indicatorsByQuery{\n  indicatorsByCategory\n}\n"): (typeof documents)["query indicatorsByQuery{\n  indicatorsByCategory\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;