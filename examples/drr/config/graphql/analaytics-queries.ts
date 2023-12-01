import { graphql } from '@/gql/generated/analytics';

export const ANALYTICS_TABLE_DATA = graphql(`
query tableData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){
  districtViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)
}
`)

export const ANALYTICS_REVENUE_TABLE_DATA =  graphql(`
query revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){
  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)
}
`)

export const ANALYTICS_REVENUE_MAP_DATA = graphql(`
query revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){
  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)
}
`)


export const ANALYTICS_DISTRICT_MAP_DATA = graphql(`
query districtMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){
  districtMapData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)
}
`)

export const ANALYTICS_INDICATORS = graphql(`
query indicators{
    indicators {
      name
      slug
      category
      parent{
        name
      }
  }
}
`)

export const ANALYTICS_TIME_PERIODS = graphql(`
query dataTimePeriods{
  getDataTimePeriods {
    value
  }
}
`)

export const ANALYTICS_GEOGRAPHIES = graphql(`
query geography($filters: GeoFilter){
  geography(filters: $filters) {
    name
    code
    type
    parentId {
      name
      code
      type
    }
  }
}
`)

export const ANALYTICS_INDICATORS_BY_CATEGORY = graphql(`query indicatorsByQuery{
  indicatorsByCategory
}
`
)

export const ANALYTICS_CHART_DATA = graphql(`
query getCircleChartData ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){
  revCircleChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) 
}
`)
