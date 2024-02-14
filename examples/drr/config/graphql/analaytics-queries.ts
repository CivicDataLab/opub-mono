import { graphql } from '@/gql/generated/analytics';

export const ANALYTICS_REVENUE_TABLE_DATA = graphql(`
  query revenueCircleTable(
    $indcFilter: IndicatorFilter!
    $dataFilter: DataFilter!
    $geoFilter: GeoFilter
  ) {
    revCircleViewTableData(
      indcFilter: $indcFilter
      dataFilter: $dataFilter
      geoFilter: $geoFilter
    )
  }
`);

export const ANALYTICS_DISTRICT_DATA = graphql(`
  query districtViewData(
    $indcFilter: IndicatorFilter!
    $dataFilter: DataFilter!
    $geoFilter: GeoFilter
  ) {
    districtViewData(
      indcFilter: $indcFilter
      dataFilter: $dataFilter
      geoFilter: $geoFilter
    )
  }
`);

export const ANALYTICS_INDICATORS = graphql(`
  query indicators {
    indicators {
      name
      slug
      category
      parent {
        name
      }
    }
  }
`);

export const ANALYTICS_TIME_PERIODS = graphql(`
  query dataTimePeriods {
    getDataTimePeriods {
      value
    }
  }
`);

export const ANALYTICS_GEOGRAPHY_DATA = graphql(`
  query getDistrictRevCircle($geoFilter: GeoFilter!){
    getDistrictRevCircle(geoFilter : $geoFilter)
  }
`);

export const ANALYTICS_DISTRICT_CHART_DATA = graphql(`
  query districtViewChartData(
    $indcFilter: IndicatorFilter!
    $dataFilter: DataFilter!
  ) {
    districtViewChartData(indcFilter: $indcFilter, dataFilter: $dataFilter)
  }
`);

export const ANALYTICS_REVENUE_MAP_DATA = graphql(`
  query revenueCircleMapData(
    $indcFilter: IndicatorFilter!
    $dataFilter: DataFilter!
  ) {
    revCircleMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)
  }
`);

export const ANALYTICS_FACTORS = graphql(`
  query factors {
    getFactors
  }
`);

export const ANALYTICS_DISTRICT_MAP_DATA = graphql(`
  query districtMapData(
    $indcFilter: IndicatorFilter!
    $dataFilter: DataFilter!
  ) {
    districtMapData(indcFilter: $indcFilter, dataFilter: $dataFilter)
  }
`);
