import { useMemo } from 'react'
import { useField, ErrorMessage } from 'formik'
import Box from '@mui/material/Box'
import { FieldWrapper, CheckboxInput, CheckboxLabel, Info, Error } from '../elements'

export const Checkbox = ({ label, info, ...props }) => {
  const { id, name } = props
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  const hasError = meta.touched && !!meta.error
  const isValid = meta.touched && !meta.error

  const mField = useMemo(() => {
    return (
      <FieldWrapper mt="15px">
        <Box display="flex" alignItems="flex-start">
          <CheckboxInput {...field} {...props} type="checkbox" hasError={hasError} isValid={isValid} />
          <Box display="flex" alignItems="flex-start" flexDirection="column">
            <CheckboxLabel htmlFor={id || name}>{label}</CheckboxLabel>
            {info && <Info isCheckbox>{info}</Info>}
          </Box>
        </Box>
        <ErrorMessage name={name}>{msg => <Error isCheckbox>{msg}</Error>}</ErrorMessage>
      </FieldWrapper>
    )
  }, [field, meta])

  return <>{mField}</>
}
