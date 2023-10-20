import { graphql } from '@/gql/generated/datasets';


export const ALL_DATASETS_QUERY = graphql(`
query allDatasetsQuery {
  all_datasets {
    id
    title
    slug
    period_from
    period_to
    description
    issued
    highlights
    update_frequency
    modified
    tags {
      name
    }
    sector {
      id
      name
      description
      highlights
    }
    catalog {
      organization {
        title
        logo
        homepage
      }
    }
    tags {
      id
      name
    }
    resource_set {
      id
      title
      description
      issued
      modified
      file_details {
        format
        file
        source_file_name
      }
    }
    datasetaccessmodel_set {
      data_access_model {
        license {
          title
        }
      }
    }
  }
}`);

export const DATASET_BY_SLUG = graphql(`
query datasetBySlugQuery($dataset_slug: String){
  dataset_by_slug(dataset_slug: $dataset_slug) {
    id
    title
    description
    issued
    highlights
    remote_issued
    remote_modified
    period_from
    period_to
    update_frequency
    modified
    sector {
      id
      name
      description
    }
    catalog {
      id
      title
      organization{
        title
        logo
        homepage
      }
    }
    tags {
      id
      name
    }
    resource_set {
      id
      title
      description
      issued
      modified
      status
      byte_size
      release_date
      is_downloadable
      file_details{
        file
        source_file_name
        format
      }
    }
    datasetaccessmodel_set {
      data_access_model{
        license{
          title
          type
        }
      }
      resource_formats
    }
  }
}`);
