const Menu = ({ svgRef, ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" ref={svgRef} {...props}>
      <defs>
        <path d="M0 17.833h20v-2.5H0v2.5zm0-6.666h20v-2.5H0v2.5zM0 2v2.5h20V2H0z" id="menu_svg__a" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="menu_svg__b" fill="#fff">
          <use xlinkHref="#menu_svg__a" />
        </mask>
        <use fill="currentColor" xlinkHref="#menu_svg__a" />
        <g mask="url(#menu_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Menu
