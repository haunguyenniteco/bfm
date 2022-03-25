import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Stop } from '@components/Icons'
import useAppState from '@hooks/useAppState'
import messages from '../messages'

const EmptyProductAssortment = () => {
  const { intl } = useAppState()

  return (
    <Box alignItems="center" justifyContent="center" height="50vh" flexDirection="column" display="flex">
      <Stop height="30px" width="30px" />
      <br />
      <Typography>{intl.formatMessage(messages.emptyAssortment)}</Typography>
    </Box>
  )
}

export default EmptyProductAssortment
