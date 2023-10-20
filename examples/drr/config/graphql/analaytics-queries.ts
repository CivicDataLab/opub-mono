import { graphql } from '@/gql/generated/analytics';

export const ANALYTICS_TABLE_DATA = graphql(`
query tableData{
  districtViewTableData
}
`)

export const ANALYTICS_INDICATORS = graphql(`
query indicators{
    indicators {
      name
      slug
  }
}
`)