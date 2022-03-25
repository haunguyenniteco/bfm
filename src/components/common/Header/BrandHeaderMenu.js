import Link from 'next/link'
import { useMemo } from 'react'
import { signIn } from 'next-auth/react'
import { useBasket } from '@components/basket/BasketItem/context'
import useAppState from '@hooks/useAppState'
import Box from '@mui/material/Box'
import getConfig from 'next/config'
import AccountDropdownLink from './DesktopAccountDropdown'
import { BasketIcon, ProfileIcon, RebassLink, BasketBubbleWrapper } from './elements'

const BrandHeaderMenu = ({ basketUrl = '/basket' }) => {
  const { publicRuntimeConfig = {} } = getConfig() || {}
  const { tenantName } = publicRuntimeConfig
  const { isSignedIn } = useAppState()
  const {
    state: { totalQuantity },
  } = useBasket()

  const content = useMemo(() => {
    return (
      <Box display="flex">
        {tenantName && (
          <>
            {!isSignedIn && (
              <RebassLink
                data-cy="not-authenticated"
                href="/api/auth/signin"
                onClick={e => {
                  e.preventDefault()
                  signIn('azure-ad-b2c', { callbackUrl: `${process.env.NEXTAUTH_URL}/auth/signin` })
                }}
              >
                <ProfileIcon />
              </RebassLink>
            )}
            {isSignedIn && <AccountDropdownLink />}
          </>
        )}

        <Link href={basketUrl} passHref>
          <RebassLink basket data-cy="basket-action">
            <BasketBubbleWrapper hasCount={totalQuantity > 0}>
              <BasketIcon />
            </BasketBubbleWrapper>
          </RebassLink>
        </Link>
      </Box>
    )
  }, [isSignedIn, totalQuantity])

  return <>{content}</>
}

export default BrandHeaderMenu
