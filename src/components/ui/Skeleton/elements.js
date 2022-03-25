/**
 * styled elements for Skeleton
 */

import { styled, keyframes } from '@mui/material/styles'
import is, { match } from 'styled-is'
import Box from '@mui/material/Box'

const skeletonKeyframes = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

export const Wrapper = styled(Box)`
  background-color: ${props => props.highlightColor};
  border-radius: 4px;

  ${match('variant', 'text')`
		margin-top: 0.8em;
		margin-bottom: 0.8em;
		border-radius: 4px;
  `};

  ${match('variant', 'rect')``};

  ${match('variant', 'circle')`
		border-radius: 50%;
  `};

  ${is('animate')`
    animation: ${skeletonKeyframes} 1.5s ease-in-out infinite;
  `};
`
