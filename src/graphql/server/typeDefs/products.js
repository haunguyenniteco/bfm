const { gql } = require('apollo-server-micro')

// Common types shared by Product and ProductHit

export default gql`
  type MeasurementUnit {
    value: Float
    name: LocaleField
    measurementUnitCode: String
  }

  "Media files associated with the product."
  type Media {
    "Media sequence number"
    mediaSequence: Int

    "example: application/pdf. Given value is not validated against known types, nor is the content compared to given mime type."
    mediaMimeType: String

    "Code indicating the type of the media. Uses code list mediaTypeCode."
    mediaTypeCode: String

    "Url"
    mediaStorageKey: String

    "Media width in pixels."
    mediaDimensionWidth: Int

    "Media height in pixels."
    mediaDimensionHeight: Int
  }

  type PlaceInfo {
    countryOfOriginStatement: LocaleField
  }

  type Price {
    masterProductId: String

    "The online base price for the product."
    clicksUnitPrice: Float
    clicksUnitPriceWithoutVat: Float
    clicksUnitPriceVatPercent: Float

    "The in-store base price for the product."
    bricksUnitPrice: Float
    bricksUnitPriceWithoutVat: Float
    bricksUnitPriceVatPercent: Float

    "The deposit return price. e.g beverage containers."
    depositPrice: Float

    "The deposit return factor that applies to the return price."
    depositFactor: Float

    # Single product specific price fields:
    comparisonPrices: [ComparisonPrice]
    # startsAt: String
    # endsAt: String

    # ProductHit specific price fields:
    # updated: String
    # id: String
    # storeId: String
  }

  type ComparisonPrice {
    """
    Comparison price text representation.
    example: 2.31/500g
    """
    comparisonPriceText: String
    comparisonPrice: Float
    unitValue: Float
    measurementUnitCode: String
    measurementUnitName: String
  }
`
