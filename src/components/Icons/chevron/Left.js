const Left = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path id="left_svg__a" d="M5.849 7L5 7.849l4.449 4.448 4.448-4.448L13.05 7l-3.6 3.6z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="left_svg__b" fill="#fff">
          <use xlinkHref="#left_svg__a" />
        </mask>
        <use
          fill="currentColor"
          fillRule="nonzero"
          transform="scale(1 -1) rotate(90 19.097 0)"
          xlinkHref="#left_svg__a"
        />
      </g>
    </svg>
  )
}

export default Left
