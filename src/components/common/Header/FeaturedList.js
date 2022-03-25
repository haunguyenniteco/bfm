import Link from 'next/link'
import { FeaturedListContainer, FeaturedListItem, FeaturedListText, FavoriteIcon, OffersIcon } from './elements'

const FeaturedList = ({ favourites, offers }) => {
  return (
    <FeaturedListContainer>
      <Link href="/favourites" passHref>
        <FeaturedListItem variant="button">
          <FavoriteIcon />
          <FeaturedListText>{favourites}</FeaturedListText>
        </FeaturedListItem>
      </Link>

      <Link href="/offers" passHref>
        <FeaturedListItem variant="button">
          <OffersIcon />
          <FeaturedListText>{offers}</FeaturedListText>
        </FeaturedListItem>
      </Link>
    </FeaturedListContainer>
  )
}

export default FeaturedList
