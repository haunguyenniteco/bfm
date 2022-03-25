/**
 * Error
 */

import PropsTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import Box from '@mui/material/Box'
import { Wrapper, A } from './elements'

const statusCodes = {
  400: 'Bad Request',
  403: 'Forbidden',
  404: 'Page not found',
  500: 'Internal Server Error',
  501: 'Not Implemented',
}

function Error(props) {
  const { statusCode } = props
  const title = statusCodes[statusCode] || 'An unexpected error has occurred'
  return (
    <div>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>

      <Wrapper>
        <Box fontSize="46px" fontWeight="600" mt="30px">
          Error {statusCode ? <span>{statusCode}</span> : null}
        </Box>
        <Box fontSize="46px" fontWeight="normal" mt="10px" mb="1.2em">
          {title}
        </Box>
        {true && (
          <>
            <Box fontSize="20px" fontWeight="normal" mt="10px" mb="1.6em">
              We couldn’t find the page you’re looking for.
            </Box>
            <Box fontSize="20px" fontWeight="normal" mt="10px">
              It’s probably best if you{' '}
              <Link href="/" passHref>
                <A>search our site</A>
              </Link>
              .
            </Box>
          </>
        )}
      </Wrapper>
    </div>
  )
}

Error.propTypes = {
  statusCode: PropsTypes.number,
}

/* eslint-disable no-nested-ternary */
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
