import { forwardRef } from 'react'

const SvgSearch = ({ svgRef, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 32 32" focusable="false" ref={svgRef} {...props}>
    <path
      fill="currentColor"
      d="M11.6 2c5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6S2 16.9 2 11.6 6.3 2 11.6 2zm0-2C5.2 0 0 5.2 0 11.6s5.2 11.6 11.6 11.6S23.2 18 23.2 11.6 18 0 11.6 0z"
    />
    <path
      fill="currentColor"
      d="M31 32c-.3 0-.5-.1-.7-.3L18.5 19.8c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l11.8 11.9c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"
    />
  </svg>
)

const ForwardRef = forwardRef((props, ref) => <SvgSearch svgRef={ref} {...props} />)
export default ForwardRef
