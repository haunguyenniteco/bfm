import { styled } from '@mui/material/styles'
import { Close } from '@components/Icons'

export const Button = styled('button')`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  color: inherit;
  font: inherit;

  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;

  padding: 10px;
  outline: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`

export const CrossIcon = styled(Close)`
  display: block;
  height: 100%;
`
