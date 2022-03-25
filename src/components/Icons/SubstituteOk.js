const SvgSubstituteOk = ({ svgRef, ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" ref={svgRef} {...props}>
      <defs>
        <path
          d="M10.023 4.545v2.728l3.636-3.637L10.023 0v2.727A7.27 7.27 0 0 0 2.75 10a7.21 7.21 0 0 0 1.127 3.873l1.328-1.328A5.337 5.337 0 0 1 4.568 10a5.459 5.459 0 0 1 5.455-5.455zm6.145 1.582l-1.327 1.328c.4.763.636 1.627.636 2.545a5.459 5.459 0 0 1-5.454 5.455v-2.728l-3.637 3.637L10.023 20v-2.727A7.27 7.27 0 0 0 17.295 10a7.21 7.21 0 0 0-1.127-3.873z"
          id="substitute-ok_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="substitute-ok_svg__b" fill="#fff">
          <use xlinkHref="#substitute-ok_svg__a" />
        </mask>
        <use fillOpacity={0.54} fill="#000" xlinkHref="#substitute-ok_svg__a" />
        <g mask="url(#substitute-ok_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default SvgSubstituteOk
