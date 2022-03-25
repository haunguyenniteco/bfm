const Location = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10.75c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75z"
          id="location_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="location_svg__b" fill="#fff">
          <use xlinkHref="#location_svg__a" />
        </mask>
        <g mask="url(#location_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Location
