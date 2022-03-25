import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useAppState from '@hooks/useAppState'
import messages from './messages'

const NoteActions = ({ item, showModal }) => {
  const { intl } = useAppState()

  return (
    <Box>
      <IconButton
        aria-label={intl.formatMessage(messages.addNote)}
        onClick={showModal}
        color="primary"
        data-cy="add-note"
        title={intl.formatMessage(messages.addNote)}
        sx={item.note ? {} : { color: 'black' }}
      >
        {item?.note ? <MarkChatUnreadIcon /> : <ChatBubbleOutlineIcon />}
      </IconButton>
    </Box>
  )
}

export default NoteActions
