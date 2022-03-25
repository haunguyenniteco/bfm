const Remove = ({ svgRef, ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" ref={svgRef} {...props}>
      <defs>
        <path id="remove_svg__a" d="M0 11.427V8.57h20v2.857z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="remove_svg__b" fill="#fff">
          <use xlinkHref="#remove_svg__a" />
        </mask>
        <use fill="currentColor" xlinkHref="#remove_svg__a" />
        <g mask="url(#remove_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Remove
