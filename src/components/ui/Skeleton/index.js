/**
 * Skeleton
 */

import { forwardRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './elements'

const Skeleton = forwardRef(function Skeleton(props, ref) {
  const { className, disableAnimate, height, variant, width, count, ...other } = props

  const content = (
    <Wrapper
      ref={ref}
      variant={variant}
      // animate={!disableAnimate}
      className={className}
      width={width}
      height={height}
      {...other}
      style={{
        ...other.style,
      }}
    />
  )

  if (count && count > 0) {
    return Array.from(new Array(count)).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>{content}</Fragment>
    ))
  }

  return <>{content}</>
})

Skeleton.defaultProps = {
  // highlightColor: 'rgba(0, 0, 0, 0.08)',
  height: '1.2em',
  disableAnimate: false,
  variant: 'rect',
}

Skeleton.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The highlightColor that will be rendered.
   */
  highlightColor: PropTypes.string,
  /**
   * If `true` the animation effect is disabled.
   */
  disableAnimate: PropTypes.bool,
  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOfType([PropTypes.array])]),
  /**
   * The type of content that will be rendered.
   */
  variant: PropTypes.oneOf(['text', 'rect', 'circle']),
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOfType([PropTypes.array])]),
  /**
   * The number of times to repeat the skeleton instance.
   */
  count: PropTypes.number,
}

export default Skeleton

/* 

Example 

<Container>
  <Skeleton variant="circle" width={210} height={210} />
  <Skeleton variant="text" width={210} height={210} count={4} />
  <Skeleton width="100%" count={10} />
  <Skeleton width="60%" />
</Container>
*/
