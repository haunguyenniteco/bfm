import { styled } from '@mui/material/styles'
import is from 'styled-is'

export const FieldWrapper = styled('div')`
  padding-bottom: 10px;
  ${is('isTextArea')`
    flex: 1
  `};
`

export const FieldInputWrapper = styled('div')`
  width: 100%;
  margin-top: 15px;
  ${is('isTextArea')`
    height: 100%
  `};
`

export const FieldInputContainer = styled('div')`
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  min-height: 36px;
  font-size: inherit;

  border-bottom: 1px solid
    ${({ theme, isValid, active }) => (active && isValid ? theme.palette.primary : theme.palette.inputBorderColor)};

  ${is('isTextArea')`
    height: 100%
  `};

  ${is('hasError')`
    border-color: ${props => props.theme.palette.error};
  `};
`

export const Label = styled('label')`
  padding: ${props => (props.active ? '0 10px' : '0 8px')};
  margin: 0;
  border: 0;
  position: absolute;
  color: ${({ theme, isValid, active }) =>
    active && isValid ? theme.palette.primary : theme.palette.placeholderColor};
  ${props => (props.isTextArea ? 'top: 0' : 'bottom: 0')};
  transition: all 0.2s ease-in-out;
  transform-origin: left top;
  font-size: 1.2rem;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  line-height: ${props => (props.isHigh ? '1.9' : '1.6')};
  cursor: text;
  pointer-events: none;
  width: 66.6%;
  transform: ${({ active }) => (active ? 'translate3d(0, -70%, 0) scale(0.70)' : 'none')};

  ${is('hasError')`
    color: ${({ theme, active }) => (active ? theme.palette.error : theme.palette.placeholderColor)};
  `};
`

export const Input = styled('input')`
  margin: 0;
  border: none;
  outline: none;
  font-size: 16px;
  height: 32px;
  background-color: ${props => props.theme.palette.white};
  padding: 8px 8px;

  &::placeholder {
    color: ${props => props.theme.palette.placeholderColor};
    opacity: ${props => (props.active ? 1 : 0)};
    transition: opacity 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  }
`

export const CheckboxInput = styled('input')`
  color: ${({ theme, isValid, active }) =>
    active && isValid ? theme.palette.primary : theme.palette.placeholderColor};
  margin-right: 10px;
`

export const CheckboxLabel = styled('label')`
  font-size: 14px;
  line-height: 1;
  margin: 0;
  padding-top: 2px;

  ${is('hasError')`
    color: ${({ theme }) => theme.palette.error};
  `};
`

export const TextArea = styled('textarea')`
  padding: 4px 8px;
  margin: 0;
  border: none;
  outline: none;
  font-size: 18px;
  height: 32px;
  background-color: ${props => props.theme.palette.white};
  display: flex;
  flex: 1;

  &::placeholder {
    color: ${props => props.theme.palette.placeholderColor};
    opacity: ${props => (props.active ? 1 : 0)};
    transition: opacity 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  }
`

export const Info = styled('span')`
  font-size: 13px;
  padding: 6px 8px 0 8px;
  color: ${props => props.theme.palette.info};

  ${is('isCheckbox')`
   padding: 6px 8px 0 0;
  `};
`

export const Error = styled('span')`
  font-size: 13px;
  padding: 6px 8px 0 8px;
  color: ${props => props.theme.palette.error};

  ${is('isCheckbox')`
    padding: 6px 8px 0 0;
  `};
`
