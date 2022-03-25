const { gql } = require('apollo-server-micro')

export default gql`
  type Orders {
    items: [Order]
    pagination: Pagination
  }

  type OrderDeliverySlot {
    id: Int!
    startTime: String
    endTime: String
    deliveryPrice: Float
    deliveryDate: String
    pickupLocationGuid: String
    storeGuid: String
    deliveryType: Int!
    deliveryToken: String
  }

  type Order {
    id: ID!
    visibleId: String
    partId: String
    placeId: String
    createdAt: String
    name: String
    email: String
    phone: String
    address: String
    total: Float
    deliveryCharge: Float
    status: String
    notes: String
    products: [OrderProduct]
    deliveryAddress: Address
    deliverySlot: OrderDeliverySlot
    deliveryType: String!
    payment: OrderPayment
  }

  type OrderProduct {
    id: ID!
    sku: String
    quantity: Int
    price: Float
    gtin: String
    allowReplace: Boolean
    notes: [String]
    product: ProductHit
    externalData: ExternalData
  }

  type OrderPayment {
    checkoutUrl: String
    sessionId: String
  }

  type OrchestrationPlace {
    id: String!
  }

  input PlaceInput {
    id: String!
  }

  input MinMaxCurrencyPrice {
    min: Float
    max: Float
    currency: String
  }

  type OrchestrationMinMaxCurrencyPrice {
    min: Float
    max: Float
    currency: String
  }

  input CurrencyPrice {
    price: Float
    currency: String
    priceVat: String
  }

  type OrchestrationCurrencyPrice {
    price: Float
    priceVat: Float
    currency: String
  }

  input CustomerInfo {
    customer_id: String
    loyalty_card_id: String
    employee_customer: String
    company_customer: String
    wallet_id: String
  }

  input CompanyInfo {
    business_id: String
  }

  input AddressInput {
    name: String
    first_name: String
    last_name: String
    email: String
    phone: String
    street: String
    building: String
    apartment: String
    postcode: String
    postal_area: String
    city: String
    state: String
    country_code: String
    locality: String
    country: String
    formatted_address: String
    latitude: Float
    longitude: Float
  }

  type Address {
    name: String
    firstName: String
    lastName: String
    email: String
    phone: String
    street: String
    building: String
    apartment: String
    postcode: String
    postalArea: String
    city: String
    state: String
    countryCode: String
    locality: String
    country: String
    formattedAddress: String
    latitude: Float
    longitude: Float
  }

  input PaymentService {
    type: String
    name: String
    code: String
    logoUrl: String
    fee: CurrencyPrice
  }

  input Configuration {
    success_url: String!
    failure_url: String!
    cancel_url: String!
    project_code: String!
  }

  input PaymentMethod {
    backend: String!
    type: String!
    configuration: Configuration
    services: [PaymentService]
    fee: String
  }

  input DiscountCode {
    code: String
  }

  input DeliveryMethodServiceSlot {
    id: Int!
    start_time: String!
    end_time: String!
    delivery_date: String!
    reservation_token: String!
  }

  input DeliveryMethodService {
    id: String
    code: String
    type: String
    price: MinMaxCurrencyPrice
    delivery_slot: DeliveryMethodServiceSlot
    address: AddressInput
    location_id: String
  }

  input Consignment {
    id: String
    delivery_method_id: String
    service_type: String
    parcel_count: Int
    product_ids: [String]
    tracking_codes: [String]
    tracking_urls: [String]
  }

  input Note {
    type: String
    message: String
  }

  input DeliveryMethod {
    provider_id: String
    type: String
    service: DeliveryMethodService
    consignments: [Consignment]
    id: String
    notes: [Note]
  }
  input PackagingOption {
    price: CurrencyPrice
    sku: String
    type: String
  }

  input InputProductPrice {
    price: Float
    price_vat: Float
    vat_percentage: Float
    deposit_price: Float
  }
  type ProductPrice {
    price: Float
    priceVat: Float
    vatPercentage: Float
    depositPrice: Float
  }

  input InputProductReturn {
    code: String
    additional_code: String
    status: String
    quantity: Int
    note: String
    created_at: String
    updated_at: String
  }
  type ProductReturn {
    code: String
    additionalCode: String
    status: String
    quantity: Int
    note: String
    createdAt: String
    updatedAt: String
  }

  input ExternalDataInput {
    price: Float
    oldPrice: Float
    isPiecePricedByWeight: Boolean
  }

  input CreateOrderProduct {
    sku: String
    quantity: Int
    id: ID
    allow_replace: Boolean
    picking_status: String
    notes: [String]
    unit_price: InputProductPrice
    row_price: InputProductPrice
    dropshipper_product_id: String
    used_price: String
    product_return: InputProductReturn
    external_data: ExternalDataInput
  }

  input Part {
    id: String
    orchestration_id: String
    place_id: String
    delivery_method: DeliveryMethod
    packaging_option: PackagingOption
    dropshipper_id: String
    products: [CreateOrderProduct]
  }

  input CreateOrderInput {
    customer_info: CustomerInfo
    company_info: CompanyInfo
    customer_address: AddressInput
    billing_address: AddressInput
    payment_method: PaymentMethod
    discount_codes: [DiscountCode]
    external_data: String
    orchestration_id: String
    place_id: String
    editable: Boolean
    cancellable: Boolean
    parts: [Part]
  }

  input OrchestrationProduct {
    master_product_id: String!
    sku: String!
    quantity: Int!
  }

  input OrchestrationCustomer {
    is_loyalty: Boolean
    loyalty_number: String
    discount_code: String
    latitude: Float
    longitude: Float
    corporate_shopper: Boolean
  }

  input OrchestrationInput {
    products: [OrchestrationProduct]
    customer: OrchestrationCustomer
    place: PlaceInput
    past_slots: Boolean
  }

  type DeliveryMethodLimit {
    depth: Float
    height: Float
    weight: Float
    width: Float
  }

  type OrchestrationDeliveryMethodServiceAddress {
    street: String
    postcode: String
    city: String
  }

  type OrchestrationDeliveryMethodServiceSlotItem {
    id: String!
    startTime: String
    endTime: String
    price: Float
    isFull: Boolean
    timezone: String
    fillPercentage: Float
  }

  type OrchestrationDeliveryMethodServiceSlot {
    date: String!
    slots: [OrchestrationDeliveryMethodServiceSlotItem]
  }

  type OrchestrationDeliveryMethodService {
    id: String
    type: String
    name: String
    code: String
    address: OrchestrationDeliveryMethodServiceAddress
    price: OrchestrationMinMaxCurrencyPrice
    slots: [OrchestrationDeliveryMethodServiceSlot]
  }

  type OrchestrationDeliveryMethod {
    forDropshipping: Boolean
    id: String!
    placeId: String
    providerId: String
    logoUrl: String
    limits: DeliveryMethodLimit
    price: OrchestrationMinMaxCurrencyPrice
    type: String
    services: [OrchestrationDeliveryMethodService]
  }

  type OrchestrationPartProductPrice {
    price: Float
    priceVat: Float
    vatPercentage: Float
    currency: String
  }

  type OrchestrationPartProduct {
    masterProductId: String!
    sku: String!
    quantity: Int!
    unitPrice: OrchestrationPartProductPrice
    rowPrice: OrchestrationPartProductPrice
  }

  type OrchestrationPartPlacePackingOption {
    sku: String
    type: String
    price: OrchestrationCurrencyPrice
  }

  type OrchestrationPartPlace {
    id: String
    packingOptions: [OrchestrationPartPlacePackingOption]
  }

  type OrchestrationPart {
    orchestrationId: String!
    dropshipperId: String
    deliveryMethods: [OrchestrationDeliveryMethod]
    products: [OrchestrationPartProduct]
    place: OrchestrationPartPlace
    totalPrice: OrchestrationCurrencyPrice
  }

  type OrchestrationPaymentMethodService {
    type: String
    name: String
    code: String
    logoUrl: String
    fee: OrchestrationCurrencyPrice
  }

  type OrchestrationPaymentMethod {
    backend: String
    type: String
    services: [OrchestrationPaymentMethodService]
    fee: OrchestrationMinMaxCurrencyPrice
  }

  type Orchestration {
    orchestrationId: String!
    place: OrchestrationPlace
    parts: [OrchestrationPart]
    paymentMethods: [OrchestrationPaymentMethod]
    totalPrice: OrchestrationCurrencyPrice
    editable: Boolean
    cancellable: Boolean
  }

  type Query {
    order(orderId: String!): Order!
    orders(page: Int, pageSize: Int): Orders!
    getOrchestration(id: String!): Orchestration
  }

  type Mutation {
    createOrder(input: CreateOrderInput): Order
    amendOrder(customerId: String!, orderId: String!, input: CreateOrderInput): Order
    cancelOrder(customerId: String!, orderId: String!): Boolean!
    finalizeOrder(orderId: String!): Boolean!
    orchestration(input: OrchestrationInput): Orchestration
  }
`
