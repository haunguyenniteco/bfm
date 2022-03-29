import { styled } from '@mui/material/styles'

export const SkipViewLink = styled('a')`
  transform: translateY(-100%);
  background: #319795;
  color: #fff;
  font-weight: 700;
  left: 50%;
  padding: 4px;
  position: absolute;
  z-index: 99999;
  display: none;
  &:focus {
    transform: translateY(0%);
  }
`
