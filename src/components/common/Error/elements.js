/**
 * styled elements for Error
 */
import { Container } from '@components/ui'
import { styled } from '@mui/material/styles'

export const Wrapper = styled(Container)`
  margin-top: 30px;
`

export const A = styled('a')`
  color: #00729a;
  border-bottom: 1px solid #00729a;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #00bbe3;
    border-bottom: 1px solid #00bbe3;
  }
`
