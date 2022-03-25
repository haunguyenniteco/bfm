import { FormattedMessage } from 'react-intl'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { AuthLayout } from '@components/common'
import Container from '@mui/material/Container'
import Typography from '@components/ui/Typography/index'
import messages from './messages'

const ConfirmationDialog = props => {
  const { open, setOpen, onConfirm } = props
  const [checked, setChecked] = useState(false)

  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
      <AuthLayout>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', height: '100vh' }}>
          <Container maxWidth="xs">
            <DialogTitle id="confirm-dialog">
              <Typography variant="h1" py="20px">
                <FormattedMessage {...messages.ageConfirmation} />
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography py="40px">
                <FormattedMessage {...messages.ageConfirmationDetails} />
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={event => setChecked(event.target.checked)}
                    name="confirm age"
                    required
                  />
                }
                label={<FormattedMessage {...messages.ageConfirmed} />}
              />
            </DialogContent>
            <DialogActions>
              <Button
                disabled={!checked}
                fullWidth
                variant="contained"
                onClick={() => {
                  setOpen(false)
                  onConfirm()
                }}
              >
                <FormattedMessage {...messages.continue} />
              </Button>
            </DialogActions>
          </Container>
        </Box>
      </AuthLayout>
    </Dialog>
  )
}
export default ConfirmationDialog
