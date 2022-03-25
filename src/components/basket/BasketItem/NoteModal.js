import { FormattedMessage } from 'react-intl'
import { Formik, Form } from 'formik'
import useAppState from '@hooks/useAppState'
import { Modal } from '@components/ui'
import { TextField } from '@components/ui/Form'
import { EditNoteContainer, ProductNameField, ProductName, CheckoutButton } from '../elements'
import messages from '../messages'

const ModalStyles = {
  content: {
    maxWidth: '425px',
    margin: '0',
    padding: '0',
  },
}

const NoteModal = ({ item, show, locale, onSave }) => {
  const { intl } = useAppState()
  return (
    <Modal isOpen={show} hasClose={false} style={ModalStyles}>
      <EditNoteContainer>
        <ProductNameField>
          <ProductName>{item?.name[locale]}</ProductName>
        </ProductNameField>
        <Formik
          initialValues={{
            note: item?.note || '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSave(item, values.note)
            setSubmitting(false)
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <TextField
                multiline
                name="note"
                value={values.note}
                rows="5"
                maxLength="160"
                label={intl.formatMessage(messages.notePlaceholder)}
              />
              <CheckoutButton type="submit" disabled={isSubmitting}>
                <FormattedMessage {...messages.save} />
              </CheckoutButton>
            </Form>
          )}
        </Formik>
      </EditNoteContainer>
    </Modal>
  )
}

export default NoteModal
