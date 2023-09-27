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
  '\n  mutation createResourceMutation($resource_data: ResourceInput) {\n    create_resource(resource_data: $resource_data) {\n      success\n      errors\n      resource {\n        id\n        title\n        description\n        file_details {\n          resource {\n            id\n            title\n            description\n          }\n          format\n          file\n          remote_url\n          source_file_name\n        }\n      }\n    }\n  }\n':
    types.CreateResourceMutationDocument,
  '\n  query datasetQueryLayout($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n    }\n  }\n':
    types.DatasetQueryLayoutDocument,
  '\n  query datasetDistributionQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      resource_set {\n        id\n        title\n        description\n        file_details {\n          resource {\n            id\n            title\n            description\n          }\n          format\n          file\n          remote_url\n          source_file_name\n        }\n      }\n    }\n  }\n':
    types.DatasetDistributionQueryDocument,
  '\n  query datasetQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      description\n      source\n      update_frequency\n      language\n      remote_issued\n      geography {\n        name\n        id\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n':
    types.DatasetQueryDocument,
  '\n  mutation updateDatasetMutation($dataset_data: UpdateDatasetInput) {\n    update_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n        remote_issued\n        update_frequency\n        geography {\n          name\n          id\n        }\n        source\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.UpdateDatasetMutationDocument,
  '\n  query datasetEditQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      description\n    }\n  }\n':
    types.DatasetEditQueryDocument,
  '\n  mutation patchDatasetMutation($dataset_data: PatchDatasetInput) {\n    patch_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n      }\n    }\n  }\n':
    types.PatchDatasetMutationDocument,
  '\n  mutation createDatasetMutation($dataset_data: CreateDatasetInput) {\n    create_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n        dataset_type\n      }\n    }\n  }\n':
    types.CreateDatasetMutationDocument,
  '\n  query allDatasetsQuery {\n    all_datasets {\n      id\n      title\n      description\n    }\n  }\n':
    types.AllDatasetsQueryDocument,
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
export function graphql(
  source: '\n  mutation createResourceMutation($resource_data: ResourceInput) {\n    create_resource(resource_data: $resource_data) {\n      success\n      errors\n      resource {\n        id\n        title\n        description\n        file_details {\n          resource {\n            id\n            title\n            description\n          }\n          format\n          file\n          remote_url\n          source_file_name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation createResourceMutation($resource_data: ResourceInput) {\n    create_resource(resource_data: $resource_data) {\n      success\n      errors\n      resource {\n        id\n        title\n        description\n        file_details {\n          resource {\n            id\n            title\n            description\n          }\n          format\n          file\n          remote_url\n          source_file_name\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query datasetQueryLayout($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n    }\n  }\n'
): (typeof documents)['\n  query datasetQueryLayout($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query datasetDistributionQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      resource_set {\n        id\n        title\n        description\n        file_details {\n          resource {\n            id\n            title\n            description\n          }\n          format\n          file\n          remote_url\n          source_file_name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query datasetDistributionQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      resource_set {\n        id\n        title\n        description\n        file_details {\n          resource {\n            id\n            title\n            description\n          }\n          format\n          file\n          remote_url\n          source_file_name\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query datasetQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      description\n      source\n      update_frequency\n      language\n      remote_issued\n      geography {\n        name\n        id\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query datasetQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      description\n      source\n      update_frequency\n      language\n      remote_issued\n      geography {\n        name\n        id\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updateDatasetMutation($dataset_data: UpdateDatasetInput) {\n    update_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n        remote_issued\n        update_frequency\n        geography {\n          name\n          id\n        }\n        source\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation updateDatasetMutation($dataset_data: UpdateDatasetInput) {\n    update_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n        remote_issued\n        update_frequency\n        geography {\n          name\n          id\n        }\n        source\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query datasetEditQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      description\n    }\n  }\n'
): (typeof documents)['\n  query datasetEditQuery($dataset_id: Int) {\n    dataset(dataset_id: $dataset_id) {\n      id\n      title\n      description\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation patchDatasetMutation($dataset_data: PatchDatasetInput) {\n    patch_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation patchDatasetMutation($dataset_data: PatchDatasetInput) {\n    patch_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createDatasetMutation($dataset_data: CreateDatasetInput) {\n    create_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n        dataset_type\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation createDatasetMutation($dataset_data: CreateDatasetInput) {\n    create_dataset(dataset_data: $dataset_data) {\n      success\n      errors\n      dataset {\n        id\n        title\n        description\n        dataset_type\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query allDatasetsQuery {\n    all_datasets {\n      id\n      title\n      description\n    }\n  }\n'
): (typeof documents)['\n  query allDatasetsQuery {\n    all_datasets {\n      id\n      title\n      description\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
