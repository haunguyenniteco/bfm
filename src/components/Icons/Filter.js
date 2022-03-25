const Filter = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path id="filter_svg__a" d="M0 2.5L7.5 10v7.5l5-1.25V10L20 2.5z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="filter_svg__b" fill="#fff">
          <use xlinkHref="#filter_svg__a" />
        </mask>
        <use fill="#333" xlinkHref="#filter_svg__a" />
        <g mask="url(#filter_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Filter
