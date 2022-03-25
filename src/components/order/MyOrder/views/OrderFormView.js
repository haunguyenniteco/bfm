import Typography from '@components/ui/Typography'
import Button from 'src/components/ui/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { isDelivery } from '@lib/helpers'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'
import { useBasket } from '@components/basket/BasketItem/context'
import { FormattedMessage } from 'react-intl'
import useAppState from '@hooks/useAppState'
import Sticky from 'react-sticky-el'
import messages from '../../messages'

// TODO: Remove all style={{ zIndex: 0 }} after formik and formik-mui form label issue is resolved
// was added because form label seems to override the default value

export const OrderFormView = ({ children, order, submitAmendOrder, amendmentId }) => {
  const { email, phone, notes, deliveryType } = order
  const { intl } = useAppState()
  const router = useRouter()
  const {
    state: {
      items,
      shipping: { delivery },
    },
    actions: { reset, clear, setAmendmentId },
  } = useBasket()
  const amendOrderSchema = Yup.object({
    email: Yup.string()
      .email(intl.formatMessage(messages.validEmail))
      .required(intl.formatMessage(messages.emailRequired)),
    phone: Yup.string()
      .matches(
        /[0-9 +]/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        intl.formatMessage(messages.onlyDigits),
      )
      .min(10, intl.formatMessage(messages.phoneMin10Digits))
      .max(13, intl.formatMessage(messages.phoneMax13Digits))
      .required(intl.formatMessage(messages.phoneRequired)),
  })
  const handleCancel = () => {
    setAmendmentId(null)
    clear()
    router.replace(`/orders`)
  }
  return (
    <Box>
      <Typography lineHeight={1.4} fontWeight="bold" mb="15px">
        <FormattedMessage {...messages.contactFormTitle} />
      </Typography>

      <Formik initialValues={{ email, phone, notes }} validationSchema={amendOrderSchema} onSubmit={submitAmendOrder}>
        {({ values, errors, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              label={intl.formatMessage(messages.email)}
              type="email"
              name="email"
              value={values.email}
              disabled={!amendmentId}
              style={{ zIndex: 0 }}
            />
            <Field
              component={TextField}
              label={intl.formatMessage(messages.phone)}
              type="tel"
              name="phone"
              value={values.phone}
              disabled={!amendmentId}
              style={{ zIndex: 0 }}
            />
            {(isDelivery(delivery?.type) ?? isDelivery(deliveryType)) && (
              <Field
                component={TextField}
                disabled={!amendmentId}
                label={intl.formatMessage(messages.messageToDriver)}
                name="notes"
                value={values.notes}
                multiline
                style={{ zIndex: 0 }}
              />
            )}

            {errors && errors.apiError && (
              <Typography fontWeight="normal" color="red" mt={3}>
                {errors.apiError.message}
              </Typography>
            )}

            {isSubmitting && <LinearProgress />}

            {amendmentId && (
              <Sticky mode="bottom" dontUpdateHolderHeightWhenSticky>
                <Box sx={{ backgroundColor: 'G3', pt: 2, display: 'flex' }}>
                  <Button sx={{ mr: 1 }} fullWidth color="inherit" data-cy="cancel-action" onClick={handleCancel}>
                    {intl.formatMessage(messages.cancelAction)}
                  </Button>
                  <Button
                    sx={{ ml: 1 }}
                    fullWidth
                    data-cy="confirm-action"
                    type="submit"
                    disabled={isSubmitting || !items.length}
                    id="confirm-changes"
                  >
                    {intl.formatMessage(messages.confirmOrder)}
                  </Button>
                </Box>
              </Sticky>
            )}

            {children}
          </Form>
        )}
      </Formik>
    </Box>
  )
}
