import { graphql } from '@/gql/generated/analytics';

export const ANALYTICS_TABLE_DATA = graphql(`
query tableData($indcFilter: IndicatorFilter){
  districtViewTableData(indcFilter: $indcFilter)
}
`)

export const ANALYTICS_REVENUE_TABLE_DATA =  graphql(`
query revenueCircleTable($indcFilter: IndicatorFilter){
  revCricleViewTableData(indcFilter: $indcFilter)
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

export const ANALYTICS_INDICATORS_BY_CATEGORY = graphql(`query indicatorsByQuery{
  indicatorsByCategory
}
`
)