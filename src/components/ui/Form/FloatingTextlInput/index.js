import { useMemo } from 'react'
import { useField, ErrorMessage } from 'formik'
import MaskedInput from 'react-text-mask'
import { FieldWrapper, FieldInputWrapper, FieldInputContainer, Label, Input, TextArea, Info, Error } from '../elements'

export const FloatingTextlInput = ({ label, mask, info, ...props }) => {
  const { id, name, type, value } = props
  const [field, meta] = useField(props)
  const isTextArea = type === 'textarea'
  const hasError = meta.touched && !!meta.error
  const isValid = meta.touched && !meta.error

  const FieldInput = isTextArea ? TextArea : Input

  const mField = useMemo(() => {
    return (
      <FieldWrapper hasError={hasError} isTextArea={isTextArea}>
        <FieldInputWrapper isTextArea={isTextArea}>
          <FieldInputContainer isTextArea={isTextArea} hasError={hasError} isValid={isValid} active={!!value}>
            <Label htmlFor={id || name} isTextArea={isTextArea} active={!!value} hasError={hasError} isValid={isValid}>
              {label}
            </Label>
            {mask && mask.length ? (
              <MaskedInput
                value={value}
                mask={mask}
                guide={false}
                {...field}
                {...props}
                render={(ref, maskedProps) => (
                  <FieldInput {...field} {...props} hasError={hasError} ref={ref} {...maskedProps} isValid={isValid} />
                )}
              />
            ) : (
              <FieldInput {...field} {...props} hasError={hasError} isValid={isValid} />
            )}
          </FieldInputContainer>
        </FieldInputWrapper>
        {info && <Info>{info}</Info>}
        <ErrorMessage name={name}>{msg => <Error>{msg}</Error>}</ErrorMessage>
      </FieldWrapper>
    )
  }, [field, meta])

  return <>{mField}</>
}
