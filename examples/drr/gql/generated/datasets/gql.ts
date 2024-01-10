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
    "\nquery allDatasetsQuery {\n  all_datasets {\n    id\n    title\n    slug\n    period_from\n    period_to\n    description\n    issued\n    highlights\n    update_frequency\n    modified\n    tags {\n      name\n    }\n    sector {\n      id\n      name\n      description\n      highlights\n    }\n    catalog {\n      organization {\n        title\n        logo\n        homepage\n      }\n    }\n    tags {\n      id\n      name\n    }\n    resource_set {\n      id\n      title\n      description\n      issued\n      modified\n      file_details {\n        format\n        file\n        source_file_name\n      }\n    }\n    datasetaccessmodel_set {\n      data_access_model {\n        license {\n          title\n        }\n      }\n    }\n  }\n}": types.AllDatasetsQueryDocument,
    "\nquery datasetBySlugQuery($dataset_slug: String){\n  dataset_by_slug(dataset_slug: $dataset_slug) {\n    id\n    title\n    description\n    issued\n    highlights\n    remote_issued\n    remote_modified\n    period_from\n    period_to\n    update_frequency\n    modified\n    sector {\n      id\n      name\n      description\n    }\n    catalog {\n      id\n      title\n      organization{\n        title\n        logo\n        homepage\n      }\n    }\n    tags {\n      id\n      name\n    }\n    resource_set {\n      id\n      title\n      description\n      issued\n      modified\n      status\n      byte_size\n      release_date\n      is_downloadable\n      file_details{\n        file\n        source_file_name\n        format\n      }\n    }\n    datasetaccessmodel_set {\n      data_access_model{\n        license{\n          title\n          type\n        }\n      }\n      resource_formats\n    }\n  }\n}": types.DatasetBySlugQueryDocument,
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
export function graphql(source: "\nquery allDatasetsQuery {\n  all_datasets {\n    id\n    title\n    slug\n    period_from\n    period_to\n    description\n    issued\n    highlights\n    update_frequency\n    modified\n    tags {\n      name\n    }\n    sector {\n      id\n      name\n      description\n      highlights\n    }\n    catalog {\n      organization {\n        title\n        logo\n        homepage\n      }\n    }\n    tags {\n      id\n      name\n    }\n    resource_set {\n      id\n      title\n      description\n      issued\n      modified\n      file_details {\n        format\n        file\n        source_file_name\n      }\n    }\n    datasetaccessmodel_set {\n      data_access_model {\n        license {\n          title\n        }\n      }\n    }\n  }\n}"): (typeof documents)["\nquery allDatasetsQuery {\n  all_datasets {\n    id\n    title\n    slug\n    period_from\n    period_to\n    description\n    issued\n    highlights\n    update_frequency\n    modified\n    tags {\n      name\n    }\n    sector {\n      id\n      name\n      description\n      highlights\n    }\n    catalog {\n      organization {\n        title\n        logo\n        homepage\n      }\n    }\n    tags {\n      id\n      name\n    }\n    resource_set {\n      id\n      title\n      description\n      issued\n      modified\n      file_details {\n        format\n        file\n        source_file_name\n      }\n    }\n    datasetaccessmodel_set {\n      data_access_model {\n        license {\n          title\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery datasetBySlugQuery($dataset_slug: String){\n  dataset_by_slug(dataset_slug: $dataset_slug) {\n    id\n    title\n    description\n    issued\n    highlights\n    remote_issued\n    remote_modified\n    period_from\n    period_to\n    update_frequency\n    modified\n    sector {\n      id\n      name\n      description\n    }\n    catalog {\n      id\n      title\n      organization{\n        title\n        logo\n        homepage\n      }\n    }\n    tags {\n      id\n      name\n    }\n    resource_set {\n      id\n      title\n      description\n      issued\n      modified\n      status\n      byte_size\n      release_date\n      is_downloadable\n      file_details{\n        file\n        source_file_name\n        format\n      }\n    }\n    datasetaccessmodel_set {\n      data_access_model{\n        license{\n          title\n          type\n        }\n      }\n      resource_formats\n    }\n  }\n}"): (typeof documents)["\nquery datasetBySlugQuery($dataset_slug: String){\n  dataset_by_slug(dataset_slug: $dataset_slug) {\n    id\n    title\n    description\n    issued\n    highlights\n    remote_issued\n    remote_modified\n    period_from\n    period_to\n    update_frequency\n    modified\n    sector {\n      id\n      name\n      description\n    }\n    catalog {\n      id\n      title\n      organization{\n        title\n        logo\n        homepage\n      }\n    }\n    tags {\n      id\n      name\n    }\n    resource_set {\n      id\n      title\n      description\n      issued\n      modified\n      status\n      byte_size\n      release_date\n      is_downloadable\n      file_details{\n        file\n        source_file_name\n        format\n      }\n    }\n    datasetaccessmodel_set {\n      data_access_model{\n        license{\n          title\n          type\n        }\n      }\n      resource_formats\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;