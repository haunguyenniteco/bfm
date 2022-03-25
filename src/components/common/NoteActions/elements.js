import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 1.67;
  & > * {
    color: ${props => props.theme.palette.secondaryDark};
  }
`
export const TextButton = styled('button')`
  font-size: 12px;
  font-weight: bold;
  background: none;
  border: none;
  white-space: nowrap;
  margin: 0;
  padding: 0 5px;
  min-width: 47px;
  height: 24px;

  &:first-of-type {
    text-align: start;
  }

  &:last-of-type {
    text-align: end;
  }

  &:hover {
    background: none;
    color: ${({ theme }) => theme.palette.primary};
  }

  &:focus {
    background: none;
  }
`
export const Preview = styled('p')`
  flex-grow: 2;
  margin: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
`
