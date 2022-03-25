import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import LinearProgress from '@mui/material/LinearProgress'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { isDelivery } from '@lib/helpers'
import useAppState from '@hooks/useAppState'
import Typography from '@components/ui/Typography/index'
import Box from '@mui/material/Box'
import Button from '@components/ui/Button'
import Sticky from 'react-sticky-el'
import { NotificationAlert } from '@components/common'
import messages from './messages'

// TODO: Remove all style={{ zIndex: 0 }} after formik and formik-mui form label issue is resolved
// was added because form label seems to override the default value

const FormikField = fieldProps => {
  return (
    <Field
      component={TextField}
      style={{ zIndex: 0 }}
      InputLabelProps={{ style: { color: '#bbbbbb' } }}
      {...fieldProps}
    />
  )
}

function CheckoutForm({ deliveryType, onPlaceOrder }) {
  const { intl, isSignedIn, sessionUser, guestUserId } = useAppState()
  // const [checked, setChecked] = useState(false)

  const formSchema = Yup.object({
    firstName: Yup.string().required(intl.formatMessage(messages.firstNameRequired)),
    lastName: Yup.string().required(intl.formatMessage(messages.lastNameRequired)),
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

  return (
    <>
      <Typography>
        <FormattedMessage {...messages.contactinfo} />
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: isSignedIn ? sessionUser?.firstName : '',
          lastName: isSignedIn ? sessionUser?.lastName : '',
          email: isSignedIn ? sessionUser?.email : '',
          phone: isSignedIn ? sessionUser?.phone : '',
          notes: '',
          id: isSignedIn ? sessionUser.id : guestUserId,
          loyaltyCardId: '',
        }}
        validationSchema={formSchema}
        onSubmit={onPlaceOrder}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <FormikField label={intl.formatMessage(messages.firstname)} name="firstName" value={values.firstName} />
            <FormikField label={intl.formatMessage(messages.lastname)} name="lastName" value={values.lastName} />
            <FormikField label={intl.formatMessage(messages.email)} name="email" value={values.email} />
            <FormikField label={intl.formatMessage(messages.phone)} type="tel" name="phone" value={values.phone} />
            {/* <FormikField
              label={intl.formatMessage(messages.loyaltyCardNumber)}
              name="loyaltyCardId"
              value={values.loyaltyCardId}
            /> */}
            {isDelivery(deliveryType) && (
              <FormikField
                label={intl.formatMessage(messages.messageToDriver)}
                name="notes"
                value={values.notes}
                multiline
              />
            )}

            {/* <Box py={4}>
              <TermsAndCondition checked={checked} setChecked={setChecked} />
              <NotificationAlert message={intl.formatMessage(messages.paymentReservationAlert)} />
            </Box> */}

            <Sticky mode="bottom" dontUpdateHolderHeightWhenSticky>
              <Box sx={{ py: 2, backgroundColor: '#fff' }}>
                {errors && errors?.apiError && (
                  <NotificationAlert
                    severity="error"
                    title={intl.formatMessage(messages.errorMessage)}
                    message={errors?.apiError}
                  />
                )}
                {isSubmitting && <LinearProgress />}
                <Button type="submit" style={{ textTransform: 'none' }} disabled={isSubmitting} fullWidth>
                  <FormattedMessage {...messages.checkout} />
                </Button>
              </Box>
            </Sticky>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default CheckoutForm
