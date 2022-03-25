/**
 * styled elements for ProductDetails
 */

import { styled } from '@mui/material/styles'
import { Right as ChevronRight } from '@components/Icons'
import Container from '@mui/material/Container'
import { Tab, TabList, TabPanel } from '@components/ui/Tabs/elements'
import { Tabs as Tabs2, Tab as Tab2 } from '@components/ui/Tabs2'
import { media } from '@theming/media'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'

export const TextInfo = ({ children, ...props }) => <Typography {...props}>{children}</Typography>

export const ItemBlockContent = ({ title, children }) => (
  <Box mb="35px">
    <Typography lineHeight={1.56} mb="15px" variant="h2">
      {title}
    </Typography>
    {children}
  </Box>
)

export const RightIcon = styled(ChevronRight)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.palette.G0};
  margin-right: 15px;
`

export const PageContainer = styled(Container)`
  ${media.tablet`
    padding-left: 20px;
    padding-right: 20px;
  `};
`

export const ProductWrapper = styled(Box)`
  display: flex;
  background-color: ${props => props.theme.palette.white};
  padding: 0 0 25px 0;
  min-height: 100%;
  margin: 0 -15px;

  ${media.tablet`
    padding: 16px 0 60px 0;
    margin: 0;
  `};
`

export const ImageContainer = styled(Box)`
  background-color: ${props => props.theme.palette.white};
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  flex-direction: column;
  padding: 12px;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  ${media.tablet`
    padding: 0;
    img {
      width: 515px;
    }
  `};

  ${media.desktop`
    padding: 8px;
    box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.15);
    margin-bottom: 0;
  `};
`
export const ProductBasicInfo = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0;
  margin-bottom: 40px;
  padding-top: 15px;
  flex: 1;
  min-height: 350px;

  ${media.desktop`
    padding-left: 45px;
    margin-bottom: 0;
  `};
`
export const ProductName = styled('h1')`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  line-height: 1.25;

  ${media.tablet`
    font-size: 24px;
    margin-top: 18px;
  `}
`

export const BrandName = styled('h1')`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  line-height: 1.25;

  ${media.tablet`
    font-size: 24px;
  `}
`

export const StickyContainer = styled('div')`
  margin-top: auto;
  bottom: 0;
  background: white;
  left: 0;
  min-width: 100vw;
  position: fixed;
  z-index: 1200;

  ${({ theme }) => theme.breakpoints.up('lg')} {
    min-width: auto;
    position: relative;
    background: transparent;
    display: flex;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    border-top: 1px solid #bababa;
  }
`

export const CartActionsWrapper = styled(Box)`
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: space-between;
  margin-left: 0;

  ${media.desktop`
    min-width: 300px;
    margin: 0;
    padding: 0;
  `};
`

export const AddToCartButton = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height: 47px;
  color: white;
  border-radius: 0 !important;
  margin: 0;

  ${media.desktop`
    width: 221px;
  `};
`

export const SimilarProductsWrapper = styled(Box)`
  width: 100%;
  //background-color: ${props => props.theme.palette.white};

  ${media.tablet`
    flex: 1 1 0%;
    /* margin-right: 15px; */
  `};

  .product-grid-container {
    margin: 0 -15px;
    ${media.tablet`
      margin: 0 ;
    `};
  }
`

export const StyledTabList = styled(TabList)`
  flex-wrap: unset;
  margin-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.G2};

  ${media.phone`
    line-height: 40px;
  `};

  ${media.tablet`
    margin-top: 32px;
    line-height: 60px;
  `};
`

export const StyledTab = styled(Tab)`
  background-color: ${props => props.theme.palette.white};
  font-size: 14px;
  font-weight: ${props => props.theme.fontWeights.body};
  line-height: 13px;
  text-transform: capitalize;
  padding: 20px 0;
  color: ${({ theme }) => theme.palette.G6};

  &:focus {
    z-index: 1;
  }

  &.selected {
    border-bottom: 3px solid ${({ theme }) => theme.palette.primary};
    color: ${({ theme }) => theme.palette.G6};
    font-weight: bold;
  }

  ${media.tablet`
    font-size: 18px;
  `}
`

export const StyledTabPanel = styled(TabPanel)`
  min-height: 6em;
  background-color: transparent;
  /* margin-bottom: 80px; */

  &.similar-products-tab {
    padding: 0;
    background-color: transparent;
  }

  ${media.tablet`
    padding: 0 10px;
  `};

  ${media.desktop`
    padding: 32px 10px;
    background-color: ${props => props.theme.palette.white};
  `};
`

export const NutritionHead = styled(Box)`
  display: flex;
  margin: 0;
  line-height: 40px;

  ${media.tablet`
    margin: 19px 0 10px;
    line-height: inherit;
  `};
`

export const Head = styled('span')`
  font-size: 12px;
  font-weight: '600';
  color: #000000;
  ${media.tablet`
    font-size: 16px;
  `};
`

export const Row = styled('div')`
  display: flex;
  background-color: ${props => props.theme.palette.white};
  border-bottom: 1px solid ${props => props.theme.palette.grayLight};
  padding: 12px 24px 12px;

  span {
    font-size: 14px;
    color: #000000;
  }
`

export const ManufacturerBlock = styled(Box)`
  & + & {
    margin-top: 10px;
  }
`

export const Bold = styled('span')`
  font-weight: ${props => props.theme.fontWeights.bold};
`

export const Ingredients = styled('p')`
  color: ${props => props.theme.palette.G7};
`

export const AllergenNotice = styled('p')`
  color: ${props => props.theme.palette.subtitle};
`
export const AllergenList = styled('ul')`
  padding-left: 0;
`

export const AllergenListItem = styled('li')`
  list-style: none;
  margin-bottom: 5px;
`

export const TableTopic = styled('h3')`
  font-size: 12px;
  margin: 0 19px 9px 19px;
  line-height: 16px;
`

export const ReferenceIntake = styled('div')`
  height: 144px;
  background-color: ${props => props.theme.palette.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ReferenceColumnContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin: 8px 19px 0 19px;
`

export const Column = styled('div')`
  width: 50px;
  display: flex;
  flex-direction: column;
  font-weight: ${props => props.theme.fontWeights.bold};
`

export const Name = styled('div')`
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
`

export const Banner = styled('div')`
  height: 100%;
  background-color: ${props => props.theme.palette.primary};
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  border-radius: 0 0 50px 50px;
  font-size: 12px;
  padding-top: 8px;
  line-height: 16px;
  color: ${props => props.theme.palette.white};
`

export const Circle = styled('div')`
  background-color: ${props => props.theme.palette.white};
  color: ${props => props.theme.palette.primary};
  position: absolute;
  bottom: 4px;
  width: 44px;
  border-radius: 50%;
  text-align: center;
  line-height: 44px;
  font-size: 18px;
`

export const ReferenceInfo = styled('p')`
  font-size: ${props => props.theme.infoTextFontSize};
  color: ${({ theme }) => theme.palette.G5};
  margin: 5px 19px 12px 19px;
`

export const ProductTabs = styled(Tabs2)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.G3};
`

export const ProductTab = styled(Tab2)`
  width: 100%;
  color: ${({ theme }) => theme.palette.darkGreen};
`

export const MuiTable = styled(Table)`
  th,
  td {
    padding: 12px 0;
  }

  th {
    border-bottom: none;
    font-weight: 700;
    width: 50%;
  }

  td {
    border-bottom: 1px solid ${({ theme }) => theme.palette.G4};
  }
`

export const SimilarProductBox = styled(Box)`
  ${media.desktop`
  padding: 0 25px 40px;
  `};

  h2 {
    font-family: 'OpenSans Regular';
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
  }
`
