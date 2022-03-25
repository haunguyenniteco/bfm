import { styled, keyframes } from '@mui/material/styles'
import Input from '@mui/material/Input'
import Search from '@components/Icons/Search'
import Close from '@components/Icons/Close'
import Typography from '@components/ui/Typography/index'

export const NoResultMessage = styled(Typography)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: -0.4px;
  line-height: normal;
  margin: 10px 0;
  text-align: center;
  padding: 0 20px 10px;
`

export const AddressAutocompleteWrapper = styled('div')`
  box-shadow: rgba(9, 30, 66, 0.2) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  & > div {
    display: block !important;
  }
`
export const InputWrapper = styled('div')`
  position: relative;
`

export const StyledInput = styled(Input)`
  width: 100%;
  display: block;
  letter-spacing: -0.4px;
  line-height: normal;
  font-weight: 500;
  font-size: 20px;
  height: 46px;
  margin: 0;
  padding: 0 40px 0 40px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grayLight};

  &::placeholder {
    color: #bbbbbb;
  }
`

const defaultIconButtonStyled = `
  cursor: pointer;
  height: 46px;
  width: 40px;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SearchButton = styled('div')`
  ${defaultIconButtonStyled}
  left: 0;
`

const threeQuartersLoader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Loading = styled('div')`
  position: absolute;
  top: 0;
  right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 20px;

  &::after {
    content: '';
    animation: ${threeQuartersLoader} 1250ms infinite linear;
    border: 2px solid;
    border-right-color: transparent !important;
    border-radius: 50%;
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    transition: color 0s;
    border-color: ${({ theme }) => theme.palette.brand};
  }
`

export const CloseButton = styled('div')`
  ${defaultIconButtonStyled}
  right: 0;
`

export const CloseIcon = styled(Close)`
  width: 11px;
  height: 10px;
`

export const SearchIcon = styled(Search)`
  width: 14px;
  height: 14px;
  color: ${({ theme }) => theme.palette.muted};
`

export const Hint = styled(({ isHighlighted, ...props }) => <div {...props} />)`
  background-color: white;
  padding: 13px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  cursor: pointer;
  transition: all 0.3s;

  ${props => (props.isHighlighted ? `background: ${({ theme }) => theme.palette.greyLight};` : null)}

  &:hover {
    background-color: ${({ theme }) => theme.palette.greyLight};
  }
`

export const HintText = styled('span')`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.28px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;

  .highlight {
    font-weight: 600;
  }
`
