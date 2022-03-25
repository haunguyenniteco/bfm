import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import { media } from '@theming/media'

export const PageContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  margin: auto;
  max-width: 400px;

  ${media.desktop`
  margin-left: 6%;
  `};

  ${media.giant`
  margin-left: 17%;
  `};
`
export const PageTitle = styled('h1')`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: normal;
  margin: 0;
  line-height: 32px;
  margin-bottom: 28px;
`

export const Truncate = styled(Box)({
  overflow: 'hidden',
  whiteSpace: 'wrap',
  textOverflow: 'ellipsis',
  width: '100%',
})

export const ModalContainer = styled('div')`
  display: flex;
  flex-direction: column;

  & label {
    font-size: 16px;
    margin: 12px;
  }

  & textarea {
    margin: 12px;
    font-size: 16px;
    resize: none;
  }

  & button {
    margin: 8px;
    width: calc(100% - 16px);
  }

  & * {
    border: none;
  }
`
