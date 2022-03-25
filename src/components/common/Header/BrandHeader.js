import Link from 'next/link'
import { Hide, Container } from '@components/ui'
import Box from '@mui/material/Box'
import BrandHeaderMenu from './BrandHeaderMenu'
import { Wrapper, BrandLogo } from './elements'

const BrandHeader = () => {
  return (
    <Wrapper>
      <Container>
        <Box display="flex" alignItems="center" height="56px" justifyContent="space-between">
          <Hide xs sm md>
            <Link href="/" passHref>
              <a>
                <BrandLogo />
              </a>
            </Link>
          </Hide>
          <Box display="flex">
            <Link href="/" passHref>
              <a>
                <Hide lg xl>
                  <BrandLogo />
                </Hide>
              </a>
            </Link>
          </Box>
          <Box display="flex">
            <BrandHeaderMenu />
          </Box>
        </Box>
      </Container>
    </Wrapper>
  )
}

export default BrandHeader
