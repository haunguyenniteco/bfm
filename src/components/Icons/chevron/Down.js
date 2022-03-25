const Down = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path id="down_svg__a" d="M6.849 8L6 8.849l4.449 4.448 4.448-4.448L14.05 8l-3.6 3.6z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="down_svg__b" fill="#fff">
          <use xlinkHref="#down_svg__a" />
        </mask>
        <use fill="currentColor" fillRule="nonzero" xlinkHref="#down_svg__a" />
        <g mask="url(#down_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Down
