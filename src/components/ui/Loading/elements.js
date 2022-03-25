import { styled, keyframes } from '@mui/material/styles'

export const Wrapper = styled('div')`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-items: center;
  min-height: 5vh;
`
export const Bouncer = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`

export const Dot = styled('div')`
  background-color: black;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  animation: ${Bouncer} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`
