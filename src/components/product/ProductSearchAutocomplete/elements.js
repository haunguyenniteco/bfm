/**
 * styled elements for HeaderSearchAutoComplete
 */

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { media } from '@theming'
import Search from './SearchIcon'
import Cross from './CrossIcon'

export const Wrapper = styled(Box)`
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  div {
    width: 100%;
  }

  ${media.tablet`
		height: 40px;
  `};

  .autocomplete-container {
    border: none;
    width: 100%;
  }

  .autocomplete-input-container input {
    font-size: 16px;
    outline: 0;
    line-height: 1;
    height: 40px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    ${media.tablet`
			font-size: 16px;
		`};
  }
`
export const SearchIcon = styled(Search)`
  display: block;
  ${media.tablet`
   // display: block;
  `}

  color: #000000;

  &.autocomplete-icon {
    cursor: pointer;
    padding: 0;
    width: 16px;
    height: 16px;
    margin-left: 10px;
  }
`
export const ClearButton = styled(Cross)`
  width: 14px;
  height: 14px;
  cursor: pointer;
  margin-right: 10px;

  path {
    fill: #000;
  }
`
