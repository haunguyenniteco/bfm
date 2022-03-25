/**
 * styled elements for SlotSelection
 */

import { css } from '@emotion/css'
import { styled } from '@mui/material/styles'
import is from 'styled-is'
import { Left, Right } from '@components/Icons'
import Box from '@mui/material/Box'
import RadioMui from '@mui/material/Radio'

export const DayColumn = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-bottom: 12px;
  color: ${({ theme }) => theme.palette.G2};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.palette.G2};

  ${is('disabled')`
    cursor: not-allowed;
    pointer-events: none;
  `};

  ${is('active')`
    color: ${({ theme }) => theme.palette.G6};
    border-bottom: 3px solid ${({ theme }) => theme.palette.primary.main};
    padding-bottom: 9px;
  `};
`
export const DayName = styled(Box)`
  font-size: 10px;
  line-height: 1.6;
  text-transform: uppercase;
  margin-bottom: 2px;
`

export const DayNumber = styled(Box)`
  font-size: 24px;
  line-height: 0.7;
`
const defaultIconStyles = ({ theme }) => css`
  width: 28px;
  height: 28px;
  cursor: pointer;

  &:hover {
    color: ${theme.palette.brand};
  }
`
export const ArrowLeft = styled(Left)`
  ${defaultIconStyles};
`

export const ArrowRight = styled(Right)`
  ${defaultIconStyles};
`

export const Radio = styled(RadioMui)`
  .MuiSvgIcon-root:first-of-type > path {
    color: #000000;
  }
`
