const Up = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path id="up_svg__a" d="M6.849 7L6 7.849l4.449 4.448 4.448-4.448L14.05 7l-3.6 3.6z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="up_svg__b" fill="#fff">
          <use xlinkHref="#up_svg__a" />
        </mask>
        <use fill="currentColor" fillRule="nonzero" transform="matrix(1 0 0 -1 0 19.297)" xlinkHref="#up_svg__a" />
        <g mask="url(#up_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Up
