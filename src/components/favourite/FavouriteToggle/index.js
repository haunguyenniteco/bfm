import useAppState from '@hooks/useAppState'
import useToggle from '@hooks/useToggle'
import messages from '../messages'
import { FavoriteBox, FavoriteButton, AddFavoriteIcon, RemoveFavorite } from './elements'

const FavouriteToggle = () => {
  const { intl } = useAppState()
  // TODO Add persist state
  const [favourite, setFavourite] = useToggle(false)

  return (
    <FavoriteBox>
      <FavoriteButton
        // variant="outline"
        onClick={() => setFavourite(!favourite)}
        aria-label={intl.formatMessage(messages.toggle)}
      >
        {favourite ? <RemoveFavorite /> : <AddFavoriteIcon />}
      </FavoriteButton>
    </FavoriteBox>
  )
}

FavouriteToggle.propTypes = {}

export default FavouriteToggle
