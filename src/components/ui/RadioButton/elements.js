/**
 * styled elements for Radio
 */

import { styled } from '@mui/material/styles'

export const RadioWrapper = styled('div')`
  display: inline-block;
`

export const RadioOuter = styled('div')`
  align-items: center;
  justify-content: center;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  border: 2px solid #282828;
  cursor: pointer;
`

export const RadioInner = styled('div')`
  transition: all 0.2s ease-in-out;
  background-color: ${props => props.theme.palette.primary.main};
  height: 0.5em;
  width: 0.5em;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  margin: 2px;

  &[class*='checked'] {
    opacity: 1;
    transform: scale(1);
  }
`
