import { graphql } from '@/gql/generated/analytics';

export const ANALYTICS_REVENUE_TABLE_DATA =  graphql(`
query revenueCircleTable($indcFilter: IndicatorFilter! , $dataFilter: DataFilter! , $geoFilter: GeoFilter){
  revCircleViewTableData(indcFilter: $indcFilter , dataFilter:$dataFilter , geoFilter:$geoFilter)
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

export const ANALYTICS_GEOGRAPHY_DATA = graphql(`
  query getGeographyData($filters: GeoFilter!) {
    geography(filters: $filters) {
      name
      code
    }
  }
`);

export const ANALYTICS_DISTRICT_CHART_DATA = graphql(`
query getDistrictchartdata ($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!) {
  districtChartData(indcFilter: $indcFilter , dataFilter:$dataFilter) 
}
`)

export const ANALYTICS_REVENUE_MAP_DATA = graphql(`
query revenueCircleMapData($indcFilter: IndicatorFilter! , $dataFilter: DataFilter!){
  revCircleMapData(indcFilter: $indcFilter , dataFilter:$dataFilter)
}
`)

export const GET_FACTORS = graphql(`
query factors{
  getFactors
}
`)