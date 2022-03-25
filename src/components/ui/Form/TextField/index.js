/**
 *
 * TextField
 *
 */

import { memo, useEffect, useState, useCallback } from 'react'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import TextFieldMui from 'components/ui/TextField'

function TextFieldComponent({ component: Component = TextFieldMui, value, ...props }) {
  const [field, meta, helpers] = useField(props)
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(() => (props.select ? !!field.value : field.value?.length !== 0))

  const { value: fieldValue, ...fieldProps } = field
  const inputValue = fieldValue !== null ? fieldValue : ''

  const onFocus = useCallback(event => {
    setFocused(true)
    setActive(true)
    if (field.onFocus) {
      field.onFocus(event)
    }
  }, [])

  const onBlur = event => {
    if (props.select) {
      setActive(!!value)
      helpers.setTouched(true)
    } else {
      setActive(event.target.value.length !== 0)
      if (field.onBlur) {
        field.onBlur(event)
      }
    }

    setFocused(false)
  }

  useEffect(() => {
    if (!props.id && !props.name) {
      throw new Error('expected id but none present')
    }
  }, [])

  return (
    <Component
      value={inputValue}
      {...fieldProps}
      onBlur={onBlur}
      onFocus={onFocus}
      helpers={helpers}
      focused={focused}
      active={active}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

TextFieldComponent.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
}

const areEqual = (prevProps, nextProps) =>
  prevProps.value === nextProps.value &&
  prevProps.checked === nextProps.checked &&
  prevProps.defaultChecked === nextProps.defaultChecked &&
  prevProps.disabled === nextProps.disabled &&
  prevProps.readOnly === nextProps.readOnly

export const TextField = memo(TextFieldComponent, areEqual)
