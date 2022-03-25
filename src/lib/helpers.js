import { parse, serialize } from 'cookie'
import getConfig from 'next/config'
import Router from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import omitBy from 'lodash/omitBy'
import { isToday, parseISO, setSeconds, setMinutes, setHours, isAfter } from 'date-fns'

import { NUTRIENT_NAME_OVERRIDE } from '@lib/constants'
import format from './format'
import persist from './persist'

const { publicRuntimeConfig = {} } = getConfig() || {}

export function parseCookies(req, options = {}) {
  const clientCookie = typeof document !== 'undefined' ? document.cookie : ''
  return parse(req ? req.headers.cookie || '' : clientCookie, options)
}

export const getStoreContextId = req => {
  const value = req ? req.headers.cookie || '' : window.document.cookie
  return parse(value)[persist.STORE_ID_KEY] || publicRuntimeConfig.defaultStore
}

function getProtocol(req) {
  let proto = req?.connection?.encrypted ? 'https' : 'http'
  // only do this if you trust the proxy
  proto = req.headers['x-forwarded-proto'] || proto
  return proto.split(/\s*,\s*/)[0]
}

export const getAppUrl = req => {
  const host = req
    ? `${getProtocol(req)}://${req.headers.host}` || ''
    : `${window.location.protocol}//${window.location.host}`
  return host
}

export const getUserAgent = req => (req ? req.headers['user-agent'] : navigator.userAgent)

export const slugify = text =>
  text
    ? text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
        .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
        .replace(/^-+|-+$/g, '')
    : ''

export const getCategoryRoute = (category, locale) =>
  category ? `/products/${slugify(category.name[locale])}/${category.extId}` : `/products`

export const routeCategorySelect = (category, locale) => {
  const as = getCategoryRoute(category, locale)
  const href = category ? '/products/[categorySlug]/[categoryId]' : '/products'
  Router.push(href, as, { shallow: true })
}

export const getProductRoute = (product, locale) =>
  `/product/${slugify(product.name[locale])}/${product.masterProductId}`

export const routeProductSelect = (product, locale) => {
  const as = getProductRoute(product, locale)
  const href = '/product/[productSlug]/[productId]'
  Router.push(href, as, { shallow: true })
}

export const routeProductSearch = searchPhrase => {
  const as = `/products/search/${searchPhrase}`
  const href = '/products/search/[q]'
  Router.push(href, as, { shallow: true })
}

export const createId = () => uuidv4()

export const calculateNutrientRI = nutrientDetails => {
  const { nutrientTypeCode, quantityContained } = nutrientDetails
  switch (nutrientTypeCode) {
    case 'ENER-':
      return (quantityContained[0].value / 2000) * 100
    case 'FAT':
      return (quantityContained[0].value / 70) * 100
    case 'FASAT':
      return (quantityContained[0].value / 20.0) * 100
    case 'CHOAVL':
      return (quantityContained[0].value / 260.0) * 100
    case 'SUGAR':
      return (quantityContained[0].value / 90.0) * 100
    case 'PRO-':
      return (quantityContained[0].value / 50.0) * 100
    case 'SALTEQ':
      return (quantityContained[0].value / 6.0) * 100

    default:
      return 0
  }
}

export const groupAllergenByContainmentCode = allergenInfo => {
  const keys = ['CONTAINS', 'FREE_FROM', 'MAY_CONTAIN']
  const result = keys.map(code => ({
    code,
    values: allergenInfo?.allergen.filter(allergen => allergen.levelOfContainmentCode === code),
  }))
  return result
}

const flattenArray = arr => {
  let result = []
  for (let i = 0; i < arr.length; i += 1) {
    const { code, subCodes } = arr[i]
    result.push(code)
    result = result.concat(subCodes)
  }
  return result.filter((item, i) => result.indexOf(item) === i)
}

export const groupNutrientDetails = nutrientDetails => {
  const codes = [
    {
      code: 'ENER-',
      subCodes: [],
    },
    {
      code: 'FAT',
      subCodes: ['FASAT', 'FAT-FASAT'],
    },
    {
      code: 'FAMSCIS',
      subCodes: [],
    },
    {
      code: 'FAPUCIS',
      subCodes: [],
    },
    {
      code: 'CHOAVL',
      subCodes: ['SUGAR', 'SUGAR-', 'POLYL', 'X_CARDIF', 'LACS'],
    },
    {
      code: 'CHO-',
      subCodes: ['SUGAR', 'SUGAR-', 'POLYL', 'X_CARDIF', 'LACS'],
    },
    {
      code: 'FIBTG',
      subCodes: ['FIB-'],
    },
    {
      code: 'PRO-',
      subCodes: [],
    },
    {
      code: 'SALTEQ',
      subCodes: ['NACL'],
    },
  ]

  const filterSubCodes = subCodes =>
    subCodes.map(code => ({
      code,
      value: nutrientDetails.find(nutrient => nutrient.nutrientTypeCode === code),
    }))

  const nutrients = codes.map(({ code, subCodes }) => ({
    code,
    value: nutrientDetails.find(nutrient => nutrient.nutrientTypeCode === code),
    subCodes: filterSubCodes(subCodes),
  }))

  const flattenCodes = flattenArray(codes)
  const vitamins = nutrientDetails.filter(i => !flattenCodes.includes(i.nutrientTypeCode))
  return { nutrients, vitamins }
}

export const joinStrings = (...args) => args.filter(Boolean).join(', ')

export const isNullValue = attr => attr == null || attr === ''

export const omitNullValues = obj => omitBy(obj, attr => attr == null || attr === '')

export const money = value => parseFloat(parseFloat(value).toFixed(2))

export const formatSlotTime = ({ startsAt, endsAt, date }, todayLabel, locale) => {
  const dateLabel = new Date(date)
  const label = isToday(dateLabel) ? todayLabel : format(dateLabel, 'cccc, d.M.y', locale)
  return `${label}, ${startsAt} - ${endsAt}`
}

export const removePastSlots = slotData => {
  const deliveryDate = parseISO(slotData?.deliveryDate) || null
  if (!deliveryDate || !isToday(deliveryDate)) {
    return slotData
  }

  const slots = [...slotData.slots].filter(s => {
    const [hours = 23, minutes = 59] = s.startsAt.split(':')
    const timeslot = setSeconds(setMinutes(setHours(deliveryDate, hours), minutes), 0)
    return isAfter(timeslot, new Date())
  })

  return {
    ...slotData,
    slots,
  }
}

export const getNutrientName = (locale, item) =>
  NUTRIENT_NAME_OVERRIDE[locale][item.code] || item.value.nutrientTypeName[locale]

export const notVariableMeasuredItem = ['COUNT', null, undefined]

export const homeDeliveryTypes = ['delivery', '0', 'homedelivery', 'home-delivery', 'homeDelivery']
export const isDelivery = type => homeDeliveryTypes.includes(type)

export const pickupDeliveryTypes = ['pickup', '1']
export const isPickup = type => pickupDeliveryTypes.includes(type)

export const getType = type => (isDelivery(type) ? 'delivery' : 'pickup')

const roundPrice = price => Math.round(price * 100) / 100

export const getPriceForViews = product => {
  const {
    prices,
    netContent = [],
    priceComparisonMeasurements = [],
    promotions,
    priceByMeasureTypeCode,
    xSellingUnitOfMeasureCode,
  } = product

  let price = prices.clicksUnitPrice
  let oldPrice = null
  // promotions can be null or empty array
  if (promotions && promotions.length && promotions[0].clicksPromotionPrice) {
    oldPrice = price
    price = promotions[0].clicksPromotionPrice
  }
  const isPiecePricedByWeight = priceByMeasureTypeCode === 'WEIGHT' && xSellingUnitOfMeasureCode === 'EA'
  if (isPiecePricedByWeight) {
    const [{ value, measurementUnitCode }] = netContent
    const [{ measurementUnitCode: compMeasurementUnitCode }] = priceComparisonMeasurements
    let scale
    if (compMeasurementUnitCode === measurementUnitCode) {
      scale = 1.0
    } else if (measurementUnitCode === 'GRM') {
      scale = 0.001
    } else {
      scale = 1000.0
    }
    const multiplier = value * scale
    price = roundPrice(price * multiplier)
    if (oldPrice) {
      oldPrice *= multiplier
    }
  }
  return {
    price,
    oldPrice,
    isPiecePricedByWeight,
  }
}

export function setTokenCookie(res, token) {
  const cookie = serialize(persist.ACCESS_TOKEN_KEY, JSON.stringify(token), {
    expires: new Date(token.expires),
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: false,
  })
  res.setHeader('Set-Cookie', cookie)
}
export function removeTokenCookie(res) {
  const cookie = serialize(persist.ACCESS_TOKEN_KEY, '', {
    maxAge: -1,
    path: '/',
  })
  res.setHeader('Set-Cookie', cookie)
}
// TODO: Combine this function with parseCookies() above
export function parseSetCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies
  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req) {
  const cookies = parseSetCookies(req)
  return cookies[persist.ACCESS_TOKEN_KEY]
}
