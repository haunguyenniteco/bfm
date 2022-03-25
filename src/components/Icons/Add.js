const Add = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path id="add_svg__a" d="M20 11.429h-8.571V20H8.57v-8.571H0V8.57h8.571V0h2.858v8.571H20z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="add_svg__b" fill="#fff">
          <use xlinkHref="#add_svg__a" />
        </mask>
        <use fill="#000" xlinkHref="#add_svg__a" />
        <g mask="url(#add_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Add
