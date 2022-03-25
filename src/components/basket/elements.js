import { styled } from '@mui/material/styles'
import Right from '@components/Icons/chevron/Right'
import Button from '@components/ui/Button/index'
import CircularProgress from '@mui/material/CircularProgress'

export const CheckoutButton = ({ isloading, children, ...rest }) => (
  <Button
    color="primary"
    fullWidth
    disabled={isloading}
    endIcon={isloading && <CircularProgress size={20} color="whiteGrey" />}
    {...rest}
  >
    {children}
  </Button>
)

export const PriceRow = styled('div')`
  font-size: 16px;
  color: #000;
  line-height: 1.25;
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;

  strong {
    font-weight: bold;
  }
`

export const PriceTitle = styled('div')`
  width: 50%;
`

export const Price = styled('div')`
  width: 50%;
  text-align: right;
`

export const Products = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 0px;
`

export const Product = styled('li')`
  background: #fff;
  margin: 0 0 10px;
  padding: 10px;
  position: relative;
`
export const ImageContainer = styled('div')`
  background: rgba(0, 0, 0, 0.15);
  float: left;
  height: 40px;
  width: 40px;
`

export const ProductTitle = styled('h3')`
  font-size: 14px;
  color: #333;
  margin: 0 0 0 10px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`
export const Excerpt = styled('div')`
  cursor: pointer;
  overflow: hidden;
  padding-bottom: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.grayLight};
`

export const CartBoxWrapper = styled('div')`
  float: right;
  position: relative;
  width: 160px;
  height: 36px;
  margin-bottom: 5px;
  margin-right: 10px;

  .cart-button {
    width: 39px;
    height: 39px;
  }
`

export const CartActions = styled('div')`
  overflow: hidden;
  padding: 0 16px 0 56px;
  display: block;
`

export const Prices = styled('div')`
  margin-right: 150px;
`

export const ProductTotal = styled('div')`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`

export const ProductPriceDetail = styled('div')`
  font-size: 12px;
  line-height: 1.67;
  color: #bbb;
`

export const ArrowRight = styled(Right)`
  width: 35px;
  height: 35px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.brand};
  }
`

export const EditNoteContainer = styled('div')`
  display: flex;
  flex-direction: column;

  & label {
    font-size: 16px;
    margin: 12px;
  }

  & textarea {
    margin: 12px;
    font-size: 16px;
    resize: none;
  }

  & button {
    margin: 8px;
    width: calc(100% - 16px);
  }

  & * {
    border: none;
  }
`

export const ProductNameField = styled('div')`
  min-height: 60px;
  display: flex;
  align-items: center;
  margin: 0 auto;
`

export const ProductName = styled('h1')`
  font-family: ${props => props.theme.font.fontImpact};
  margin: 12px 12px 8px 12px;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.1px;
  color: ${props => props.theme.palette.whiteGreen};
  font-weight: normal;
  text-transform: uppercase;
`
export const CheckboxContainer = styled('div')`
  margin: 0px 14px 25px 14px;

  & input {
    margin-top: 2px;
  }

  & label {
    margin: 0;
  }
`
