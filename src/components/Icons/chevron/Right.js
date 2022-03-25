const Right = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path id="right_svg__a" d="M6.849 7L6 7.849l4.449 4.448 4.448-4.448L14.05 7l-3.6 3.6z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="right_svg__b" fill="#fff">
          <use xlinkHref="#right_svg__a" />
        </mask>
        <use fill="currentColor" fillRule="nonzero" transform="rotate(-90 10.449 9.649)" xlinkHref="#right_svg__a" />
      </g>
    </svg>
  )
}

export default Right
