/**
 * styled elements for ProgressiveImage
 */

import { styled } from '@mui/material/styles'

export const ImageWrapper = styled('div')`
  background-color: white;
  display: block;
  height: 0;
  overflow: hidden;
  padding-top: 100%;
  position: relative;
  width: 100%;
`
export const Img = styled(({ isloading, isLoaded, isHidden, isDefault, loadingFailed, alt, ...rest }) => (
  <img alt={alt} {...rest} />
))`
  ${({ isDefault, dimension }) => {
    let styles = ''

    if (!isDefault) {
      const { height, width } = dimension

      let fit = ''
      if (height > width) {
        // Image is portrait
        fit = 'contain'
      } else {
        // Image is landscape
        fit = 'cover'
      }

      if (fit === 'contain') {
        styles += `
        height: 100%;
        width: auto;`
      }

      if (fit === 'cover') {
        styles += `
        width: 100%;
        height: auto;`
      }
    }

    return styles
  }}

  left: 50%;
  opacity: 1;
  position: absolute;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  top: 50%;
  transform: translate(-50%, -50%);

  ${({ isloading, isLoaded, isHidden, loadingFailed }) => {
    let styles = ''

    if (isloading) {
      styles += `
			filter: blur(8px);
			z-index: 1100;`
    }
    if (isLoaded) {
      styles += 'z-index: auto;'
    }
    if (isHidden) {
      styles += 'opacity: 0;'
    }

    if (loadingFailed) {
      styles += 'filter: blur(0);'
    }
    return styles
  }}
`
