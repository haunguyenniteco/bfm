import { styled } from '@mui/material/styles'
import { media } from '@theming'
import { Address, Delete, CreditCard } from '@components/Icons'

export const PageContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  margin: auto;
  max-width: 401px;

  ${media.desktop`
  margin-left: 6%;
  `};

  ${media.giant`
  margin-left: 17%;
  `};
`

export const PageTitle = styled('h1')`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: normal;
`

export const PageItem = styled('div')`
  width: auto;
  padding: 20px 0;
  ${media.tablet`
 width: 401px;
  `}
`

export const ItemTitle = styled('h2')`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: normal;
`
export const Title = styled('span')`
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: normal;
`

export const AddressIcon = styled(Address)`
  color: ${({ theme }) => theme.palette.G0};
  width: 20px;
  height: 20px;
`

export const CreditCardIcon = styled(CreditCard)`
  color: ${({ theme }) => theme.palette.G0};
  width: 20px;
  height: 20px;
`

export const DeleteIcon = styled(Delete)`
  color: ${({ theme }) => theme.palette.G0};
  width: 20px;
  height: 20px;
`

export const Truncate = styled('span')({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '100%',
})

export const DeleteButton = styled('button')`
  color: transparent;
  background: transparent;
  box-shadow: none;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
`
