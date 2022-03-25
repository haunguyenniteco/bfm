/**
 * styled elements for OrderProducts
 */

import { styled } from '@mui/material/styles'
import { Right } from '@components/Icons'

export const Products = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 0px;
`

export const Product = styled('li')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin: 0 0 10px;
  padding: 10px;
`
export const ImageContainer = styled('div')`
  background: rgba(0, 0, 0, 0.15);
  float: left;
  height: 40px;
  width: 40px;
`

export const ProductTitle = styled('h3')`
  font-size: 16px;
  color: #333;
  margin: 0 0 0 10px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`
export const Excerpt = styled('div')`
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: center;
`

export const Prices = styled('div')``

export const ProductTotal = styled('div')`
  font-weight: bold;
  font-size: 20px;
  color: #333;
`

export const ProductPriceDetail = styled('div')`
  font-weight: bold;
  font-size: 20px;
  color: #bbb;
  flex: 1;
`

export const OrderDetails = styled('div')`
  padding: 20px 0 20px;
`

export const OrderDetailsTitle = styled('div')`
  color: #2f3a44;
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 20px;
`

export const ArrowRight = styled(Right)`
  width: 28px;
  height: 28px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.brand};
  }
`
